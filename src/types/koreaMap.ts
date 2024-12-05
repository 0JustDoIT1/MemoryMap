export interface KoreaMapDataObject {
  [key: string]: KoreaRegionData;
}

export interface KoreaRegionData {
  uid: string;
  id: string;
  title: string;
  main: string;
  type: 'init' | 'photo' | 'color';
  background: string;
  story: number;
  imageUrl?: string;
  imageStyle?: {width: number; height: number};
}

// 지도 색칠된 지역(color & photo) 리스트 가져오기 결과값
export interface GetColorRegionList {
  [key: string]: {
    child: boolean;
    sub: {id: string; title: string}[];
  };
}
