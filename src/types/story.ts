import {Timestamp} from '@react-native-firebase/firestore';

export interface Story {
  _id: string;
  regionId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  title: string;
  contents: string;
  point: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface StoryObject {
  [key: string]: Story;
}

export interface PointWithCount {
  [key: string]: {id: string; point: number; count?: number};
}

export interface AppStory {
  uid: string;
  story: StoryObject;
}
