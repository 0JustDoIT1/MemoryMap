import {atom} from 'recoil';
import {AppUser} from 'src/types/account';

export const appUserState = atom<AppUser | null>({
  key: 'appUser',
  default: null,
});

export const isButtonDisabledState = atom<boolean>({
  key: 'isButtonDisabled',
  default: false,
});

export const KoreaMapDataState = atom<any>({
  key: 'koreaMapData',
  default: {},
});
