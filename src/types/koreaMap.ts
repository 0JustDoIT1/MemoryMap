export interface KoreaMapData {
  [key: string]: {
    id: string;
    title: string;
    value: string[];
    type: 'init' | 'photo' | 'color';
    background: string;
    story: number;
  };
}
