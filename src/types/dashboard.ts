export interface IDashboardMap {
  mostRegion: {
    main: string;
    count: number;
  }[];
  color: number;
  photo: number;
  init: number;
}

export interface IDashboardStory {
  count: number;
  pointRegion: {
    title: string;
    avg: any;
  }[];
  countRegion: {
    title: string;
    count: any;
  }[];
}

export interface IStat {
  title: string;
  value: number;
  region: string;
  others: number;
  unit: '개' | '점';
}
