import {useRecoilState} from 'recoil';
import {koreaMapDataState} from 'src/recoil/atom';
import {KoreaRegionData} from 'src/types/koreaMap';

const useKoreaMap = () => {
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);

  const getMapDataById = (id: string): KoreaRegionData => {
    let result: any;

    // 객체 속 원하는 값 찾기 (Defth First Search 방식, 중첩 객체도 가능)
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

  return {getMapDataById};
};

export default useKoreaMap;
