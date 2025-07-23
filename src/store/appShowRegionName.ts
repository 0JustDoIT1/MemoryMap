import {create} from 'zustand';
import {AppShowRegionName} from 'src/types/appData';

interface AppShowRegionNameState {
  appShowRegionName: AppShowRegionName;
  setAppShowRegionName: (appShowRegionName: AppShowRegionName) => void;
}

export const useAppShowRegionName = create<AppShowRegionNameState>(set => ({
  appShowRegionName: 'show',
  setAppShowRegionName: (appShowRegionName: AppShowRegionName) =>
    set({appShowRegionName}),
}));