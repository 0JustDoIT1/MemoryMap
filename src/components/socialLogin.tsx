import {GestureResponderEvent, Image, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {useRecoilValue} from 'recoil';
import {isButtonDisabledState} from 'src/recoil/atom';
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
  const isButtonDisabled = useRecoilValue(isButtonDisabledState);
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
    // <TouchableHighlight
    //   className={`w-full py-4 rounded-lg ${buttonClass}`}
    //   underlayColor={underlayColor}
    //   onPress={onPress}
    //   disabled={isButtonDisabled}>
    //   <View className={`w-full items-center`}>
    //     <View className="absolute w-full h-full items-center justify-center">
    //       {type === 'Google' && (
    //         <Image
    //           source={GoogleImage}
    //           className="w-5 h-5"
    //           style={{alignSelf: 'flex-start', marginLeft: 14}}
    //         />
    //       )}
    //       {type === 'Email' && (
    //         <MaterialCommunityIcons
    //           name="email"
    //           size={20}
    //           color={theme.colors.white}
    //           style={{alignSelf: 'flex-start', marginLeft: 14}}
    //         />
    //       )}
    //     </View>
    //     <Text className={`text-sm font-roboto ${textClass}`}>
    //       {text} 계정으로 로그인
    //     </Text>
    //   </View>
    // </TouchableHighlight>
    <Button
      mode="elevated"
      icon={() => icon(type)}
      className={`w-full py-1 ${buttonClass}`}
      buttonColor={buttonColor}
      textColor={textColor}
      style={
        customStyle({disabled: isButtonDisabled, color: buttonColor})
          .socialLoginButton
      }
      onPress={onPress}
      disabled={isButtonDisabled}>
      <Text
        className="text-sm font-roboto"
        style={
          customStyle({disabled: isButtonDisabled, color: textColor})
            .socialLoginLabel
        }>
        {text} 계정으로 로그인
      </Text>
    </Button>
  );
};

export default SocialLoginButton;
