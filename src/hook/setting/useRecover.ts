import {useQueryClient} from '@tanstack/react-query';
import {IAppData} from 'src/types/app';
import {updateKoreaMapData} from 'src/utils/koreaMap.db';
import {addStoryByRegionId} from 'src/utils/story.db';
import {decryptData} from 'src/utils/crypto';
import {showBottomToast} from 'src/utils/showToast';
import {readRealtime, readRealtimeDate} from 'src/utils/firebase/realtime';
import {runWithConcurrency} from 'src/utils/common/task';
import {useActionLock} from '../common/useActionLock';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {writeBase64Retry} from 'src/utils/fileSystem';
import useDialog from '../common/useDialog';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

const CONCURRENCY = 4;

const useRecover = (user: FirebaseAuthTypes.User | null) => {
  // Access the client
  const queryClient = useQueryClient();

  const [date, setDate] = useState<string>('');

  const {showDialog, hideDialog, visibleDialog} = useDialog();
  const {wrap, isDisabled, onLoading} = useActionLock();

  useEffect(() => {
    if (!user) return;

    const {uid} = user;
    readRealtimeDate(uid).then(date => setDate(date ?? ''));
  }, [user]);

  // data parse & decrypt
  const getRecoverData = async (data: string) => {
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
    try {
      // 1) 로그인 확인 (실패하면 복원 시도 안 함)
      if (!user) {
        showBottomToast('info', '로그인이 필요합니다.');
        return;
      }
      const {uid} = user;

      // 2) Firebase에서 recover
      const data = await readRealtime(uid);

      if (!data) {
        showBottomToast('error', '데이터 불러오기에 실패했습니다.');
        return;
      }

      // 3) 데이터 파싱 및 복호화
      await getRecoverData(data.data);

      showBottomToast('success', '데이터를 불러왔습니다.');
    } catch (error) {
      showBottomToast('error', '데이터 불러오기에 실패했습니다.');
    } finally {
      hideDialog();
    }
  });

  return {
    date,
    showDialog,
    hideDialog,
    visibleDialog,
    isDisabled,
    onLoading,
    onRecover,
  };
};

export default useRecover;
