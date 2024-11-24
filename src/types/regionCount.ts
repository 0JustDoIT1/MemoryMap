export interface RegionCount {
  [key: string]: {
    color: number;
    story: number;
  };
}

export interface AppRegionCount {
  uid: string;
  regionCount: RegionCount;
}
