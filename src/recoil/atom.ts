import {atom, RecoilEnv} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {RegionCountInit} from 'src/constants/regionCount';
import {AppUser, RegionCount} from 'src/types/account';
import {KoreaMapData} from 'src/types/koreaMap';
import {StoryObject} from 'src/types/story';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// 어플 로그인 데이터 Recoil
export const appUserState = atom<AppUser | null>({
  key: 'appUser',
  default: null,
});

// 어플 지도 데이터 Recoil
export const koreaMapDataState = atom<KoreaMapData>({
  key: 'koreaMapData',
  default: koreaMapDataInit,
});

// 어플 스토리 데이터 Recoil
export const storyState = atom<StoryObject | null>({
  key: 'story',
  default: null,
});

// 어플 스토리 수 Recoil (상위 지역만 / 하위 지역은 맵 데이터에 들어가 있음)
export const regionCountState = atom<RegionCount>({
  key: 'regionCount',
  default: RegionCountInit,
});

// 버튼 클릭 상태 Recoil
export const isLoadingState = atom<boolean>({
  key: 'isLoading',
  default: false,
});
