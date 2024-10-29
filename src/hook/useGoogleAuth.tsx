import {useEffect} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {WebClientId} from '@env';
import {AppUser} from 'src/types/account';

const useGoogleAuth = () => {
  // Google Sign In Configure
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WebClientId,
    });
  }, []);

  // Google Sign In
  const onSignInGoogle = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {type, data} = await GoogleSignin.signIn();
    if (type === 'success') {
      const idToken = data.idToken;

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);
      const result: AppUser = {
        uid: res.user.uid as string,
        email: res.user.email as string,
        displayName: res.user.displayName as string,
      };
      return result;
    } else if (type === 'cancelled') {
      return;
    }
  };

  // Google Sign Out
  const onSignOutGoogle = async () => {
    return await auth().signOut();
  };

  return {onSignInGoogle, onSignOutGoogle};
};

export default useGoogleAuth;
