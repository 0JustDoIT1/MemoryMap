import {atom, RecoilEnv} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {AppUser} from 'src/types/account';
import {KoreaMapData} from 'src/types/koreaMap';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const appUserState = atom<AppUser | null>({
  key: 'appUser',
  default: null,
});

export const isLoadingState = atom<boolean>({
  key: 'isLoading',
  default: false,
});

export const koreaMapDataState = atom<KoreaMapData>({
  key: 'koreaMapData',
  default: koreaMapDataInit,
});
