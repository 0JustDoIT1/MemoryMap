import {RegionCount} from 'src/types/account';
import {KoreaMapData, KoreaRegionData} from 'src/types/koreaMap';
import {countingStory} from './story';
import {KoreaRegionList} from 'src/constants/regionList';

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
  }
};

// 색상 업데이트 시 데이터 반환 (KoreaMapData)
export const updateDataByTypeColor = (
  data: KoreaMapData,
  id: string,
  color: string,
) => {
  const regionData: KoreaRegionData = {
    ...data[id],
    background: color,
    type: 'color',
  };
  delete regionData.imageStyle;
  delete regionData.imageUrl;

  const updateData: KoreaMapData = {
    ...data,
    [id]: regionData,
  };

  return updateData;
};

// 이미지 업데이트 시 데이터 반환 (KoreaMapData)
export const updateDataByTypePhoto = (
  data: KoreaMapData,
  id: string,
  photo: string,
  imageStyle: {x: number; y: number; scale: number; rotation: number},
) => {
  const regionData: KoreaRegionData = {
    ...data[id],
    background: `url(#${id})`,
    type: 'photo',
    imageUrl: photo,
    imageStyle: imageStyle,
  };

  const updateData: KoreaMapData = {
    ...data,
    [id]: regionData,
  };

  return updateData;
};

// 배경(색상or이미지) 제거 시 데이터 반환 (KoreaMapData)
export const deleteDataById = (data: KoreaMapData, id: string) => {
  const regionData: KoreaRegionData = {
    ...data[id],
    background: '#ffffff',
    type: 'init',
    story: 0,
  };
  delete regionData.imageStyle;
  delete regionData.imageUrl;

  const updateData: KoreaMapData = {
    ...data,
    [id]: regionData,
  };

  return updateData;
};

// 색칠된 지역 카운트 데이터 반환 (RegionCount)
export const updateRegionCountById = (
  countData: RegionCount,
  id: string,
  colorCount: number,
  storyCount: number,
) => {
  let updateCount!: RegionCount;

  updateCount = countingColor(countData, id, colorCount);
  updateCount = countingStory(updateCount, id, storyCount);

  return updateCount;
};

// 색칠된 지역 카운팅
const countingColor = (data: RegionCount, id: string, count: number) => {
  const mainId = `${id.split('-')[0]}-${id.split('-')[1]}`;

  const updateCount = {
    ...data,
    [mainId]: {
      ...data[mainId],
      color: data[mainId].color + count,
    },
  };

  return updateCount;
};

// id로 해당 지역명 (title이 아닌 value로 구성한 값) 반환
export const getRegionTitleById = (data: KoreaMapData, id: string) => {
  let title = data[id].value[0];
  if (data[id].value.length > 1) title += ` ${data[id].value[1]}`;

  return title;
};

// 총 지역 리스트(지도 데이터 x)에서 값 가져오기
export const getTitleByRegionList = (id: string) => {
  let title = KoreaRegionList[id].value[0];

  return title;
};
