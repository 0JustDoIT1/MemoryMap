import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  Main: undefined;
  SignIn: undefined;
};

export type BottomTabStackParamList = {
  Map: undefined;
  Story: undefined;
  Setting: undefined;
};

export type RootProps = NativeStackScreenProps<RootStackParamList, 'Root'>;
export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export type MapProps = NativeStackScreenProps<BottomTabStackParamList, 'Map'>;
export type StoryProps = NativeStackScreenProps<
  BottomTabStackParamList,
  'Story'
>;
export type SettingProps = NativeStackScreenProps<
  BottomTabStackParamList,
  'Setting'
>;
