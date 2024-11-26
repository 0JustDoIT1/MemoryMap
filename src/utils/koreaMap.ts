import {KoreaMapData, KoreaRegionData} from 'src/types/koreaMap';
import {KoreaRegionList, RegionList} from 'src/constants/regionList';

// 지도 바텀 시트 데이터 넣기
export const getDataToBottomSheet = (id: string) => {
  if (id !== '') {
    let result: any;

    // 객체 속 원하는 값 찾기 (Defth First Search 방식, 중첩 객체도 가능)
    const DFS = (obj: any, name: any, val: any) => {
      if (obj[name] === val) result = obj;
      else
        Object.values(obj).forEach(value => {
          if (typeof value === 'object') DFS(value, name, val);
        });
    };

    DFS(KoreaRegionList, 'id', id);

    const values = result.value;
    const length = values.length;
    const title: string = values[length - 1];

    let tagList: string[] = [];
    for (let i = 0; i < length - 1; i++) {
      tagList.push(values[i]);
    }

    return {title, tagList};
  } else return;
};

// id로 해당 지역 svg 데이터 가져오기
export const getSvgDataById = (id: string): RegionList => {
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

export const getRegionTitle = (data: KoreaRegionData) => {
  let title = data.value[0];
  if (data.value.length > 1) title += ` ${data.value[1]}`;

  return title;
};

// 전체 데이터에서 id로 해당 지역명 (title이 아닌 value로 구성한 값) 반환
export const getRegionTitleById = (data: KoreaMapData, id: string) => {
  let title = data[id].value[0];
  if (data[id].value.length > 1) title += ` ${data[id].value[1]}`;

  return title;
};

// 총 지역 리스트(지도 데이터 x)에서 지역명 가져오기
export const getTitleByRegionList = (id: string) => {
  let title = KoreaRegionList[id].value[0];

  return title;
};
