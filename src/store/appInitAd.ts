import {create} from 'zustand';

interface AppInitAdState {
  appInitAd: boolean;
  setAppInitAd: (appInitAd: boolean) => void;
}

export const useAppInitAd = create<AppInitAdState>(set => ({
  appInitAd: false,
  setAppInitAd: (appInitAd: boolean) => set({appInitAd}),
}));