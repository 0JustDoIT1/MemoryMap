import {useMemo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {appUserState, koreaMapDataState} from 'src/recoil/atom';
import {
  AppKoreaMapData,
  GetColorRegionList,
  KoreaMapData,
  KoreaRegionData,
} from 'src/types/koreaMap';
import {_updateRealtime} from 'src/utils/realtime';
import {
  _deleteStorage,
  _deleteAllStorage,
  _downloadStorage,
  _uploadStorage,
} from 'src/utils/storage';
import {_deleteDoc, _setDoc} from 'src/utils/firestore';

const useKoreaMap = () => {
  const appUser = useRecoilValue(appUserState);
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);

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

  // type === photo 에 맞는 id 배열로 반환
  const getTypePhotoToIdArray = (type: 'init' | 'color' | 'photo') => {
    const arr: string[] = [];

    Object.values(koreaMapData).forEach(value => {
      if (value.type === type) {
        arr.push(value.id);
      }
    });

    return arr;
  };

  // 색상 업데이트 시 데이터 반환 (KoreaMapData)
  const updateDataByTypeColor = (id: string, color: string) => {
    const regionData: KoreaRegionData = {
      ...koreaMapData[id],
      background: color,
      type: 'color',
    };
    delete regionData.imageStyle;
    delete regionData.imageUrl;

    const updateData: KoreaMapData = {
      ...koreaMapData,
      [id]: regionData,
    };

    return updateData;
  };

  // 이미지 업데이트 시 데이터 반환 (KoreaMapData)
  const updateDataByTypePhoto = (
    id: string,
    photo: string,
    imageStyle: {x: number; y: number; scale: number; rotation: number},
  ) => {
    const regionData: KoreaRegionData = {
      ...koreaMapData[id],
      background: `url(#${id})`,
      type: 'photo',
      imageUrl: photo,
      imageStyle: imageStyle,
    };

    const updateData: KoreaMapData = {
      ...koreaMapData,
      [id]: regionData,
    };

    return updateData;
  };

  // 지도에서 배경(색상) 업데이트 -> Firebase & Recoil
  const updateMapColorById = async (id: string, color: string) => {
    const updateKoreaMapData = updateDataByTypeColor(id, color);

    const appKoreaMapData: AppKoreaMapData = {
      uid: appUser?.uid!,
      koreaMapData: updateKoreaMapData,
    };

    // 타입이 photo인 경우, 기존 사진 제거
    if (updateKoreaMapData[id].type === 'photo') {
      await _deleteStorage(appUser?.uid!, id);
    }

    // 사진 제거 이후(없다면 바로) 데이터 업데이트
    await _updateRealtime(appKoreaMapData, 'map').then(() => {
      setKoreaMapData(appKoreaMapData.koreaMapData);
    });
  };

  // 지도에서 배경(이미지) 업데이트 -> Firebase & Recoil
  const updateMapPhotoById = async (
    id: string,
    uri: string,
    imageStyle: {x: number; y: number; scale: number; rotation: number},
  ) => {
    await _uploadStorage(appUser?.uid!, id, uri);
    const imageUrl = await _downloadStorage(appUser?.uid!, id);

    if (imageUrl) {
      const updateKoreaMapData = updateDataByTypePhoto(
        id,
        imageUrl,
        imageStyle,
      );

      const appKoreaMapData: AppKoreaMapData = {
        uid: appUser?.uid!,
        koreaMapData: updateKoreaMapData,
      };

      await _updateRealtime(appKoreaMapData, 'map').then(() => {
        setKoreaMapData(appKoreaMapData.koreaMapData);
      });
    }
  };

  // 배경(색상or이미지) 제거 시 데이터 반환 (KoreaMapData)
  const deleteDataById = (id: string) => {
    const regionData: KoreaRegionData = {
      ...koreaMapData[id],
      background: '#ffffff',
      type: 'init',
      story: 0,
    };
    delete regionData.imageStyle;
    delete regionData.imageUrl;

    const updateData: KoreaMapData = {
      ...koreaMapData,
      [id]: regionData,
    };

    return updateData;
  };

  // 지도에서 배경(색상or이미지) 제거 -> Firebase & Recoil
  const deleteMapDataById = async (id: string) => {
    const updateKoreaMapData = deleteDataById(id);

    const appKoreaMapData: AppKoreaMapData = {
      uid: appUser?.uid!,
      koreaMapData: updateKoreaMapData,
    };

    if (koreaMapData[id].type === 'photo') {
      await _deleteStorage(appUser?.uid!, id);
    }

    await _updateRealtime(appKoreaMapData, 'map').then(() => {
      setKoreaMapData(appKoreaMapData.koreaMapData);
    });
  };

  // 스토리 업데이트 시 지도 정보에서 story 업데이트
  const updateKoreaMapDataStory = async (id: string, count: number) => {
    const updateRegionData: KoreaRegionData = {
      ...koreaMapData[id],
      story: koreaMapData[id].story + count,
    };

    const updateKoreaMapData: KoreaMapData = {
      ...koreaMapData,
      [id]: updateRegionData,
    };

    const appKoreaMapData: AppKoreaMapData = {
      uid: appUser?.uid!,
      koreaMapData: updateKoreaMapData,
    };

    await _updateRealtime(appKoreaMapData, 'map').then(() => {
      setKoreaMapData(appKoreaMapData.koreaMapData);
    });
  };

  // 지도 정보 초기화
  const resetMapData = async () => {
    const appKoreaMapData: AppKoreaMapData = {
      uid: appUser?.uid!,
      koreaMapData: koreaMapDataInit,
    };

    await _deleteAllStorage(appKoreaMapData.uid);
    await _updateRealtime(appKoreaMapData, 'map').then(() => {
      setKoreaMapData(koreaMapDataInit);
    });
  };

  return {
    koreaMapData,
    regionList,
    regionMain,
    getTypePhotoToIdArray,
    updateMapColorById,
    updateMapPhotoById,
    deleteMapDataById,
    updateKoreaMapDataStory,
    resetMapData,
  };
};

export default useKoreaMap;
