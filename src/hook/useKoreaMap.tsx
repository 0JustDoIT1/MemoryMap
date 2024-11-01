import {useRecoilState, useRecoilValue} from 'recoil';
import {appUserState, koreaMapDataState} from 'src/recoil/atom';
import {AppData} from 'src/types/account';
import {KoreaMapData, KoreaRegionData} from 'src/types/koreaMap';
import {_update} from 'src/utils/firebase';

interface UpdateMapColorById {
  id: string;
  color: string;
}

const useKoreaMap = () => {
  const appUser = useRecoilValue(appUserState);
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);

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

  // 지도에서 배경(색상) 업데이트 -> Firebase & Recoil
  const updateMapColorById = async ({id, color}: UpdateMapColorById) => {
    const regionData: KoreaRegionData = {
      ...getMapDataById(id),
      background: color,
      type: 'color',
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

    return await _update(appData).then(() => setKoreaMapData(updateData));
  };

  // 지도에서 배경(색상or이미지) 제거 -> Firebase & Recoil
  const deleteMapDataById = async (id: string) => {
    const regionData: KoreaRegionData = {
      ...getMapDataById(id),
      background: '#ffffff',
      type: 'init',
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

    return await _update(appData).then(() => setKoreaMapData(updateData));
  };

  return {getMapDataById, updateMapColorById, deleteMapDataById};
};

export default useKoreaMap;
