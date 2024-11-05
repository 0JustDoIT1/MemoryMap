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
