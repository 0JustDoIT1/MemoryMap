import {GestureResponderEvent, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

interface SocialLoginButton {
  icon: IconSource;
  text: string;
  color: string;
  textColor?: string;
  classes?: string;
  onPress: (e: GestureResponderEvent) => void;
}

const SocialLoginButton = ({
  icon,
  text,
  color,
  textColor,
  classes,
  onPress,
}: SocialLoginButton) => {
  return (
    <Button
      icon={icon}
      mode="elevated"
      onPress={onPress}
      buttonColor={color}
      className={classes}
      style={{
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 12,
      }}>
      <Text
        style={{fontSize: 14, fontFamily: 'Roboto-Medium', color: textColor}}>
        {text} 계정으로 로그인
      </Text>
    </Button>
  );
};

export default SocialLoginButton;
