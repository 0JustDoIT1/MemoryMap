import {ImageSourcePropType} from 'react-native';

export interface IPoint {
  point: number;
  image: ImageSourcePropType;
  color: string;
  text: string;
}

export type IStoryPoint = Record<number, IPoint>;
