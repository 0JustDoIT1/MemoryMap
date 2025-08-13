import {IAppAdShowCategory} from 'src/types/app';

// SQLite
export const appTableName = {
  auth: 'auth',
  map: 'map',
  story: 'story',
};

// App
export const appName = 'MemoryMap';

// AsyncStorage
export const appShowRegionNameKey = 'appShowRegionName';
export const appAdMapCount = 'appAdMapCount';
export const appAdStoryCount = 'appAdStoryCount';

// BackUp
export const appBackUpRoute = 'MemoryMap-BackUp';

// AD
export const appAdMapMaxNum = 1;
export const appAdStoryMaxNum = 1;

export const adShowCategory = {
  map: 'map',
  story: 'story',
  reset: 'reset',
} as const;

// 어떤 key가 카운팅을 통해 광고를 표시할지
// (map, story는 일정 횟수 도달하면 광고 표시)
// (그 외에는 무조건 광고 표시)
export const AD_COUNTED = new Set<IAppAdShowCategory>([
  adShowCategory.map,
  adShowCategory.story,
]);

export const AD_COUNT_STORAGE_KEY: Partial<Record<IAppAdShowCategory, string>> =
  {
    [adShowCategory.map]: appAdMapCount,
    [adShowCategory.story]: appAdStoryCount,
  };

// 카운팅하는 category 최대 노출 간격(카운트 최대값)
export const MAX_BY_AD_COUNT: Partial<Record<IAppAdShowCategory, number>> = {
  [adShowCategory.map]: appAdMapMaxNum,
  [adShowCategory.story]: appAdStoryMaxNum,
};

// 핀코드
export const PIN_LENGTH = 4;
