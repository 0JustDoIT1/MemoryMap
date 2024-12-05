import {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import useDialog from 'src/hook/useDialog';
import useAuth from 'src/hook/useAuth';
import {appPinCodeState} from 'src/recoil/atom';
import {RootProps} from 'src/types/stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {KeyChainPinCode} from '@env';
import {getSecureValue} from 'src/utils/keyChain';
import {onOpenStoreLink} from 'src/utils/openStoreLink';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import CustomConfirmAlert from 'src/components/confirmAlert';
import {getInitialDataToDB, syncDataToSQLite} from 'src/utils/auth';
import {FirebaseUser} from 'src/types/account';

const RootScreen = ({navigation}: RootProps) => {
  const setAppPinCode = useSetRecoilState(appPinCodeState);

  const {appUser, setAppUser} = useAuth();

  const [initializing, setInitializing] = useState(true);
  const {visibleDialog, showDialog} = useDialog();

  let authFlag = true;

  // App version check & Check existing SignIn status
  useEffect(() => {
    // const check = checkVersion()
    checkVersion().then(check => {
      if (check) {
        const onUnsubscribeAuth = auth().onAuthStateChanged(onSubscribeAuth);
        return onUnsubscribeAuth;
      } else return showDialog();
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

  // Check existing SignIn status
  const onSubscribeAuth = async (user: FirebaseAuthTypes.User | null) => {
    if (authFlag) {
      // Existing SignIn
      if (user) {
        console.log('구독: 유저있음');
        const newUser: FirebaseUser = {
          uid: user.uid!,
          email: user.email!,
          displayName: user.displayName!,
          createdAt: user.metadata.creationTime!,
        };
        // Firebase 상에서 두번 실행이 강제되기 때문에 authFlag를 통해 한번만 실행되게끔 강제
        await syncDataToSQLite(newUser);
        const finalUser = await getInitialDataToDB(newUser);
        setAppUser(finalUser);
        authFlag = false; // Check existing SignIn complete

        // No Existing SignIn
      } else {
        console.log('구독: 유저없음');
        setAppUser(null);
        authFlag = false; // Check existing SignIn complete
      }
    }
    setInitializing(false); // Check existing SignIn complete
  };

  // Get pincode in KeyChain
  const getPinCodeToKeyChainCheck = async () => {
    return await getSecureValue(KeyChainPinCode).then(value => value?.username);
  };

  // Data Setting & Check pincode when AppUser Exists
  const settingData = async () => {
    if (appUser) {
      // Check pincode settings
      const pinCodeLock = await getPinCodeToKeyChainCheck();
      if (pinCodeLock && pinCodeLock === KeyChainPinCode) {
        setAppPinCode(true);
        // Pincode, navigate to the Lock screen
        navigation.replace('PinCodeEnter', {route: 'Map'});
      } else {
        // No pincode, navigate to the Main screen
        navigation.replace('Main', {screen: 'Map'});
      }
    }
  };

  useEffect(() => {
    // Need to check existing SignIn
    if (initializing) return;

    // Check existing SignIn & AppUser exists
    if (appUser) {
      // Setting Data
      settingData();
    } else {
      // Navigate to SignIn screen
      navigation.replace('Auth');
    }
  }, [appUser, initializing]);

  return (
    <SafeAreaView className="flex-1" edges={['left', 'right']}>
      <Image
        className="w-screen h-screen"
        source={require('assets/images/root_screen.png')}
      />
      <CustomConfirmAlert
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
