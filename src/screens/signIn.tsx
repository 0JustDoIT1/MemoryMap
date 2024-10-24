import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useGoogleAuth from 'src/hook/useGoogleAuth';
import {useAppTheme} from 'src/style/paperTheme';
import {SignInProps} from 'src/types/stack';
import SocialLoginButton from 'src/components/socialLogin';
import EmailSignIn from './emailSignIn';
import CustomBottomSheet from 'src/components/bottomSheet';
import EmailSignUp from './emailSignUp';
import ResetPassword from './resetPassword';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
import {useSetRecoilState} from 'recoil';
import {appUserState, isButtonDisabledState} from 'src/recoil/atom';
import {showBottomToast} from 'src/utils/showToast';
import {statusCodes, User} from '@react-native-google-signin/google-signin';

const SignInScreen = ({navigation}: SignInProps) => {
  const theme = useAppTheme();

  const {onSignInGoogle} = useGoogleAuth();

  const setAppUser = useSetRecoilState(appUserState);
  const setIsButtonDisabled = useSetRecoilState(isButtonDisabledState);

  const onSignInGoogleAuth = async () => {
    setIsButtonDisabled(true);
    return await onSignInGoogle()
      .then(res => onSignInGoogleAuthSuccess(res))
      .catch(error => onSignInGoogleAuthError(error));
  };

  const onSignInGoogleAuthSuccess = (result: void | User) => {
    if (result) {
      const name = result.user.name
        ? result.user.name
        : result.user.email.split('@')[0];
      setAppUser({
        email: result.user.email,
        displayName: name,
      });
      navigation.replace('Main');
      setIsButtonDisabled(false);
      return showBottomToast('success', `반갑습니다. ${name}님!`);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const onSignInGoogleAuthError = (error: any) => {
    setIsButtonDisabled(false);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      return;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation sign in is in progress already
      return showBottomToast(
        'error',
        '이미 로그인 진행 중입니다. 잠시만 기다려주세요.',
      );
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available
      return showBottomToast(
        'error',
        '구글 플레이 서비스를 이용할 수 없거나 업데이트가 필요합니다.',
      );
    } else {
      // some other error
      return showBottomToast('error', '구글 로그인에 실패했습니다.');
    }
  };

  const {
    bottomSheetModalRef,
    snapPoints,
    bottomSheetTitle,
    bottomSheetDescription,
    bottomSheetContents,
    handlePresentModalPress,
    handleClosePress,
    renderBackdrop,
  } = useCustomBottomSheet();

  return (
    <SafeAreaView className="flex-1 justify-center p-8 bg-white dark:bg-black">
      <View className="h-2/3 flex justify-center items-center">
        <Image source={require('/assets/images/MemoryMap_Main.png')} />
        <Text className="text-gray-800">나만의 추억지도 만들기</Text>
      </View>
      <View className="h-1/3 flex justify-center items-center">
        <SocialLoginButton
          type="Google"
          text="Google"
          buttonColor={theme.colors.white}
          textColor={theme.colors.black}
          onPress={onSignInGoogleAuth}
        />
        <SocialLoginButton
          type="Email"
          text="이메일"
          buttonClass="mt-2"
          buttonColor={theme.colors.brandMain}
          textColor={theme.colors.white}
          onPress={() => {
            handlePresentModalPress({
              title: '계정 로그인',
              contents: (
                <EmailSignIn navigation={navigation} close={handleClosePress} />
              ),
              snap: '50%',
            });
          }}
        />
        <View className="flex-row justify-center items-center">
          <Divider className="w-1/3 my-5 bg-blur" />
          <Text className="text-xs mx-2">또는</Text>
          <Divider className="w-1/3 my-5 bg-blur" />
        </View>
        <View className="w-full flex items-center">
          <TouchableOpacity
            onPress={() => {
              handlePresentModalPress({
                title: '회원가입',
                contents: (
                  <EmailSignUp
                    navigation={navigation}
                    close={handleClosePress}
                  />
                ),
                snap: '70%',
              });
            }}>
            <Text className="underline">이메일로 회원가입</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full mt-auto flex-row justify-center items-center">
          <TouchableOpacity>
            <Text className="text-xs">개인정보 처리방침</Text>
          </TouchableOpacity>
          <View className="h-3/4 mx-3 border-r-[0.5px] border-blur"></View>
          <TouchableOpacity>
            <Text className="text-xs">서비스 이용약관</Text>
          </TouchableOpacity>
          <View className="h-3/4 mx-3 border-r-[0.5px] border-blur"></View>
          <TouchableOpacity
            onPress={() => {
              handlePresentModalPress({
                title: '비밀번호 재설정',
                description: `회원가입 시 입력했던 이메일 주소를 입력해 주세요.\n만약 메일이 오지 않는다면, 스팸 메일함을 확인해 주세요.`,
                contents: <ResetPassword close={handleClosePress} />,
                snap: '50%',
              });
            }}>
            <Text className="text-xs">비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleClosePress={handleClosePress}
        renderBackdrop={renderBackdrop}
        title={bottomSheetTitle}
        description={bottomSheetDescription}
        contents={bottomSheetContents}
      />
    </SafeAreaView>
  );
};

export default SignInScreen;
