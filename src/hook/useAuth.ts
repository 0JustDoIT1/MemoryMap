import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useState} from 'react';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {appUserState} from 'src/recoil/atom';
import {
  getSecureValue,
  removeSecureValue,
  setSecureValue,
} from 'src/utils/keyChain';
import {deleteRealtime, updateRealtime} from 'src/firebase/realtime';
import {deleteAllStorage} from 'src/firebase/storage';
import {KeyChainAccount, KeyChainPinCode} from '@env';
import {deleteDocAll} from 'src/firebase/firestore';
import {FirebaseUser} from 'src/types/account';
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

  // Email Sign Up
  const onSignUpEmailAndPassword = async () => {
    const result: FirebaseAuthTypes.UserCredential =
      await auth().createUserWithEmailAndPassword(email, password);
    // Profile Update
    await onUpdateProfile();
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
  const onUpdateProfile = async () => {
    // Setting Data
    const updateAppUser = {...appUser!, displayName: displayName};

    // Save SQLite
    const db = await getDBConnection();
    await saveAuthToDB(db, updateAppUser);
    // Save Firebase
    await auth().currentUser?.updateProfile({
      displayName: displayName,
    });
    await updateRealtime(uid, updateAppUser, 'auth');
    // Save Recoil
    setAppUser({...appUser!, displayName: displayName});
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
    onSignUpEmailAndPassword,
    onSignInEmailAndPassword,
    onUpdateProfile,
    onSendPasswordResetEmail,
    onSignOut,
    onWithdrawal,
  };
};

export default useAuth;
