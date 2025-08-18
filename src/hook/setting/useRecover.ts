import {useQueryClient} from '@tanstack/react-query';
import {IAppData} from 'src/types/app';
import {updateKoreaMapData} from 'src/utils/koreaMap.db';
import {addStoryByRegionId} from 'src/utils/story.db';
import {decryptData} from 'src/utils/crypto';
import useAuth from '../auth/useAuth';
import {showBottomToast} from 'src/utils/showToast';
import {readRealtime} from 'src/utils/firebase/realtime';
import {runWithConcurrency} from 'src/utils/common/task';
import {useActionLock} from '../common/useActionLock';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {writeBase64Retry} from 'src/utils/fileSystem';

const CONCURRENCY = 4;

const useRecover = () => {
  // Access the client
  const queryClient = useQueryClient();

  const {googleSignIn, googleSignOut} = useAuth();
  const {wrap, isDisabled, onLoading} = useActionLock();

  // data parse & decrypt
  const getBackupData = async (data: string) => {
    const appData: IAppData = JSON.parse(decryptData(data));

    if (!appData) return showBottomToast('error', '백업된 데이터가 없습니다.');

    const koreaMapData = appData.koreaMapData;
    const story = appData.story;
    const mapImage = appData.mapImage;
    const zoomImage = appData.zoomImage;

    const koreaMapDataArray = Object.values(koreaMapData);

    // 지도 데이터/이미지 복원
    const mapTasks = koreaMapDataArray.map(region => async () => {
      const {type, id, imageUrl, zoomImageUrl} = region;
      if (type === 'photo') {
        await Promise.all([
          writeBase64Retry(imageUrl, mapImage[id]),
          writeBase64Retry(zoomImageUrl, zoomImage[id]),
        ]);
      }
      await updateKoreaMapData(region);
    });

    await runWithConcurrency(mapTasks, CONCURRENCY);

    // 스토리 복원
    if (story.length > 0) {
      const storyTasks = story.map(
        item => async () => await addStoryByRegionId(item),
      );

      await runWithConcurrency(storyTasks, CONCURRENCY);
    }

    // 캐시 무효화 (병렬)
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.koreaMapData,
        refetchType: 'all',
      }),
      queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.storyList.root,
        refetchType: 'all',
      }),
      queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.storyRegionList,
        refetchType: 'all',
      }),
      queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.colorMapList,
        refetchType: 'all',
      }),
      queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.story,
        refetchType: 'all',
      }),
      queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.dashboard.koreaMap,
        refetchType: 'all',
      }),
      queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.dashboard.story,
        refetchType: 'all',
      }),
    ]);
  };

  // Recover Backup Data
  const onRecover = wrap(async () => {
    let signedIn = false;
    try {
      // 1) 로그인 시도 (실패하면 복원 시도 안 함)
      const userInfo = await googleSignIn();
      if (!userInfo) {
        showBottomToast('error', '로그인이 필요합니다.');
        return;
      }
      signedIn = true;
      const {uid} = userInfo.user;

      // 2) Firebase에서 recover
      const data = await readRealtime(uid);

      if (!data) {
        showBottomToast('error', '데이터 불러오기에 실패했습니다.');
        return;
      }

      // 3) 데이터 파싱 및 복호화
      await getBackupData(data.data);

      showBottomToast('success', '데이터를 불러왔습니다.');
    } catch (error) {
      showBottomToast('error', '데이터 불러오기에 실패했습니다.');
    } finally {
      if (signedIn) await googleSignOut();
    }
  });

  return {isDisabled, onLoading, onRecover};
};

export default useRecover;
