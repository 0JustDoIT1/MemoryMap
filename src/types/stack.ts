import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Story} from './story';
import {GetColorRegionList} from './koreaMap';

export type StackParamList = {
  Root: undefined;
  Auth: undefined;
  Main: {
    screen: string;
  };
  PinCodeSetting: undefined;
  PinCodeEnter: {
    route: 'PinCodeSetting' | 'Map' | 'Setting';
  };
  SignIn: undefined;
  Map: undefined;
  Dashboard: undefined;
  Story: undefined;
  Setting: undefined;
  Sub: undefined;
  AddStory: {
    regionId?: string;
  };
  EditStory: {
    story: Story;
  };
  ViewStory: {
    storyId: string;
  };
  SelectRegion: {
    regionList: GetColorRegionList;
    regionMainList: string[];
  };
  AccountInfo: undefined;
};

export type RootProps = NativeStackScreenProps<StackParamList, 'Root'>;
export type PinCodeSettingProps = NativeStackScreenProps<
  StackParamList,
  'PinCodeSetting'
>;
export type PinCodeEnterProps = NativeStackScreenProps<
  StackParamList,
  'PinCodeEnter'
>;
export type SignInProps = NativeStackScreenProps<StackParamList, 'SignIn'>;
export type MapProps = NativeStackScreenProps<StackParamList, 'Map'>;
export type DashboardProps = NativeStackScreenProps<
  StackParamList,
  'Dashboard'
>;
export type StoryProps = NativeStackScreenProps<StackParamList, 'Story'>;
export type SettingProps = NativeStackScreenProps<StackParamList, 'Setting'>;
export type SubProps = NativeStackScreenProps<StackParamList, 'Sub'>;
export type AddStoryProps = NativeStackScreenProps<StackParamList, 'AddStory'>;
export type EditStoryProps = NativeStackScreenProps<
  StackParamList,
  'EditStory'
>;
export type ViewStoryProps = NativeStackScreenProps<
  StackParamList,
  'ViewStory'
>;
export type SelectRegionProps = NativeStackScreenProps<
  StackParamList,
  'SelectRegion'
>;
export type AccountInfoProps = NativeStackScreenProps<
  StackParamList,
  'AccountInfo'
>;
