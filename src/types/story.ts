export interface Story {
  id: string;
  startDate: Date;
  endDate: Date;
  title: string;
  contents: string;
  point: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AppStory {
  uid: string;
  story: Story[];
}
