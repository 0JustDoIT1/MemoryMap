import {IAppAdShowCategory} from 'src/types/app';
import {STORAGE_KEYS} from './storage';

// AD
export const AD_MAP_MAXNUM = 1;
export const AD_STORY_MAXNUM = 1;

export const AD_SHOW_CATEGORY = {
  map: 'map',
  story: 'story',
  reset: 'reset',
} as const;

// 어떤 key가 카운팅을 통해 광고를 표시할지
// (map, story는 일정 횟수 도달하면 광고 표시)
// (그 외에는 무조건 광고 표시)
export const AD_COUNTED = new Set<IAppAdShowCategory>([
  AD_SHOW_CATEGORY.map,
  AD_SHOW_CATEGORY.story,
]);

export const AD_COUNT_STORAGE_KEY: Partial<Record<IAppAdShowCategory, string>> =
  {
    [AD_SHOW_CATEGORY.map]: STORAGE_KEYS.adMapCount,
    [AD_SHOW_CATEGORY.story]: STORAGE_KEYS.adStoryCount,
  };

// 카운팅하는 category 최대 노출 간격(카운트 최대값)
export const MAX_BY_AD_COUNT: Partial<Record<IAppAdShowCategory, number>> = {
  [AD_SHOW_CATEGORY.map]: AD_MAP_MAXNUM,
  [AD_SHOW_CATEGORY.story]: AD_STORY_MAXNUM,
};
