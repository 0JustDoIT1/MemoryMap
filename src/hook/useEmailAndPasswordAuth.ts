import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {regionCountInit} from 'src/constants/regionCount';
import {
  appUserState,
  koreaMapDataState,
  regionCountState,
  storyState,
} from 'src/recoil/atom';
import {AppUser} from 'src/types/account';
import {AppStoryData} from 'src/types/story';
import {_deleteDoc, _getDoc, _setDoc} from 'src/utils/firestore';
import {
  getSecureValue,
  removeSecureValue,
  setSecureValue,
} from 'src/utils/keyChain';
import {
  _deleteRealtime,
  _readRealtime,
  _updateRealtime,
} from 'src/utils/realtime';
import {_deleteAllStorage} from 'src/utils/storage';
import {KeyChainAccount, KeyChainPinCode} from '@env';
import {AppKoreaMapData} from 'src/types/koreaMap';
import {AppRegionCount} from 'src/types/regionCount';

const useEmailAndPasswordAuth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const [appUser, setAppUser] = useRecoilState(appUserState);
  const setKoreaMapData = useSetRecoilState(koreaMapDataState);
  const setStory = useSetRecoilState(storyState);
  const setRegionCount = useSetRecoilState(regionCountState);

  // Recoil 초기화
  const setInitRecoil = () => {
    setAppUser(null);
    setKoreaMapData(koreaMapDataInit);
    setStory(null);
    setRegionCount(regionCountInit);
  };

  // Email Sign Up
  const onSignUpEmailAndPassword = async () => {
    const result: FirebaseAuthTypes.UserCredential =
      await auth().createUserWithEmailAndPassword(email, password);
    const name = await onUpdateProfile();

    await setSecureValue(KeyChainAccount, result.user.uid, password);

    const appUser: AppUser = {
      uid: result.user.uid!,
      email: result.user.email!,
      displayName: name!,
      createdAt: result.user.metadata.creationTime!,
    };

    return appUser;
  };

  // Email Sign In
  const onSignInEmailAndPassword = async () => {
    const result: FirebaseAuthTypes.UserCredential =
      await auth().signInWithEmailAndPassword(email, password);

    await setSecureValue(KeyChainAccount, result.user.uid, password);

    const appUser: AppUser = {
      uid: result.user.uid!,
      email: result.user.email!,
      displayName: result.user.displayName!,
      createdAt: result.user.metadata.creationTime!,
    };

    return appUser;
  };

  // 로그인 시, uid를 통해 appData를 얻어오고 recoil에 세팅
  const getDataAndSetRecoil = async (user: AppUser) => {
    console.log('여기는?');

    const koreaMapData = await _readRealtime(user.uid, 'map').then(
      snapshot => snapshot.val()['koreaMapData'],
    );
    const regionCount = await _readRealtime(user.uid, 'count').then(
      snapshot => snapshot.val()['regionCount'],
    );

    const story = await _getDoc(user.uid).then(res => res?.story);

    if (koreaMapData && regionCount && story) {
      setAppUser(user);
      setKoreaMapData(koreaMapData);
      setStory(story);
      setRegionCount(regionCount);
    } else throw new Error('데이터 불러오기 에러');
  };

  // 회원가입 시 초기 데이터 저장 -> Firebase & Recoil
  const setDataAndSetRecoil = async (user: AppUser) => {
    const appKoreaMapData: AppKoreaMapData = {
      uid: user.uid,
      koreaMapData: koreaMapDataInit,
    };
    const appRegionCountData: AppRegionCount = {
      uid: user.uid,
      regionCount: regionCountInit,
    };
    const appStoryInit: AppStoryData = {
      uid: user.uid,
      story: {},
    };

    await _updateRealtime(appKoreaMapData, 'map');
    await _updateRealtime(appRegionCountData, 'count');
    await _setDoc(appStoryInit);

    setAppUser(user);
    setKoreaMapData(koreaMapDataInit);
    setStory(null);
    setRegionCount(regionCountInit);
  };

  // Profile Update (displayName)
  const onUpdateProfile = async () => {
    await auth()
      .currentUser?.updateProfile({
        displayName: displayName,
      })
      .then(res => setAppUser({...appUser!, displayName: displayName}));

    return displayName;
  };

  // Send Password Reset Email
  const onSendPasswordResetEmail = async () => {
    return await auth()
      .sendPasswordResetEmail(email)
      .then(res => res);
  };

  // Sign Out
  const onSignOut = async () => {
    await auth()
      .signOut()
      .then(async () => {
        await removeSecureValue(KeyChainPinCode);
        await removeSecureValue(KeyChainAccount);

        setInitRecoil();
      });
  };

  // Withdrawal
  const onWithdrawal = async () => {
    const uid = appUser?.uid!;
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

    await _deleteRealtime(uid, 'map');
    await _deleteRealtime(uid, 'count');
    await _deleteDoc(uid);
    await _deleteAllStorage(uid);

    await auth().currentUser?.delete();
    await removeSecureValue(KeyChainPinCode);
    await removeSecureValue(KeyChainAccount);

    setInitRecoil();
  };

  return {
    appUser,
    email,
    setEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    onSignUpEmailAndPassword,
    onSignInEmailAndPassword,
    onUpdateProfile,
    getDataAndSetRecoil,
    setDataAndSetRecoil,
    onSendPasswordResetEmail,
    setInitRecoil,
    onSignOut,
    onWithdrawal,
  };
};

export default useEmailAndPasswordAuth;
