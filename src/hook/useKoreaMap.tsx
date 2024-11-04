import {useRecoilState} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {appUserState, koreaMapDataState} from 'src/recoil/atom';
import {AppData, AppUser} from 'src/types/account';
import {KoreaMapData, KoreaRegionData} from 'src/types/koreaMap';
import {_read, _update} from 'src/utils/database';
import {_upload} from 'src/utils/storage';

const useKoreaMap = () => {
  const [appUser, setAppUser] = useRecoilState(appUserState);
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);

  // 로그인 시, uid를 통해 appData를 얻어오고 recoil에 세팅
  const getDataAndSetRecoil = async (user: AppUser) => {
    await _read(user.uid).then(async snapshot => {
      if (snapshot.val()) {
        setKoreaMapData(snapshot.val()['koreaMapData']);
        setAppUser(user);
      } else {
        // 구글 로그인으로 첫 로그인인 경우
        const appDataInit: AppData = {
          email: user.email,
          uid: user.uid,
          koreaMapData: koreaMapDataInit,
        };
        await _update(appDataInit).then(async () => {
          setKoreaMapData(koreaMapDataInit);
          setAppUser(user);
        });
      }
    });
  };

  // 회원가입 시 초기 데이터를 firebase/recoil에 세팅
  const setDataAndSetRecoil = async (user: AppUser) => {
    const appDataInit: AppData = {
      email: user.email,
      uid: user.uid,
      koreaMapData: koreaMapDataInit,
    };

    await _update(appDataInit).then(async () => {
      setKoreaMapData(koreaMapDataInit);
      setAppUser(user);
    });
  };

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

  // id로 해당 지역 배경 가져오기
  const getMapBackgroundById = (id: string): string => {
    const region = getMapDataById(id);

    if (region.type === 'photo') return `url(#${id})`;
    else return region.background;
  };

  // 지도에서 배경(색상) 업데이트 -> Firebase & Recoil
  const updateMapColorById = async (id: string, color: string) => {
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

  // 지도에서 배경(이미지) 업데이트 -> Firebase & Recoil
  const updateMapPhotoById = async (id: string, uri: string) => {
    const regionData: KoreaRegionData = {
      ...getMapDataById(id),
      background: id,
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
      await _upload(appData.uid, id, uri).then(() =>
        setKoreaMapData(updateData),
      );
    });
  };

  return {
    getDataAndSetRecoil,
    setDataAndSetRecoil,
    getMapDataById,
    getMapBackgroundById,
    updateMapColorById,
    deleteMapDataById,
    updateMapPhotoById,
  };
};

export default useKoreaMap;
