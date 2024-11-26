import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {KeyChainAccount} from '@env';
import {AppUser} from 'src/types/account';
import {setSecureValue} from 'src/utils/keyChain';

// Google Sign In
export const onSignInGoogle = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {type, data} = await GoogleSignin.signIn();
  if (type === 'success') {
    const idToken = data.idToken;

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const result = await auth().signInWithCredential(googleCredential);
    await setSecureValue(KeyChainAccount, result.user.uid!, idToken!);

    const appUser: AppUser = {
      uid: result.user.uid!,
      email: result.user.email!,
      displayName: result.user.displayName!,
      createdAt: result.user.metadata.creationTime!,
    };
    const isNew = result.additionalUserInfo?.isNewUser;

    return {appUser, isNew};
  } else if (type === 'cancelled') {
    return;
  }
};
