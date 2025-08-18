import {useQueryClient} from '@tanstack/react-query';
import {FileSystem} from 'react-native-file-access';
import {appBackUpRoute} from 'src/constants/app';
import {IAppData} from 'src/types/app';
import {getAllKoreaMapData, updateKoreaMapData} from 'src/utils/koreaMap.db';
import {addStoryByRegionId, getStoryAll} from 'src/utils/story.db';
import {decryptData, encryptData} from 'src/utils/crypto';
import useAuth from '../auth/useAuth';
import {showBottomToast} from 'src/utils/showToast';
import {setRealtime} from 'src/utils/firebase/realtime';
import {InteractionManager} from 'react-native';
import {runWithConcurrency} from 'src/utils/common/task';
import {useCallback, useRef, useState} from 'react';
import {useActionLock} from '../common/useActionLock';

interface Progress {
  current: number; // 완료된 작업 수
  total: number; // 전체 작업 수
}

const CONCURRENCY = 4;

const useBackUp = () => {
  const [progress, setProgress] = useState<Progress>({current: 0, total: 0});
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const cancelledRef = useRef<boolean>(false);
  const lastUpdateRef = useRef<number>(0);

  // Access the client
  const queryClient = useQueryClient();

  const {googleSignIn, googleSignOut} = useAuth();
  const {wrap, isDisabled, onLoading} = useActionLock();

  const cancel = useCallback(() => {
    cancelledRef.current = true;
  }, []);

  // 간단 스로틀: 100ms마다 또는 완료 시에만 진행률 반영
  const onProgress = (current: number, total: number) => {
    const now = Date.now();
    if (current === total || now - lastUpdateRef.current > 100) {
      lastUpdateRef.current = now;
      setProgress({current, total});
    }
  };

  // Create backup data & encrypt
  const createBackupData = async () => {
    try {
      cancelledRef.current = false;
      lastUpdateRef.current = 0;
      setIsRunning(true);
      setProgress({current: 0, total: 0});

      const koreaMapData = await getAllKoreaMapData();
      const story = await getStoryAll();
      const photoRegionArray = Object.values(koreaMapData).filter(
        item => item.type === 'photo',
      );
      const mapImage: Record<string, string> = {};
      const zoomImage: Record<string, string> = {};

      const total = photoRegionArray.length;
      let current = 0;
      onProgress(0, total);

      // 작업 큐 만들기
      const tasks = photoRegionArray.map(region => async () => {
        if (cancelledRef.current) return;

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

        current += 1;
        onProgress(current, total);
      });

      await runWithConcurrency(tasks, CONCURRENCY, () => cancelledRef.current);

      // 취소되었으면 암호화 전에 조기 종료
      if (cancelledRef.current) return undefined;

      // total=0 이거나 스로틀로 스킵된 경우 100% 보장
      onProgress(total, total);

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
    } finally {
      setIsRunning(false);
    }
  };

  // BackUp App Data
  const backupAppData = wrap(async () => {
    try {
      // 1) 로그인 시도 (실패하면 백업 생성 안 함)
      const userInfo = await googleSignIn();
      if (!userInfo) {
        showBottomToast('error', '로그인이 필요합니다.');
        return;
      }

      // 2) 백업 데이터 생성 (취소 시 undefined)
      const data = await createBackupData();
      if (!data) {
        showBottomToast('info', '백업이 취소되었거나 실패했습니다.');
        return;
      }

      const {uid} = userInfo.user;

      await setRealtime(uid, {data});

      showBottomToast('success', 'Firebase에 데이터를 백업했습니다.');
    } catch (error) {
      showBottomToast('error', '데이터 백업에 실패했습니다.');
    }
  });

  // // Get Backup data & decrypt
  // const getBackupData = async (data: string) => {
  //   const appData: IAppData = JSON.parse(decryptData(data));

  //   const koreaMapData = appData.koreaMapData;
  //   const story = appData.story;
  //   const mapImage = appData.mapImage;
  //   const zoomImage = appData.zoomImage;

  //   const koreaMapDataArray = Object.values(koreaMapData);

  //   for (let i = 0; i < Object.values(koreaMapData).length; i++) {
  //     if (koreaMapDataArray[i].type === 'photo') {
  //       const existMapImage = await FileSystem.exists(
  //         koreaMapDataArray[i].imageUrl!,
  //       );
  //       const existZoomImage = await FileSystem.exists(
  //         koreaMapDataArray[i].zoomImageUrl!,
  //       );
  //       if (existMapImage)
  //         await FileSystem.unlink(koreaMapDataArray[i].imageUrl!);
  //       if (existZoomImage)
  //         await FileSystem.unlink(koreaMapDataArray[i].zoomImageUrl!);

  //       await FileSystem.writeFile(
  //         koreaMapDataArray[i].imageUrl!,
  //         mapImage[koreaMapDataArray[i].id],
  //         'base64',
  //       );
  //       await FileSystem.writeFile(
  //         koreaMapDataArray[i].zoomImageUrl!,
  //         zoomImage[koreaMapDataArray[i].id],
  //         'base64',
  //       );
  //     }
  //     await updateKoreaMapData(koreaMapDataArray[i]);
  //   }

  //   if (story.length >= 1) {
  //     story.forEach(async item => await addStoryByRegionId(item));
  //   }

  //   await queryClient.invalidateQueries({
  //     queryKey: ['koreaMapData'],
  //     refetchType: 'all',
  //   });
  //   await queryClient.invalidateQueries({
  //     queryKey: ['storyList'],
  //     refetchType: 'all',
  //   });
  //   await queryClient.invalidateQueries({
  //     queryKey: ['storyRegionList'],
  //     refetchType: 'all',
  //   });
  //   await queryClient.invalidateQueries({
  //     queryKey: ['colorMapList'],
  //     refetchType: 'all',
  //   });
  //   await queryClient.invalidateQueries({
  //     queryKey: ['viewStory'],
  //     refetchType: 'all',
  //   });
  //   await queryClient.invalidateQueries({
  //     queryKey: ['dashboardKoreaMap'],
  //     refetchType: 'all',
  //   });
  //   await queryClient.invalidateQueries({
  //     queryKey: ['dashboardStory'],
  //     refetchType: 'all',
  //   });
  // };

  // // Get Backup Data
  // const getAppData = async () => {
  //   const googleCloud = await googleSignIn();
  //   if (googleCloud) {
  //     const exist = await googleCloud.exists(`/${appBackUpRoute}.txt`);
  //     if (exist) {
  //       const data = await googleCloud.readFile(`/${appBackUpRoute}.txt`);
  //       await getBackupData(data);
  //       await googleSignOut();
  //       return true;
  //     } else return false;
  //   } else throw new Error('Google Drive에 연결하지 못했습니다.');
  // };

  return {isDisabled, onLoading, backupAppData};
};

export default useBackUp;
