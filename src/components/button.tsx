import {GestureResponderEvent} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import {useAppTheme} from 'src/style/paperTheme';

interface ButtonType {
  text: string;
  classes?: string;
  isDisabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  onSubmit?: (data: any) => void;
}

export const BrandContainedButton = ({
  text,
  classes,
  isDisabled,
  onPress,
}: ButtonType) => {
  const theme = useAppTheme();
  return (
    <Button
      mode="contained"
      className={classes}
      buttonColor={theme.colors.brandMain}
      onPress={onPress}
      disabled={isDisabled}>
      {isDisabled ? <ActivityIndicator /> : text}
    </Button>
  );
};

export const BrandOutlinedButton = ({
  text,
  classes,
  isDisabled,
  onPress,
}: ButtonType) => {
  const theme = useAppTheme();
  return (
    <Button
      mode="outlined"
      className={classes}
      style={customStyle().brandOutlinedButton}
      textColor={theme.colors.brandMain}
      onPress={onPress}
      disabled={isDisabled}>
      {isDisabled ? <ActivityIndicator /> : text}
    </Button>
  );
};

export const FormContainedButton = ({
  text,
  classes,
  isDisabled,
  onSubmit,
}: ButtonType) => {
  const theme = useAppTheme();
  return (
    <Button
      mode="contained"
      className={classes}
      buttonColor={theme.colors.brandMain}
      onPress={onSubmit}
      disabled={isDisabled}>
      {isDisabled ? <ActivityIndicator /> : text}
    </Button>
  );
};

export const FormOutlinedButton = ({
  text,
  classes,
  isDisabled,
  onSubmit,
}: ButtonType) => {
  const theme = useAppTheme();
  return (
    <Button
      mode="outlined"
      className={classes}
      style={customStyle().brandOutlinedButton}
      textColor={theme.colors.brandMain}
      onPress={onSubmit}
      disabled={isDisabled}>
      {isDisabled ? <ActivityIndicator /> : text}
    </Button>
  );
};

export const BrandDynamicButton = ({
  text,
  classes,
  isDisabled,
  onPress,
}: ButtonType) => {
  const theme = useAppTheme();
  return (
    <Button
      mode="contained"
      className={classes}
      buttonColor={isDisabled ? theme.colors.blur : theme.colors.brandMain}
      onPress={onPress}
      disabled={isDisabled}>
      {text}
    </Button>
  );
};
