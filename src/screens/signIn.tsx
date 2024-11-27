import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, View, Pressable, Linking} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {customColor} from 'src/style/customColor';
import {SignInProps} from 'src/types/stack';
import SocialLoginButton from 'src/components/socialLogin';
import EmailSignIn from '../components/emailSignIn';
import CustomBottomSheet from 'src/components/bottomSheet';
import EmailSignUp from '../components/emailSignUp';
import ResetPassword from '../components/resetPassword';
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
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {onSignInGoogle} from 'src/utils/googleAuth';
import {useFocusEffect} from '@react-navigation/native';

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

  const {getDataAndSetRecoil, setDataAndSetRecoil} = useEmailAndPasswordAuth();

  const [bottomSheetSnap, setBottomSheetSnap] = useState<string>('40%');
  const [bottomSheetTitle, setBottomSheetTitle] = useState<string | null>(null);
  const [bottomSheetDescription, setBottomSheetDescription] = useState<
    string | null
  >(null);
  const [bottomSheetContents, setBottomSheetContents] =
    useState<React.JSX.Element | null>(null);

  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setIsFocus(true);

      return () => setIsFocus(false);
    }, []),
  );

  // Google Sign In Configure
  useEffect(() => {
    const googleSigninConfigure = GoogleSignin.configure({
      webClientId: WebClientId,
    });
    return googleSigninConfigure;
  }, []);

  // 구글 로그인
  const onSignInGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const result = await onSignInGoogle();
      if (result) {
        // 신규 회원
        if (result.isNew) await setDataAndSetRecoil(result.appUser);
        // 기존 회원
        else {
          const name = result.appUser.displayName
            ? result.appUser.displayName
            : result.appUser.email.split('@')[0];

          const appUser: AppUser = {
            uid: result.appUser.uid,
            email: result.appUser.email,
            displayName: name,
            createdAt: result.appUser.createdAt,
          };

          await getDataAndSetRecoil(appUser);
        }
        onSignInGoogleAuthSuccess();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      onSignInGoogleAuthError(error);
    }
  };

  const onSignInGoogleAuthSuccess = () => {
    setIsLoading(false);
    navigation.replace('Main', {screen: 'Map'});
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

      {isFocus && (
        <CustomBottomSheet
          ref={bottomSheetModalRef}
          snap={bottomSheetSnap}
          title={bottomSheetTitle!}
          description={bottomSheetDescription!}
          contents={bottomSheetContents!}
        />
      )}
    </SafeAreaView>
  );
};

export default SignInScreen;
