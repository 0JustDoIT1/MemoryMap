import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  Main: undefined;
  SignIn: undefined;
  EmailSignIn: undefined;
  EmailSignUp: undefined;
};

export type BottomTabStackParamList = {
  Map: undefined;
  Story: undefined;
  Setting: undefined;
};

export type RootProps = NativeStackScreenProps<RootStackParamList, 'Root'>;
export type SignInProps = NativeStackScreenProps<RootStackParamList>;
export type EmailSignInProps = NativeStackScreenProps<RootStackParamList>;
export type EmailSignUpProps = NativeStackScreenProps<RootStackParamList>;

export type MapProps = NativeStackScreenProps<BottomTabStackParamList>;
export type StoryProps = NativeStackScreenProps<BottomTabStackParamList>;
export type SettingProps = NativeStackScreenProps<BottomTabStackParamList>;
