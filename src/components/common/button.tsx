import {GestureResponderEvent} from 'react-native';
import {Button} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import {customColor} from 'src/style/customColor';

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
  return (
    <Button
      mode="contained"
      className={classes}
      buttonColor={customColor.brandMain}
      onPress={onPress}
      disabled={isDisabled}>
      {text}
    </Button>
  );
};

export const BrandOutlinedButton = ({
  text,
  classes,
  isDisabled,
  onPress,
}: ButtonType) => {
  return (
    <Button
      mode="outlined"
      className={classes}
      style={customStyle().brandOutlinedButton}
      textColor={customColor.brandMain}
      onPress={onPress}
      disabled={isDisabled}>
      {text}
    </Button>
  );
};

export const FormContainedButton = ({
  text,
  classes,
  isDisabled,
  onSubmit,
}: ButtonType) => {
  return (
    <Button
      mode="contained"
      className={classes}
      buttonColor={customColor.brandMain}
      onPress={onSubmit}
      disabled={isDisabled}>
      {text}
    </Button>
  );
};

export const FormOutlinedButton = ({
  text,
  classes,
  isDisabled,
  onSubmit,
}: ButtonType) => {
  return (
    <Button
      mode="outlined"
      className={classes}
      style={customStyle().brandOutlinedButton}
      textColor={customColor.brandMain}
      onPress={onSubmit}
      disabled={isDisabled}>
      {text}
    </Button>
  );
};

export const BrandDynamicButton = ({
  text,
  classes,
  isDisabled,
  onPress,
}: ButtonType) => {
  return (
    <Button
      mode="contained"
      className={classes}
      buttonColor={isDisabled ? customColor.blur : customColor.brandMain}
      onPress={onPress}
      disabled={isDisabled}>
      {text}
    </Button>
  );
};
