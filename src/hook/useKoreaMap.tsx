import {useMemo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {KoreaRegionList, RegionList} from 'src/constants/regionList';
import {RegionCountInit} from 'src/constants/regionCount';
import {
  appUserState,
  koreaMapDataState,
  regionCountState,
  storyState,
} from 'src/recoil/atom';
import {AppData} from 'src/types/account';
import {GetColorRegionList} from 'src/types/koreaMap';
import {_updateRealtime} from 'src/utils/realtime';
import {
  _deleteStorage,
  _deleteAllStorage,
  _downloadStorage,
  _uploadStorage,
} from 'src/utils/storage';
import {AppStory} from 'src/types/story';
import {_deleteDoc, _setDoc} from 'src/utils/firestore';
import {
  deleteDataById,
  updateDataByTypeColor,
  updateDataByTypePhoto,
  updateRegionCountById,
} from 'src/utils/koreaMap';
import {getDeleteStoryCount, deleteStoryByRegionId} from 'src/utils/story';

const useKoreaMap = () => {
  const appUser = useRecoilValue(appUserState);
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);
  const [story, setStory] = useRecoilState(storyState);
  const [regionCount, setRegionCount] = useRecoilState(regionCountState);

  // 지도 색칠된 지역(color & photo) 리스트 가져오기
  const getColorRegionList = useMemo(() => {
    const result: GetColorRegionList = {};

    const colorList = Object.values(koreaMapData).filter(
      region => region.type !== 'init',
    );

    colorList.forEach((region, index) => {
      const regionName = region.value[region.value.length - 1];

      let value =
        region.value.length === 1
          ? {
              child: false,
              sub: [{id: region.id, title: regionName}],
            }
          : {
              child: true,
              sub: [{id: region.id, title: regionName}],
            };

      if (index === 0) result[region.value[0]] = value;
      else {
        const exist = result[region.value[0]];
        if (exist)
          result[region.value[0]].sub.push({
            id: region.id,
            title: regionName,
          });
        else result[region.value[0]] = value;
      }
    });

    return result;
  }, [koreaMapData]);

  // 지도 색칠된 지역 list
  const regionList = useMemo(() => getColorRegionList, [koreaMapData]);

  // 지도 색칠된 지역 list 중 Main Array
  const regionMain = useMemo(
    () => Object.keys(getColorRegionList).sort(),
    [koreaMapData],
  );

  // id로 해당 지역 svg 데이터 가져오기
  const getSvgDataById = (id: string): RegionList => {
    let result: any;

    // 객체 속 원하는 값 찾기 (Depth First Search 방식, 중첩 객체도 가능)
    const DFS = (obj: any, name: any, val: any) => {
      if (obj[name] === val) result = obj;
      else
        Object.values(obj).forEach(value => {
          if (typeof value === 'object') DFS(value, name, val);
        });
    };

    DFS(KoreaRegionList, 'id', id);

    return result;
  };

  // type === photo 에 맞는 id 배열로 반환
  const getTypeToIdArray = (type: 'init' | 'color' | 'photo') => {
    const arr: string[] = [];

    Object.values(koreaMapData).forEach(value => {
      if (value.type === type) {
        arr.push(value.id);
      }
    });

    return arr;
  };

  // 지도에서 배경(색상) 업데이트 -> Firebase & Recoil
  const updateMapColorById = async (id: string, color: string) => {
    const updateKoreaMapData = updateDataByTypeColor(koreaMapData, id, color);
    const count =
      koreaMapData[id].type === 'photo'
        ? 0
        : koreaMapData[id].type === 'color'
        ? 0
        : 1;
    const updateRegionCount = updateRegionCountById(regionCount, id, count, 0);

    const appData: AppData = {
      uid: appUser?.uid!,
      email: appUser?.email!,
      koreaMapData: updateKoreaMapData,
      regionCount: updateRegionCount,
    };

    let response: boolean = false;

    // 타입이 photo인 경우, 기존 사진 제거
    if (updateKoreaMapData[id].type === 'photo') {
      await _deleteStorage(appUser?.uid!, id).then(() => (response = true));
    } else {
      response = true;
    }

    // 사진 제거 이후(없다면 바로) 데이터 업데이트
    if (response) {
      await _updateRealtime(appData).then(() => {
        setKoreaMapData(appData.koreaMapData);
        setRegionCount(appData.regionCount);
      });
    } else throw new Error('색칠 에러');
  };

  // 지도에서 배경(이미지) 업데이트 -> Firebase & Recoil
  const updateMapPhotoById = async (
    id: string,
    uri: string,
    imageStyle: {x: number; y: number; scale: number; rotation: number},
  ) => {
    await _uploadStorage(appUser?.uid!, id, uri).then(
      async res =>
        await _downloadStorage(appUser?.uid!, id).then(async res => {
          const updateKoreaMapData = updateDataByTypePhoto(
            koreaMapData,
            id,
            res,
            imageStyle,
          );
          const count =
            koreaMapData[id].type === 'photo'
              ? 0
              : koreaMapData[id].type === 'color'
              ? 0
              : 1;
          const updateRegionCount = updateRegionCountById(
            regionCount,
            id,
            count,
            0,
          );

          const appData: AppData = {
            uid: appUser?.uid!,
            email: appUser?.email!,
            koreaMapData: updateKoreaMapData,
            regionCount: updateRegionCount,
          };

          await _updateRealtime(appData).then(async () => {
            setKoreaMapData(appData.koreaMapData);
            setRegionCount(appData.regionCount);
          });
        }),
    );
  };

  // 지도에서 배경(색상or이미지) 제거 -> Firebase & Recoil
  const deleteMapDataById = async (id: string) => {
    const updateKoreaMapData = deleteDataById(koreaMapData, id);
    const updateStory = deleteStoryByRegionId(story!, id);
    const updateRegionCount = updateRegionCountById(
      regionCount,
      id,
      -1,
      getDeleteStoryCount(story!, updateStory),
    );

    const appStory: AppStory = {
      uid: appUser?.uid!,
      story: updateStory,
    };

    const appData: AppData = {
      uid: appUser?.uid!,
      email: appUser?.email!,
      koreaMapData: updateKoreaMapData,
      regionCount: updateRegionCount,
    };

    let response: boolean = false;

    if (koreaMapData[id].type === 'photo') {
      await _deleteStorage(appUser?.uid!, id).then(() => (response = true));
    } else {
      response = true;
    }

    await _updateRealtime(appData).then(async () => {
      await _setDoc(appStory).then(async () => {
        setStory(appStory.story);
        setKoreaMapData(appData.koreaMapData);
        setRegionCount(appData.regionCount);
      });
    });
  };

  // 지도 정보 초기화
  const resetMapData = async () => {
    const appData: AppData = {
      uid: appUser?.uid!,
      email: appUser?.email!,
      koreaMapData: koreaMapDataInit,
      regionCount: RegionCountInit,
    };

    return await _deleteAllStorage(appData.uid).then(async () => {
      await _updateRealtime(appData).then(async () => {
        await _deleteDoc(appData.uid).then(() => {
          setKoreaMapData(koreaMapDataInit);
          setRegionCount(RegionCountInit);
          setStory(null);
        });
      });
    });
  };

  return {
    koreaMapData,
    regionList,
    regionMain,
    getSvgDataById,
    getTypeToIdArray,
    updateMapColorById,
    updateMapPhotoById,
    deleteMapDataById,
    resetMapData,
  };
};

export default useKoreaMap;
