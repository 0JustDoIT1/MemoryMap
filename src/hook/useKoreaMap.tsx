import {useCallback, useMemo, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {KoreaRegionList, RegionList} from 'src/constants/regionList';
import {appUserState, koreaMapDataState} from 'src/recoil/atom';
import {AppData} from 'src/types/account';
import {KoreaMapData, KoreaRegionData} from 'src/types/koreaMap';
import {_update} from 'src/utils/database';
import {_delete, _deleteAll, _download, _upload} from 'src/utils/storage';

const useKoreaMap = () => {
  const appUser = useRecoilValue(appUserState);
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);

  // id로 해당 지역 데이터 가져오기
  const getMapDataById = useCallback(
    (id: string): KoreaRegionData => {
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
    },
    [koreaMapData],
  );

  // id로 해당 지역 배경 가져오기
  const getMapBackgroundById = useCallback(
    (id: string): string => {
      const region = getMapDataById(id);

      return region.background;
    },
    [koreaMapData],
  );

  // id로 해당 지역 svg 데이터 가져오기
  const getSvgDataById = useCallback((id: string): RegionList => {
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
  }, []);

  // type === photo 에 맞는 id 배열로 반환
  const getTypeToIdArray = useCallback(
    (type: 'init' | 'color' | 'photo') => {
      const arr: string[] = [];

      Object.values(koreaMapData).forEach(value => {
        if (value.type === type) {
          arr.push(value.id);
        }
      });

      return arr;
    },
    [koreaMapData],
  );

  // 지도에서 배경(색상) 업데이트 -> Firebase & Recoil
  const updateMapColorById = useCallback(
    async (id: string, color: string) => {
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
        uid: appUser?.uid!,
        email: appUser?.email!,
        koreaMapData: updateData,
      };

      if (getMapDataById(id).type === 'photo') {
        await _delete(appData.uid, id).then();
      }
      await _update(appData).then(() => setKoreaMapData(updateData));
    },
    [appUser, koreaMapData],
  );

  // 지도에서 배경(이미지) 업데이트 -> Firebase & Recoil
  const updateMapPhotoById = useCallback(
    async (
      id: string,
      uri: string,
      imageStyle: {x: number; y: number; scale: number; rotation: number},
    ) => {
      await _upload(appUser?.uid!, id, uri).then(
        async res =>
          await _download(appUser?.uid!, id).then(async res => {
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
              uid: appUser?.uid!,
              email: appUser?.email!,
              koreaMapData: updateData,
            };

            await _update(appData).then(async () => {
              setKoreaMapData(updateData);
            });
          }),
      );
    },
    [appUser, koreaMapData],
  );

  // 지도에서 배경(색상or이미지) 제거 -> Firebase & Recoil
  const deleteMapDataById = useCallback(
    async (id: string) => {
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
        uid: appUser?.uid!,
        email: appUser?.email!,
        koreaMapData: updateData,
      };

      if (getMapDataById(id).type === 'photo') {
        await _delete(appData.uid, id).then();
      }
      await _update(appData).then(() => setKoreaMapData(updateData));
    },
    [appUser, koreaMapData],
  );

  // 지도 정보 초기화
  const resetMapData = useCallback(async () => {
    const appData: AppData = {
      uid: appUser?.uid!,
      email: appUser?.email!,
      koreaMapData: koreaMapDataInit,
    };

    return await _deleteAll(appData.uid).then(async () => {
      await _update(appData).then(() => setKoreaMapData(koreaMapDataInit));
    });
  }, [appUser]);

  // 지도 색칠된 지역(color & photo) 리스트 가져오기
  const getColorRegionList = useCallback(() => {
    interface Result {
      [key: string]: string[];
    }

    const result: Result = {};

    const colorList = Object.values(koreaMapData).filter(
      region => region.type !== 'init',
    );

    colorList.forEach((region, index) => {
      let value =
        region.value.length === 1
          ? []
          : [region.value[region.value.length - 1]];

      if (index === 0) result[region.value[0]] = value;
      else {
        const exist = result[region.value[0]];
        if (exist)
          result[region.value[0]].push(region.value[region.value.length - 1]);
        else result[region.value[0]] = value;
      }
    });

    return result;
  }, [koreaMapData]);

  return {
    koreaMapData,
    getMapDataById,
    getMapBackgroundById,
    getSvgDataById,
    getTypeToIdArray,
    updateMapColorById,
    updateMapPhotoById,
    deleteMapDataById,
    resetMapData,
    getColorRegionList,
  };
};

export default useKoreaMap;
