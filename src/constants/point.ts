import {ImageSourcePropType} from 'react-native';

import point_1 from 'assets/images/point_1.png';
import point_2 from 'assets/images/point_2.png';
import point_3 from 'assets/images/point_3.png';
import point_4 from 'assets/images/point_4.png';
import point_5 from 'assets/images/point_5.png';

export interface IPoint {
  point: number;
  image: ImageSourcePropType;
  color: string;
  text: string;
}

type IStoryPoint = Record<number, IPoint>;

export const STORY_POINT_VALUES = [5, 4, 3, 2, 1] as const;

export const storyPointBase: IStoryPoint = {
  5: {
    point: 5,
    image: point_5,
    color: '#41C450',
    text: '최고',
  },
  4: {
    point: 4,
    image: point_4,
    color: '#9ACD32',
    text: '좋음',
  },
  3: {
    point: 3,
    image: point_3,
    color: '#41C4AE',
    text: '보통',
  },
  2: {
    point: 2,
    image: point_2,
    color: '#FF7224',
    text: '나쁨',
  },
  1: {
    point: 1,
    image: point_1,
    color: '#FF4343',
    text: '최악',
  },
};

export const storyPointArray: IPoint[] = STORY_POINT_VALUES.map(
  v => storyPointBase[v],
);
