import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {appUserState} from 'src/recoil/atom';
import {
  getSecureValue,
  removeSecureValue,
  setSecureValue,
} from 'src/utils/keyChain';
import {deleteRealtime, updateRealtime} from 'src/firebase/realtime';
import {deleteAllStorage} from 'src/firebase/storage';
import {KeyChainAccount, KeyChainPinCode, WebClientId} from '@env';
import {deleteDocAll} from 'src/firebase/firestore';
import {FirebaseUser, User} from 'src/types/account';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {getDBConnection} from 'src/database/sqlite';
import {saveAuthToDB} from 'src/database/create';
import {
  deleteAllStoryToDB,
  deleteAuthToDB,
  deleteKoreaMapDataToDB,
} from 'src/database/delete';

const useAuth = () => {
  const [appUser, setAppUser] = useRecoilState(appUserState);
  const uid = appUser?.uid!;
  const resetAppUser = useResetRecoilState(appUserState);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  // Google Sign In Configure
  useEffect(() => {
    const googleSigninConfigure = GoogleSignin.configure({
      webClientId: WebClientId,
    });
    return googleSigninConfigure;
  }, []);

  // Google Sign In
  const onSignInGoogle = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {type, data} = await GoogleSignin.signIn();
    if (type === 'success') {
      const idToken = data.idToken;

      // SignIn Google Credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await auth().signInWithCredential(googleCredential);
      // Save GoogleSignIn Token to Keychain
      await setSecureValue(KeyChainAccount, result.user.uid!, idToken!);

      const appUser: FirebaseUser = {
        uid: result.user.uid!,
        email: result.user.email!,
        displayName: result.user.displayName!,
        createdAt: result.user.metadata.creationTime!,
      };
      // Google SignIn new or existence check
      const isNew = result.additionalUserInfo?.isNewUser;

      return {appUser, isNew};
      // User Cancel
    } else if (type === 'cancelled') {
      return;
    }
  };

  // Email Sign Up
  const onSignUpEmailAndPassword = async () => {
    const result: FirebaseAuthTypes.UserCredential =
      await auth().createUserWithEmailAndPassword(email, password);
    await auth().currentUser?.updateProfile({
      displayName: displayName,
    });

    // Save SignUp Data to KeyChain
    await setSecureValue(KeyChainAccount, result.user.uid, password);

    const updateFirebaseUser: FirebaseUser = {
      uid: result.user.uid!,
      email: result.user.email!,
      displayName: displayName,
      createdAt: result.user.metadata.creationTime!,
    };

    return updateFirebaseUser;
  };

  // Email Sign In
  const onSignInEmailAndPassword = async () => {
    const result: FirebaseAuthTypes.UserCredential =
      await auth().signInWithEmailAndPassword(email, password);

    // Save SignIn Data to KeyChain
    await setSecureValue(KeyChainAccount, result.user.uid, password);

    const updateFirebaseUser: FirebaseUser = {
      uid: result.user.uid!,
      email: result.user.email!,
      displayName: result.user.displayName!,
      createdAt: result.user.metadata.creationTime!,
    };

    return updateFirebaseUser;
  };

  // Profile Update (displayName)
  const onUpdateProfile = async (user: User) => {
    // Setting Data
    const updateAppUser = {...user, displayName: displayName};

    // Save SQLite
    const db = await getDBConnection();
    await saveAuthToDB(db, updateAppUser);
    // Save Firebase
    await auth().currentUser?.updateProfile({
      displayName: displayName,
    });
    await updateRealtime(uid, updateAppUser, 'auth');
    // Save Recoil
    setAppUser(updateAppUser);
  };

  // Send Password Reset Email
  const onSendPasswordResetEmail = async () =>
    await auth().sendPasswordResetEmail(email);

  // Sign Out
  const onSignOut = async () => {
    await GoogleSignin.signOut();
    await auth().signOut();
    await removeSecureValue(KeyChainPinCode);
    await removeSecureValue(KeyChainAccount);

    setAppUser(null);
  };

  // Withdrawal
  const onWithdrawal = async () => {
    // Revalidate signin information
    const currentUser = auth().currentUser!;
    const providerId = currentUser.providerData[0].providerId;

    let token: string;
    let authCredential: FirebaseAuthTypes.AuthCredential;

    await getSecureValue(KeyChainAccount).then(
      value => (token = value?.password!),
    );

    if (providerId === 'google.com') {
      authCredential = auth.GoogleAuthProvider.credential(token!);
    } else {
      authCredential = auth.EmailAuthProvider.credential(
        currentUser.email!,
        token!,
      );
    }
    await currentUser.reauthenticateWithCredential(authCredential);

    // Delete SQLite
    const db = await getDBConnection();
    await deleteAuthToDB(db, uid);
    await deleteKoreaMapDataToDB(db, uid);
    await deleteAllStoryToDB(db, uid);

    // Delete Firebase
    await deleteRealtime(uid, 'auth');
    await deleteRealtime(uid, 'map');
    await deleteDocAll(uid);
    await deleteAllStorage(uid);

    await auth().currentUser?.delete();
    await GoogleSignin.signOut();

    // Delete Keychain
    await removeSecureValue(KeyChainPinCode);
    await removeSecureValue(KeyChainAccount);

    // Reset AppUser
    setAppUser(null);
  };

  return {
    appUser,
    setAppUser,
    resetAppUser,
    email,
    setEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    onSignInGoogle,
    onSignUpEmailAndPassword,
    onSignInEmailAndPassword,
    onUpdateProfile,
    onSendPasswordResetEmail,
    onSignOut,
    onWithdrawal,
  };
};

export default useAuth;
