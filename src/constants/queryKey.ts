export const REACT_QUERY_KEYS = {
  koreaMapData: ['koreaMapData'],
  colorMapList: ['colorMapList'],
  storyList: {
    root: ['storyList'],
    withPagination: (pagination?: object) => ['storyList', pagination],
  },
  storyRegionList: ['storyRegionList'],
  dashboard: {
    koreaMap: ['dashboardKoreaMap'],
    story: ['dashboardStory'],
  },
};
