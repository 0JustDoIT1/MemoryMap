import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import useDialog from 'src/hook/useDialog';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {appPinCodeState} from 'src/recoil/atom';
import {RootProps} from 'src/types/stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AppUser} from 'src/types/account';
import {KeyChainPinCode} from '@env';
import {getSecureValue} from 'src/utils/keyChain';
import MemoizedCustomConfirmAlert from 'src/components/confirmAlert';
import {onOpenStoreLink} from 'src/utils/openStoreLink';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';

const RootScreen = ({navigation}: RootProps) => {
  const setAppPinCode = useSetRecoilState(appPinCodeState);

  const {getDataAndSetRecoil} = useEmailAndPasswordAuth();

  const {visibleDialog, showDialog} = useDialog();

  // 어플 버전 체크 & 기존 로그인 여부 확인 한번만 실행하게끔
  useEffect(() => {
    // const check = checkVersion()
    checkVersion().then(check => {
      if (check) {
        const onUnsubscribeAuth = auth().onAuthStateChanged(onSubscribeAuth);
        return onUnsubscribeAuth;
      } else showDialog();
    });
  }, []);

  const checkVersion = async () => {
    // const androidPackageName = VersionCheck.getPackageName(); //com.memorymap

    // const currentVersion = VersionCheck.getCurrentVersion();
    // const latestVersion = await VersionCheck.getLatestVersion({
    //   provider: 'playStore',
    //   packageName: androidPackageName,
    // })
    //   .then(value => value)
    //   .catch(error => console.error('Error fetching latest version: ', error));

    // if (latestVersion && latestVersion > currentVersion) return false;
    // else return true;

    // 임시
    return true;
  };

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
        return navigation.replace('PinCodeEnter', {route: 'Map'});
      } else return navigation.replace('Main', {screen: 'Map'});
    } else {
      return navigation.replace('Auth');
    }
  };

  // KeyChain에 있는 pincode 여부 가져오기
  const getPinCodeToKeyChainCheck = async () => {
    return await getSecureValue(KeyChainPinCode).then(value => value?.username);
  };

  return (
    <SafeAreaView className="flex-1" edges={['left', 'right']}>
      <Image
        className="w-screen h-screen"
        source={require('assets/images/root_screen.png')}
      />
      <MemoizedCustomConfirmAlert
        visible={visibleDialog}
        title="최신 버전 업데이트"
        description={`최신 버전 앱으로 업데이트를 위해\n스토어로 이동합니다.`}
        buttonText="확인"
        buttonOnPress={onOpenStoreLink}
        dismissable={false}
      />
    </SafeAreaView>
  );
};

export default RootScreen;
