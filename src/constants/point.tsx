import {ImageSourcePropType} from 'react-native';
import {sorting} from 'src/utils/sort';
import point_1 from 'assets/images/point_1.png';
import point_2 from 'assets/images/point_2.png';
import point_3 from 'assets/images/point_3.png';
import point_4 from 'assets/images/point_4.png';
import point_5 from 'assets/images/point_5.png';

export interface Point {
  point: number;
  image: ImageSourcePropType;
  color: string;
  text: string;
}

interface StoryPoint {
  [key: number]: Point;
}

export const storyPoint: StoryPoint = {
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

export const storyPointArray: Point[] = Object.values(storyPoint).sort((a, b) =>
  sorting(a, b, -1, 'point'),
);
