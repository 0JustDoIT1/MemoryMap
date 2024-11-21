import {useEffect} from 'react';
import {RootProps} from 'src/types/stack';
import {Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {_readRealtime} from 'src/utils/realtime';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {AppUser} from 'src/types/account';
import {getSecureValue} from 'src/utils/keyChain';
import {KeyChainPinCode} from '@env';
import {useSetRecoilState} from 'recoil';
import {appPinCodeState} from 'src/recoil/atom';

const RootScreen = ({navigation}: RootProps) => {
  const setAppPinCode = useSetRecoilState(appPinCodeState);

  const {getDataAndSetRecoil} = useEmailAndPasswordAuth();

  // 기존 로그인 여부 확인
  const onSubscribeAuth = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      const appUserInit: AppUser = {
        uid: user.uid!,
        email: user.email!,
        displayName: user.displayName!,
        createdAt: user.metadata.creationTime!,
      };
      await getDataAndSetRecoil(appUserInit);
      const pinCodeLock = await getPinCodeToKeyChainCheck();
      if (pinCodeLock && pinCodeLock === KeyChainPinCode) {
        setAppPinCode(true);
        return navigation.replace('PinCodeEnter', {route: 'Main'});
      } else return navigation.replace('Main');
    } else {
      return navigation.replace('Auth');
    }
  };

  // KeyChain에 있는 pincode 여부 가져오기
  const getPinCodeToKeyChainCheck = async () => {
    return await getSecureValue(KeyChainPinCode).then(value => value?.username);
  };

  // 기존 로그인 여부 확인 한번만 실행하게끔
  useEffect(() => {
    const onUnsubscribeAuth = auth().onAuthStateChanged(onSubscribeAuth);
    return onUnsubscribeAuth;
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Image
        className="w-screen h-screen"
        source={require('assets/images/root_screen.png')}
      />
    </SafeAreaView>
  );
};

export default RootScreen;
