export interface KoreaMapData {
  [key: string]: KoreaRegionData;
}

export interface KoreaRegionData {
  id: string;
  title: string;
  value: string[];
  type: 'init' | 'photo' | 'color';
  background: string;
  cacheFile?: string;
  story: number;
}
