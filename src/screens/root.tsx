import {useEffect} from 'react';
import {RootProps} from 'src/types/stack';
import {Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useSetRecoilState} from 'recoil';
import {appUserState, koreaMapDataState} from 'src/recoil/atom';
import {_read} from 'src/utils/firebase';

const Root = ({navigation}: RootProps) => {
  const setAppUser = useSetRecoilState(appUserState);
  const setKoreaMapData = useSetRecoilState(koreaMapDataState);

  const onSubscribeAuth = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      getDataAndSetRecoil(user.uid);
      setAppUser({
        uid: user.uid as string,
        email: user.email as string,
        displayName: user.displayName as string,
      });
      navigation.replace('Main');
    } else {
      setAppUser(null);
      navigation.replace('Auth');
    }
  };

  const getDataAndSetRecoil = async (uid: string) => {
    await _read(uid).then(snapshot => {
      if (snapshot) setKoreaMapData(snapshot.val()['koreaMapData']);
    });
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

export default Root;
