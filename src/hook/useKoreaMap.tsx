import {useRecoilState} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {appUserState, koreaMapDataState} from 'src/recoil/atom';
import {AppData, AppUser} from 'src/types/account';
import {KoreaMapData, KoreaRegionData} from 'src/types/koreaMap';
import {getData, setData} from 'src/utils/asyncStorage';
import {_read, _update} from 'src/utils/database';
import {_upload} from 'src/utils/storage';

interface UpdateMapColorById {
  id: string;
  color: string;
}

interface UpdateMapPhotoById {
  id: string;
  uri: string;
}

const useKoreaMap = () => {
  const [appUser, setAppUser] = useRecoilState(appUserState);
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);

  // AppData를 async-storage와 recoil에 저장하는 함수(공통)
  const _setStorageAndRecoil = async (data: AppData) => {
    await setData(data.uid, JSON.stringify(data));
    setKoreaMapData(data.koreaMapData);
  };

  // 로그인 시, uid를 통해 appData를 얻어오고 recoil에 세팅
  // async-storage에 값이 있으면 그 값을 불러오고, 없으면 firebase에서 불러옴
  const getDataAndSetRecoil = async (user: AppUser) => {
    const storageData = await getData(user.uid);
    if (storageData) {
      const appData: AppData = JSON.parse(storageData);
      setAppUser(user);
      setKoreaMapData(appData.koreaMapData);
    } else {
      await _read(user.uid).then(async snapshot => {
        if (snapshot.val()) {
          await _setStorageAndRecoil(snapshot.val());
          setAppUser(user);
        } else {
          // 구글 로그인으로 첫 로그인인 경우
          const appDataInit: AppData = {
            email: user.email,
            uid: user.uid,
            koreaMapData: koreaMapDataInit,
          };
          await _update(appDataInit).then(async () => {
            await _setStorageAndRecoil(appDataInit);
            setAppUser(user);
          });
        }
      });
    }
  };

  // 회원가입 시 초기 데이터를 async-storage/firebase/recoil에 세팅
  const setDataAndSetRecoil = async (user: AppUser) => {
    const appDataInit: AppData = {
      email: user.email,
      uid: user.uid,
      koreaMapData: koreaMapDataInit,
    };

    await _update(appDataInit).then(async () => {
      await _setStorageAndRecoil(appDataInit);
      setAppUser(user);
    });
  };

  // id로 해당 지역 데이터 얻어오기
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

  // 지도에서 배경(색상) 업데이트 -> Firebase & AsyncStorage & Recoil
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

    return await _update(appData).then(
      async () => await _setStorageAndRecoil(appData),
    );
  };

  // 지도에서 배경(색상or이미지) 제거 -> Firebase & AsyncStorage & Recoil
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

    return await _update(appData).then(
      async () => await _setStorageAndRecoil(appData),
    );
  };

  const updateDataWithCache = (
    id: string,
    data: KoreaRegionData,
    uri: string,
  ) => {
    const regionDataWithCache: KoreaRegionData = {
      ...data,
      cacheFile: uri,
    };
    const updateData: KoreaMapData = {
      ...koreaMapData,
      [id]: regionDataWithCache,
    };

    return updateData;
  };

  // 지도에서 배경(이미지) 업데이트 -> Firebase & AsyncStorage & Recoil
  const updateMapPhotoById = async ({id, uri}: UpdateMapPhotoById) => {
    const regionData: KoreaRegionData = {
      ...getMapDataById(id),
      background: `${id}.png`,
      type: 'photo',
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
      await _upload({uid: appData.uid, id, uri}).then(
        async () => await _setStorageAndRecoil(appData),
      );
    });
  };

  return {
    getDataAndSetRecoil,
    setDataAndSetRecoil,
    getMapDataById,
    updateMapColorById,
    deleteMapDataById,
    updateMapPhotoById,
  };
};

export default useKoreaMap;
