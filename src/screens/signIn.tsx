import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Image, View, Pressable, Linking} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useGoogleAuth from 'src/hook/useGoogleAuth';
import {customColor} from 'src/style/customColor';
import {SignInProps} from 'src/types/stack';
import SocialLoginButton from 'src/components/socialLogin';
import EmailSignInScreen from './emailSignIn';
import CustomBottomSheet from 'src/components/bottomSheet';
import EmailSignUpScreen from './emailSignUp';
import ResetPasswordScreen from './resetPassword';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
import {useRecoilState} from 'recoil';
import {isLoadingState} from 'src/recoil/atom';
import {showBottomToast} from 'src/utils/showToast';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AppUser} from 'src/types/account';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import CustomActivityIndicator from 'src/components/activityIndicator';
import {TermPrivacyUrl, TermServiceUrl} from 'src/constants/linking';
import {WebClientId} from '@env';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';

const SignInScreen = ({navigation}: SignInProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Bottom Sheet height setting [index0, index1]
  const snapPoints = useMemo(() => ['40%', '70%'], []);

  // Bottom Sheet present event
  const handlePresentPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  // Bottom Sheet close event when background touch
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const {getDataAndSetRecoil, setDataAndSetRecoil} = useEmailAndPasswordAuth();
  const {onSignInGoogle} = useGoogleAuth();
  const {
    bottomSheetTitle,
    bottomSheetDescription,
    bottomSheetContents,
    settingBottomSheet,
  } = useCustomBottomSheet();

  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  // Google Sign In Configure
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WebClientId,
    });
  }, []);

  // 구글 로그인
  const onSignInGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const result = await onSignInGoogle();
      if (result && result.isNew) await setDataAndSetRecoil(result.appUser);
      else {
        if (result && result.appUser) {
          const name = result.appUser.displayName
            ? result.appUser.displayName
            : result.appUser.email.split('@')[0];
          const appUserInit: AppUser = {
            uid: result.appUser.uid,
            email: result.appUser.email,
            displayName: name,
            createdAt: result.appUser.createdAt,
          };

          await getDataAndSetRecoil(appUserInit);
        }
      }
      onSignInGoogleAuthSuccess();
    } catch (error) {
      onSignInGoogleAuthError(error);
    }
  };

  const onSignInGoogleAuthSuccess = () => {
    navigation.replace('Main', {screen: 'Map'});
    setIsLoading(false);
  };

  const onSignInGoogleAuthError = (error: any) => {
    setIsLoading(false);
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

  const LinkingTerm = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white p-8"
      edges={['top', 'bottom', 'left', 'right']}>
      <View className="h-2/3 flex justify-center items-center">
        <Image source={require('/assets/images/MemoryMap_Main.png')} />
        <Text className="text-gray-800">나만의 추억지도 만들기</Text>
      </View>
      {isLoading ? (
        <CustomActivityIndicator />
      ) : (
        <View className="w-full h-1/3 flex justify-center items-center px-4">
          <SocialLoginButton
            type="Google"
            text="Google"
            buttonColor={customColor.white}
            textColor={customColor.black}
            onPress={onSignInGoogleAuth}
          />
          <SocialLoginButton
            type="Email"
            text="이메일"
            buttonClass="mt-2"
            buttonColor={customColor.brandMain}
            textColor={customColor.white}
            onPress={() => {
              settingBottomSheet({
                title: '계정 로그인',
                contents: (
                  <EmailSignInScreen
                    navigation={navigation}
                    close={handleClosePress}
                  />
                ),
              });
              handlePresentPress();
            }}
          />
          <View className="w-full flex-row justify-center items-center">
            <Divider className="w-1/3 my-5 bg-blur" />
            <Text className="text-xs mx-2 text-blur">또는</Text>
            <Divider className="w-1/3 my-5 bg-blur" />
          </View>
          <View className="w-full flex items-center">
            <Pressable
              onPress={() => {
                settingBottomSheet({
                  title: '회원가입',
                  contents: (
                    <EmailSignUpScreen
                      navigation={navigation}
                      close={handleClosePress}
                    />
                  ),
                });
                handlePresentPress();
              }}>
              <Text className="underline text-blur">이메일로 회원가입</Text>
            </Pressable>
          </View>
          <View className="w-full mt-auto flex-row justify-center items-center">
            <Pressable onPress={() => LinkingTerm(TermPrivacyUrl)}>
              <Text className="text-xs text-blur">개인정보 처리방침</Text>
            </Pressable>
            <View className="h-3/4 mx-3 border-r-[0.5px] border-blur"></View>
            <Pressable onPress={() => LinkingTerm(TermServiceUrl)}>
              <Text className="text-xs text-blur">서비스 이용약관</Text>
            </Pressable>
            <View className="h-3/4 mx-3 border-r-[0.5px] border-blur"></View>
            <Pressable
              onPress={() => {
                settingBottomSheet({
                  title: '비밀번호 재설정',
                  description: `회원가입 시 입력했던 이메일 주소를 입력해 주세요.\n만약 메일이 오지 않는다면, 스팸 메일함을 확인해 주세요.`,
                  contents: <ResetPasswordScreen close={handleClosePress} />,
                });
                handlePresentPress();
              }}>
              <Text className="text-xs text-blur">비밀번호 찾기</Text>
            </Pressable>
          </View>
        </View>
      )}

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
