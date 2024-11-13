import {atom, RecoilEnv} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {AppUser} from 'src/types/account';
import {KoreaMapData} from 'src/types/koreaMap';
import {Story} from 'src/types/story';

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
export const storyState = atom<Story[] | null>({
  key: 'story',
  default: [],
});

// 버튼 클릭 상태 Recoil
export const isLoadingState = atom<boolean>({
  key: 'isLoading',
  default: false,
});
