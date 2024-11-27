import {useRecoilState, useRecoilValue} from 'recoil';
import {regionCountInit} from 'src/constants/regionCount';
import {appUserState, regionCountState} from 'src/recoil/atom';
import {AppRegionCount, RegionCount} from 'src/types/regionCount';
import {_readRealtime, _updateRealtime} from 'src/utils/realtime';

const useRegionCount = () => {
  const appUser = useRecoilValue(appUserState);
  const [regionCount, setRegionCount] = useRecoilState(regionCountState);

  // 로그인 시 firebase에서 데이터 불러오고 recoil에 세팅
  const getRegionCountFromFirebase = async (uid: string) => {
    const regionCount = await _readRealtime(uid, 'count').then(
      snapshot => snapshot.val()['regionCount'],
    );

    setRegionCount(regionCount);
  };

  // 회원가입 시 firebase에 데이터 저장하고 recoil에 세팅
  const setRegionCountFromFirebase = async (uid: string) => {
    const appRegionCountData: AppRegionCount = {
      uid: uid,
      regionCount: regionCountInit,
    };

    await _updateRealtime(appRegionCountData, 'count');

    setRegionCount(regionCountInit);
  };

  // 배경 혹은 스토리 업데이트 시 상위 지역 수 카운팅 -> Firebase & Recoil
  const updateRegionCountById = async (
    id: string,
    key: 'color' | 'story',
    count: number,
  ) => {
    const mainId = `${id.split('-')[0]}-${id.split('-')[1]}`;

    const updateCount: RegionCount = {
      ...regionCount,
      [mainId]: {
        ...regionCount[mainId],
        [key]: regionCount[mainId][key] + count,
      },
    };

    const appRegionCountData: AppRegionCount = {
      uid: appUser?.uid!,
      regionCount: updateCount,
    };

    await _updateRealtime(appRegionCountData, 'count').then(() => {
      setRegionCount(appRegionCountData.regionCount);
    });
  };

  // 카운트 동시 제거 후 -> Firebase & Recoil
  const deleteRegionCountById = async (
    id: string,
    colorCount: number,
    storyCount: number,
  ) => {
    const mainId = `${id.split('-')[0]}-${id.split('-')[1]}`;

    const updateCount: RegionCount = {
      ...regionCount,
      [mainId]: {
        ...regionCount[mainId],
        color: regionCount[mainId].color + colorCount,
        story: regionCount[mainId].story + storyCount,
      },
    };

    const appRegionCountData: AppRegionCount = {
      uid: appUser?.uid!,
      regionCount: updateCount,
    };

    await _updateRealtime(appRegionCountData, 'count').then(() => {
      setRegionCount(appRegionCountData.regionCount);
    });
  };

  // 지역 카운트 초기화
  const resetRegionCount = async () => {
    const appRegionCountData: AppRegionCount = {
      uid: appUser?.uid!,
      regionCount: regionCountInit,
    };

    await _updateRealtime(appRegionCountData, 'count').then(() => {
      setRegionCount(appRegionCountData.regionCount);
    });
  };

  return {
    regionCount,
    setRegionCount,
    getRegionCountFromFirebase,
    setRegionCountFromFirebase,
    updateRegionCountById,
    deleteRegionCountById,
    resetRegionCount,
  };
};

export default useRegionCount;
