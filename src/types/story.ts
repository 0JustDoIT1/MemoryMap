export interface Story {
  _id: string;
  regionId: string;
  startDate: string;
  endDate: string;
  title: string;
  contents: string;
  point: number;
  createdAt: string;
  updatedAt?: string;
}

export interface StoryObject {
  [key: string]: Story;
}

export interface AppStory {
  uid: string;
  story: StoryObject;
}
