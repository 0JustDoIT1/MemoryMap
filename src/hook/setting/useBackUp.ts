import {FileSystem} from 'react-native-file-access';
import {IAppData} from 'src/types/app';
import {getAllKoreaMapData} from 'src/utils/koreaMap.db';
import {getStoryAll} from 'src/utils/story.db';
import {encryptData} from 'src/utils/crypto';
import useAuth from '../auth/useAuth';
import {showBottomToast} from 'src/utils/showToast';
import {setRealtime} from 'src/utils/firebase/realtime';
import {InteractionManager} from 'react-native';
import {runWithConcurrency} from 'src/utils/common/task';
import {useActionLock} from '../common/useActionLock';

const CONCURRENCY = 4;

const useBackUp = () => {
  const {googleSignIn, googleSignOut} = useAuth();
  const {wrap, isDisabled, onLoading} = useActionLock();

  // data create & encrypt
  const createBackupData = async () => {
    try {
      const koreaMapData = await getAllKoreaMapData();
      const story = await getStoryAll();
      const photoRegionArray = Object.values(koreaMapData).filter(
        item => item.type === 'photo',
      );
      const mapImage: Record<string, string> = {};
      const zoomImage: Record<string, string> = {};

      // 작업 큐 만들기
      const tasks = photoRegionArray.map(region => async () => {
        const {id, imageUrl, zoomImageUrl} = region;

        // JS 스레드 양보: UI 프레임 드랍 방지
        await new Promise<void>(resolve => {
          InteractionManager.runAfterInteractions(() => resolve());
        });

        if (imageUrl) {
          const img = await FileSystem.readFile(imageUrl, 'base64');
          mapImage[id] = img;
        }

        if (zoomImageUrl) {
          const zoomImg = await FileSystem.readFile(zoomImageUrl, 'base64');
          zoomImage[id] = zoomImg;
        }
      });

      await runWithConcurrency(tasks, CONCURRENCY);

      const appData: IAppData = {
        koreaMapData,
        story,
        mapImage,
        zoomImage,
      };

      const encrypted = encryptData(JSON.stringify(appData));

      return encrypted;
    } catch (error) {
      return undefined;
    }
  };

  // BackUp App Data
  const onBackUp = wrap(async () => {
    let signedIn = false;
    try {
      // 1) 로그인 시도 (실패하면 백업 생성 안 함)
      const userInfo = await googleSignIn();
      if (!userInfo) {
        showBottomToast('error', '로그인이 필요합니다.');
        return;
      }
      signedIn = true;
      const {uid} = userInfo.user;

      // 2) 백업 데이터 생성 (취소 시 undefined)
      const data = await createBackupData();
      if (!data) {
        showBottomToast('info', '백업이 취소되었거나 실패했습니다.');
        return;
      }

      // 3) Firebase에 백업
      await setRealtime(uid, {data});

      showBottomToast('success', 'Firebase에 데이터를 백업했습니다.');
    } catch (error) {
      showBottomToast('error', '데이터 백업에 실패했습니다.');
    } finally {
      if (signedIn) await googleSignOut();
    }
  });

  return {isDisabled, onLoading, onBackUp};
};

export default useBackUp;
