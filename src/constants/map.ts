import {Dimensions} from 'react-native';

export const MAP_EDGE_OFFSET = 70;
export const MIN_SCALE = 0.5;
export const getMaxScale = (width: number, height: number) =>
  Math.min(width / 80, height / 80);
