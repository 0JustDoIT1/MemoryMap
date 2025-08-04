export interface IStory {
  id: string;
  regionId: string;
  startDate: string;
  endDate: string;
  title: string;
  contents: string;
  point: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPagination {
  limit: number;
  filter: string;
  order: string;
  sort: string;
}
