import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useGoogleAuth from 'src/hook/useGoogleAuth';
import {useAppTheme} from 'src/style/paperTheme';
import {SignInProps} from 'src/types/stack';
import GoogleImage from 'assets/images/google_logo.png';
// import KakaoImage from 'assets/images/kakao_logo.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SocialLoginButton from 'src/components/socialLogin';
import EmailSignIn from './emailSignIn';
import CustomBottomSheet from 'src/components/bottomSheet';
import EmailSignUp from './emailSignUp';
import ResetPassword from './resetPassword';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
// import useKakaoAuth from 'src/hook/useKakaoAuth';

const SignInScreen = ({navigation}: SignInProps) => {
  const theme = useAppTheme();

  const {onSignInGoogle} = useGoogleAuth();
  // const {onSignInKakao} = useKakaoAuth();

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
          icon={() => (
            <Image
              source={GoogleImage}
              style={{width: 18, height: 18, marginTop: 1}}
            />
          )}
          classes="w-full py-1"
          text="Google"
          color="white"
          textColor="#000000"
          onPress={onSignInGoogle}
        />
        {/* <SocialLoginButton
          icon={() => (
            <Image source={KakaoImage} style={{width: 18, height: 18}} />
          )}
          classes="w-full py-1"
          text="Kakao"
          color="#FEE500"
          textColor="#000000"
          onPress={onSignInKakao}
        /> */}
        <SocialLoginButton
          icon={() => (
            <MaterialCommunityIcons name="email" size={18} color="#FFFFFF" />
          )}
          classes="w-full py-1 mt-2"
          text="이메일"
          color={theme.colors.brandMain}
          textColor="#FFFFFF"
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
          <Divider
            className="w-1/3 my-5"
            style={{backgroundColor: theme.colors.blur}}
          />
          <Text className="text-xs mx-2">또는</Text>
          <Divider
            className="w-1/3 my-5"
            style={{backgroundColor: theme.colors.blur}}
          />
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
          {/* <TouchableOpacity
            className="mt-1"
            onPress={() => {
              handlePresentModalPress(
                '40%',
                '비밀번호 재설정',
                <ResetPassword close={handleClosePress} />,
              );
            }}>
            <Text className="text-xs">비밀번호를 잊으셨나요?</Text>
          </TouchableOpacity> */}
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
        {/* <Button
          onPress={() => {
            navigation.replace('Main');
          }}>
          지도
        </Button>
        <Button onPress={onSignOutGoogle}>로그아웃</Button> */}
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
