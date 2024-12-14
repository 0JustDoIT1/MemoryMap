import {atom, RecoilEnv} from 'recoil';
import {AppShowRegionName} from 'src/types/appData';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// PinCode(Screen lock) Recoil
export const appPinCodeState = atom<boolean>({
  key: 'appPinCode',
  default: false,
});

// Show region name
export const appShowRegionNameState = atom<AppShowRegionName>({
  key: 'appShowRegionName',
  default: 'show',
});
