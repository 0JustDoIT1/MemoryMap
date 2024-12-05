import {atom, RecoilEnv} from 'recoil';
import {User} from 'src/types/account';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// PinCode(Screen lock) Recoil
export const appPinCodeState = atom<boolean>({
  key: 'appPinCode',
  default: false,
});

// App signin data Recoil
export const appUserState = atom<User | null>({
  key: 'appUser',
  default: null,
});
