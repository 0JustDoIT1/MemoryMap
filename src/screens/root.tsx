import {useEffect} from 'react';
import {RootProps} from 'src/types/stack';
import {Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {_read} from 'src/utils/realtime';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {AppUser} from 'src/types/account';

const RootScreen = ({navigation}: RootProps) => {
  const {getDataAndSetRecoil} = useEmailAndPasswordAuth();

  const onSubscribeAuth = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      const appUserInit: AppUser = {
        uid: user.uid!,
        email: user.email!,
        displayName: user.displayName!,
        createdAt: user.metadata.creationTime!,
      };
      await getDataAndSetRecoil(appUserInit);
      navigation.replace('Main');
    } else {
      navigation.replace('Auth');
    }
  };

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
