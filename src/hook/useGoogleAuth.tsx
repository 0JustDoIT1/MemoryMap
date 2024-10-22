import {useEffect} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {WebClientId} from '@env';

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
      await auth().signInWithCredential(googleCredential);
      return data;
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
