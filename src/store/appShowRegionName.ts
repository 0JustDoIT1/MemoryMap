import {create} from 'zustand';
import {IShowRegionName} from 'src/types/koreaMap';

interface AppShowRegionNameState {
  appShowRegionName: IShowRegionName;
  setAppShowRegionName: (appShowRegionName: IShowRegionName) => void;
}

export const useAppShowRegionName = create<AppShowRegionNameState>(set => ({
  appShowRegionName: 'show',
  setAppShowRegionName: (appShowRegionName: IShowRegionName) =>
    set({appShowRegionName}),
}));
