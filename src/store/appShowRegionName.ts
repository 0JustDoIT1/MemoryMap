import {create} from 'zustand';
import {IAppShowRegionName} from 'src/types/app';

interface AppShowRegionNameState {
  appShowRegionName: IAppShowRegionName;
  setAppShowRegionName: (appShowRegionName: IAppShowRegionName) => void;
}

export const useAppShowRegionName = create<AppShowRegionNameState>(set => ({
  appShowRegionName: 'show',
  setAppShowRegionName: (appShowRegionName: IAppShowRegionName) =>
    set({appShowRegionName}),
}));
