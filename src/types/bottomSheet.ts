export interface SettingBottomSheet {
  title: string;
  description?: string;
  contents: React.JSX.Element;
  snap: string;
}

export interface SettingMapSheet {
  id: string;
  snap: string;
  polygon: string;
}
