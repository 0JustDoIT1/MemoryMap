import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  SignIn: undefined;
};

export type BottomTabStackParamList = {
  Map: undefined;
  Story: undefined;
  Setting: undefined;
};

export type SignInProps = NativeStackScreenProps<RootStackParamList>;

export type MapProps = NativeStackScreenProps<BottomTabStackParamList>;
export type StoryProps = NativeStackScreenProps<BottomTabStackParamList>;
export type SettingProps = NativeStackScreenProps<BottomTabStackParamList>;
