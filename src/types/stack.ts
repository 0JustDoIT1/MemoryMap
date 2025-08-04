import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IStory} from './story';
import {IGetColorRegionList} from './koreaMap';

export type TStackParamList = {
  Root: undefined;
  Main: {
    screen: string;
  };
  PinCodeSetting: undefined;
  PinCodeEnter: {
    route: 'PinCodeSetting' | 'Map' | 'Setting';
  };
  Map: undefined;
  Dashboard: undefined;
  Story: undefined;
  Setting: undefined;
  Sub: undefined;
  AddStory: {
    regionId?: string;
  };
  EditStory: {
    story: IStory;
  };
  ViewStory: {
    storyId: string;
  };
  SelectRegion: {
    regionList: IGetColorRegionList;
    regionMainList: string[];
  };
  BackUp: undefined;
  MapTextSetting: undefined;
};

export type TRoot = NativeStackScreenProps<TStackParamList, 'Root'>;
export type TPinCodeSetting = NativeStackScreenProps<
  TStackParamList,
  'PinCodeSetting'
>;
export type TPinCodeEnter = NativeStackScreenProps<
  TStackParamList,
  'PinCodeEnter'
>;
export type TMap = NativeStackScreenProps<TStackParamList, 'Map'>;
export type TDashboard = NativeStackScreenProps<TStackParamList, 'Dashboard'>;
export type TStory = NativeStackScreenProps<TStackParamList, 'Story'>;
export type TSetting = NativeStackScreenProps<TStackParamList, 'Setting'>;
export type TSub = NativeStackScreenProps<TStackParamList, 'Sub'>;
export type TAddStory = NativeStackScreenProps<TStackParamList, 'AddStory'>;
export type TEditStory = NativeStackScreenProps<TStackParamList, 'EditStory'>;
export type TViewStory = NativeStackScreenProps<TStackParamList, 'ViewStory'>;
export type TSelectRegion = NativeStackScreenProps<
  TStackParamList,
  'SelectRegion'
>;
export type TBackUp = NativeStackScreenProps<TStackParamList, 'BackUp'>;
export type TMapTextSetting = NativeStackScreenProps<
  TStackParamList,
  'MapTextSetting'
>;
