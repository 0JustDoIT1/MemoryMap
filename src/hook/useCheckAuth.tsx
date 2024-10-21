import {useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import {RootStackParamList} from 'src/types/stack';
import {useSetRecoilState} from 'recoil';
import {appUserState} from 'src/recoil/atom';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const useCheckAuth = () => {
  const setAppUser = useSetRecoilState(appUserState);

  const onAuthStateChanged = useCallback(
    (
      navigation: NativeStackNavigationProp<
        RootStackParamList,
        'Root',
        undefined
      >,
    ) => {
      auth().onAuthStateChanged(user => {
        // user 판명을 듣고
        if (user) {
          // 있으면
          setAppUser({
            email: user.email as string,
            displayName: user.displayName as string,
          });
          // return navigation.replace('Main');
          return navigation.replace('Auth');
        } else {
          setAppUser(null);
          return navigation.replace('Auth');
        }
      });
    },
    [],
  );

  return {onAuthStateChanged};
};

export default useCheckAuth;
