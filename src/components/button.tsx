import {GestureResponderEvent} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import {useAppTheme} from 'src/style/paperTheme';

interface Button {
  text: string;
  classes?: string;
  isSubmitting?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  onSubmit?: (data: any) => void;
}

export const BrandButton = ({text, classes, isSubmitting, onPress}: Button) => {
  const theme = useAppTheme();
  return (
    <Button
      mode="contained"
      className={classes}
      buttonColor={theme.colors.brandMain}
      onPress={onPress}
      disabled={isSubmitting}>
      {isSubmitting ? <ActivityIndicator /> : text}
    </Button>
  );
};

export const FormContainedButton = ({
  text,
  classes,
  isSubmitting,
  onSubmit,
}: Button) => {
  const theme = useAppTheme();
  return (
    <Button
      mode="contained"
      className={classes}
      buttonColor={theme.colors.brandMain}
      onPress={onSubmit}
      disabled={isSubmitting}>
      {isSubmitting ? <ActivityIndicator /> : text}
    </Button>
  );
};

export const FormOutlinedButton = ({
  text,
  classes,
  isSubmitting,
  onSubmit,
}: Button) => {
  const theme = useAppTheme();
  return (
    <Button
      mode="outlined"
      className={classes}
      style={{borderColor: theme.colors.brandMain}}
      textColor={theme.colors.brandMain}
      onPress={onSubmit}
      disabled={isSubmitting}>
      {isSubmitting ? <ActivityIndicator /> : text}
    </Button>
  );
};
