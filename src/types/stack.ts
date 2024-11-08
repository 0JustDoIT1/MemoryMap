import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type StackParamList = {
  Root: undefined;
  Auth: undefined;
  Main: undefined;
  SignIn: undefined;
  Map: undefined;
  Story: undefined;
  Setting: undefined;
  Sub: undefined;
  CropImage: {
    id: string;
    title: string;
    image: string;
  };
};

export type RootProps = NativeStackScreenProps<StackParamList, 'Root'>;
export type SignInProps = NativeStackScreenProps<StackParamList, 'SignIn'>;
export type MapProps = NativeStackScreenProps<StackParamList, 'Map'>;
export type StoryProps = NativeStackScreenProps<StackParamList, 'Story'>;
export type SettingProps = NativeStackScreenProps<StackParamList, 'Setting'>;
export type SubProps = NativeStackScreenProps<StackParamList, 'Sub'>;
export type CropImageProps = NativeStackScreenProps<
  StackParamList,
  'CropImage'
>;
