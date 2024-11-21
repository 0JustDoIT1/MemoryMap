import {GestureResponderEvent, Image} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useRecoilValue} from 'recoil';
import {isLoadingState} from 'src/recoil/atom';
import GoogleImage from 'assets/images/google_logo.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customStyle} from 'src/style/customStyle';

interface SocialLoginButton {
  type: 'Google' | 'Kakao' | 'Email';
  text: string;
  buttonClass?: string;
  buttonColor?: string;
  textColor?: string;
  onPress: (e: GestureResponderEvent) => void;
}

const SocialLoginButton = ({
  type,
  text,
  buttonClass,
  buttonColor,
  textColor,
  onPress,
}: SocialLoginButton) => {
  const isButtonDisabled = useRecoilValue(isLoadingState);
  const icon = (type: string) => {
    if (type === 'Google')
      return (
        <Image
          source={GoogleImage}
          className="w-5 h-5"
          style={{alignSelf: 'flex-start', marginLeft: 14}}
        />
      );
    if (type === 'Email')
      return (
        <MaterialCommunityIcons
          name="email"
          size={20}
          color={textColor}
          style={{alignSelf: 'flex-start', marginLeft: 14}}
        />
      );
  };

  return (
    <Button
      mode="elevated"
      icon={() => icon(type)}
      className={`w-full py-1 ${buttonClass}`}
      buttonColor={buttonColor}
      textColor={textColor}
      onPress={onPress}
      disabled={isButtonDisabled}>
      <Text
        className="text-sm font-roboto"
        style={customStyle({color: textColor}).socialLoginLabel}>
        {text} 계정으로 로그인
      </Text>
    </Button>
  );
};

export default SocialLoginButton;
