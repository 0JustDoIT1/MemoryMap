import {create} from 'zustand';

interface AppPinCodeState {
  appPinCode: boolean;
  setAppPinCode: (appPinCode: boolean) => void;
}

export const useAppPinCode = create<AppPinCodeState>(set => ({
  appPinCode: false,
  setAppPinCode: (appPinCode: boolean) => set({appPinCode}),
}));