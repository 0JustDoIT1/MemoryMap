import {useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {KoreaRegionList, RegionList} from 'src/constants/regionList';
import {appUserState, koreaMapDataState} from 'src/recoil/atom';
import {AppData} from 'src/types/account';
import {KoreaMapData, KoreaRegionData} from 'src/types/koreaMap';
import {_read, _update} from 'src/utils/database';
import {_download, _upload} from 'src/utils/storage';

const useKoreaMap = () => {
  const appUser = useRecoilValue(appUserState);
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);

  const [idArray, setIdArray] = useState<string[]>([]);

  // id로 해당 지역 데이터 가져오기
  const getMapDataById = (id: string): KoreaRegionData => {
    let result: any;

    // 객체 속 원하는 값 찾기 (Depth First Search 방식, 중첩 객체도 가능)
    const DFS = (obj: any, name: any, val: any) => {
      if (obj[name] === val) result = obj;
      else
        Object.values(obj).forEach(value => {
          if (typeof value === 'object') DFS(value, name, val);
        });
    };

    DFS(koreaMapData, 'id', id);

    return result;
  };

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

  // id로 해당 지역 배경 가져오기
  const getMapBackgroundById = (id: string): string => {
    const region = getMapDataById(id);

    return region.background;
  };

  // type에 맞는 id 배열로 반환
  const getTypePhotoToIdArray = (type: 'init' | 'color' | 'photo') => {
    const arr: string[] = [];
    Object.values(koreaMapData).forEach(value => {
      if (value.type === type) arr.push(value.id);
    });
    setIdArray(arr);
  };

  // 지도에서 배경(색상) 업데이트 -> Firebase & Recoil
  const updateMapColorById = async (id: string, color: string) => {
    const regionData: KoreaRegionData = {
      ...getMapDataById(id),
      background: color,
      type: 'color',
    };
    delete regionData.imageStyle;
    delete regionData.imageUrl;

    const updateData: KoreaMapData = {
      ...koreaMapData,
      [id]: regionData,
    };

    const appData: AppData = {
      uid: appUser?.uid as string,
      email: appUser?.email as string,
      koreaMapData: updateData,
    };

    return await _update(appData).then(() => setKoreaMapData(updateData));
  };

  // 지도에서 배경(이미지) 업데이트 -> Firebase & Recoil
  const updateMapPhotoById = async (
    id: string,
    uri: string,
    imageStyle: {x: number; y: number; scale: number; rotation: number},
  ) => {
    await _upload(appUser?.uid as string, id, uri).then(
      async res =>
        await _download(appUser?.uid as string, id).then(async res => {
          const regionData: KoreaRegionData = {
            ...getMapDataById(id),
            background: `url(#${id})`,
            type: 'photo',
            imageStyle: imageStyle,
            imageUrl: res,
          };

          const updateData: KoreaMapData = {
            ...koreaMapData,
            [id]: regionData,
          };

          const appData: AppData = {
            uid: appUser?.uid as string,
            email: appUser?.email as string,
            koreaMapData: updateData,
          };

          await _update(appData).then(async () => {
            setKoreaMapData(updateData);
          });
        }),
    );
  };

  // 지도에서 배경(색상or이미지) 제거 -> Firebase & Recoil
  const deleteMapDataById = async (id: string) => {
    const regionData: KoreaRegionData = {
      ...getMapDataById(id),
      background: '#ffffff',
      type: 'init',
    };
    delete regionData.imageStyle;
    delete regionData.imageUrl;

    const updateData: KoreaMapData = {
      ...koreaMapData,
      [id]: regionData,
    };

    const appData: AppData = {
      uid: appUser?.uid as string,
      email: appUser?.email as string,
      koreaMapData: updateData,
    };

    return await _update(appData).then(() => setKoreaMapData(updateData));
  };

  return {
    idArray,
    getMapDataById,
    getSvgDataById,
    getMapBackgroundById,
    getTypePhotoToIdArray,
    updateMapColorById,
    updateMapPhotoById,
    deleteMapDataById,
  };
};

export default useKoreaMap;
