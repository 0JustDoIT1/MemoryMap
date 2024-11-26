import {Timestamp} from '@react-native-firebase/firestore';

export interface StoryData {
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

export interface Story {
  [key: string]: StoryData;
}

export interface PointWithCount {
  [key: string]: {id: string; point: number; count?: number};
}

export interface AppStory {
  uid: string;
  story: Story;
}
