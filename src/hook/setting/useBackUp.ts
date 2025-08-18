import {useQueryClient} from '@tanstack/react-query';
import {FileSystem} from 'react-native-file-access';
import {appBackUpRoute} from 'src/constants/app';
import {IAppData} from 'src/types/app';
import {getAllKoreaMapData, updateKoreaMapData} from 'src/utils/koreaMap.db';
import {addStoryByRegionId, getStoryAll} from 'src/utils/story.db';
import {decryptData, encryptData} from 'src/utils/crypto';
import useAuth from '../auth/useAuth';
import {showBottomToast} from 'src/utils/showToast';
import {readRealtime, setRealtime} from 'src/utils/firebase/realtime';
import {InteractionManager} from 'react-native';
import {runWithConcurrency} from 'src/utils/common/task';
import {useCallback, useRef, useState} from 'react';
import {useActionLock} from '../common/useActionLock';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {writeBase64Retry} from 'src/utils/fileSystem';

interface Progress {
  current: number; // 완료된 작업 수
  total: number; // 전체 작업 수
}

const CONCURRENCY = 4;

const useBackUp = () => {
  // Access the client
  const queryClient = useQueryClient();

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
  const onRecover = async () => {
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
  };

  return {isDisabled, onLoading, onBackUp, onRecover};
};

export default useBackUp;
