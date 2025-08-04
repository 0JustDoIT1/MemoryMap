import {create} from 'zustand';
import {IAppShowRegionName} from 'src/types/appData';

interface AppShowRegionNameState {
  appShowRegionName: IAppShowRegionName;
  setAppShowRegionName: (appShowRegionName: IAppShowRegionName) => void;
}

export const useAppShowRegionName = create<AppShowRegionNameState>(set => ({
  appShowRegionName: 'show',
  setAppShowRegionName: (appShowRegionName: IAppShowRegionName) =>
    set({appShowRegionName}),
}));
