import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, View, Pressable, Linking} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {customColor} from 'src/style/customColor';
import {SignInProps} from 'src/types/stack';
import SocialLoginButton from 'src/components/socialLoginButton';
import EmailSignIn from '../components/emailSignIn';
import CustomBottomSheet from 'src/components/bottomSheet';
import EmailSignUp from '../components/emailSignUp';
import ResetPassword from '../components/resetPassword';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {appUserState, isDisabledState} from 'src/recoil/atom';
import {showBottomToast} from 'src/utils/showToast';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import CustomActivityIndicator from 'src/components/activityIndicator';
import {TermPrivacyUrl, TermServiceUrl} from 'src/constants/linking';
import {WebClientId} from '@env';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {
  syncDataToSQLite,
  onSignInGoogle,
  setInitialDataToDB,
  getInitialDataToDB,
} from 'src/utils/auth';
import {FirebaseUser} from 'src/types/account';

const SignInScreen = ({navigation}: SignInProps) => {
  // Bottom Sheet Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Bottom Sheet present event
  const handlePresentPress = useCallback(
    () => bottomSheetModalRef.current?.present(),
    [],
  );
  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const setAppUser = useSetRecoilState(appUserState);

  const [bottomSheetSnap, setBottomSheetSnap] = useState<string>('40%');
  const [bottomSheetTitle, setBottomSheetTitle] = useState<string | null>(null);
  const [bottomSheetDescription, setBottomSheetDescription] = useState<
    string | null
  >(null);
  const [bottomSheetContents, setBottomSheetContents] =
    useState<React.JSX.Element | null>(null);
  const [isDisabled, setIsDisabled] = useRecoilState(isDisabledState);

  // Google Sign In Configure
  useEffect(() => {
    const googleSigninConfigure = GoogleSignin.configure({
      webClientId: WebClientId,
    });
    return googleSigninConfigure;
  }, []);

  // Google SignIn
  const onSignInGoogleAuth = async () => {
    try {
      setIsDisabled(true);
      const result = await onSignInGoogle();
      if (result) {
        // Setting DisplayName
        const displayName = result.appUser.displayName
          ? result.appUser.displayName
          : result.appUser.email.split('@')[0];

        const newUser: FirebaseUser = {
          uid: result.appUser.uid,
          email: result.appUser.email,
          displayName: displayName,
          createdAt: result.appUser.createdAt,
        };

        // New User
        if (result.isNew) {
          const finalUser = await setInitialDataToDB(newUser);
          setAppUser(finalUser);
        }
        // Existing User
        else {
          await syncDataToSQLite(newUser);
          const finalUser = await getInitialDataToDB(newUser);
          setAppUser(finalUser);
        }

        onSignInGoogleAuthSuccess();
      } else {
        setIsDisabled(false);
      }
    } catch (error) {
      onSignInGoogleAuthError(error);
    }
  };

  const onSignInGoogleAuthSuccess = () => {
    setIsDisabled(false);
    navigation.replace('Main', {screen: 'Map'});
  };

  const onSignInGoogleAuthError = (error: any) => {
    setIsDisabled(false);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // User cancelled the login flow
      return;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Operation sign in is in progress already
      return showBottomToast(
        'error',
        '이미 로그인 진행 중입니다. 잠시만 기다려주세요.',
      );
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play services not available
      return showBottomToast(
        'error',
        '구글 플레이 서비스를 이용할 수 없거나 업데이트가 필요합니다.',
      );
    } else {
      // Some other error
      return showBottomToast('error', '구글 로그인에 실패했습니다.');
    }
  };

  // Terms Link
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
      {isDisabled ? (
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
              setBottomSheetSnap('53%');
              setBottomSheetTitle('계정 로그인');
              setBottomSheetContents(
                <EmailSignIn
                  navigation={navigation}
                  close={handleClosePress}
                />,
              );
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
                setBottomSheetSnap('70%');
                setBottomSheetTitle('회원가입');
                setBottomSheetContents(
                  <EmailSignUp
                    navigation={navigation}
                    close={handleClosePress}
                  />,
                );
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
                setBottomSheetSnap('45%');
                setBottomSheetTitle('비밀번호 재설정');
                setBottomSheetDescription(
                  `회원가입 시 입력했던 이메일 주소를 입력해 주세요.\n만약 메일이 오지 않는다면, 스팸 메일함을 확인해 주세요.`,
                );
                setBottomSheetContents(
                  <ResetPassword close={handleClosePress} />,
                );
                handlePresentPress();
              }}>
              <Text className="text-xs text-blur">비밀번호 찾기</Text>
            </Pressable>
          </View>
        </View>
      )}

      <CustomBottomSheet
        ref={bottomSheetModalRef}
        snap={bottomSheetSnap}
        title={bottomSheetTitle!}
        description={bottomSheetDescription!}
        contents={bottomSheetContents!}
      />
    </SafeAreaView>
  );
};

export default SignInScreen;
