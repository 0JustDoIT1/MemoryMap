export interface KoreaMapData {
  [key: string]: KoreaRegionData;
}

export interface KoreaRegionData {
  id: string;
  title: string;
  value: string[];
  type: 'init' | 'photo' | 'color';
  background: string;
  imageStyle?: {x: number; y: number; scale: number; rotation: number};
  imageUrl?: string;
  story: number;
}

// 지도 색칠된 지역(color & photo) 리스트 가져오기 결과값
export interface GetColorRegionList {
  [key: string]: {
    child: boolean;
    sub: {id: string; title: string}[];
  };
}
