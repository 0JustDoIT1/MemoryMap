import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {RegionCountInit} from 'src/constants/regionCount';
import {
  appUserState,
  koreaMapDataState,
  regionCountState,
  storyState,
} from 'src/recoil/atom';
import {AppData, AppUser} from 'src/types/account';
import {AppStory} from 'src/types/story';
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

const useEmailAndPasswordAuth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const [appUser, setAppUser] = useRecoilState(appUserState);
  const setKoreaMapData = useSetRecoilState(koreaMapDataState);
  const setStory = useSetRecoilState(storyState);
  const setRegionCount = useSetRecoilState(regionCountState);

  // Email Sign Up
  const onSignUpEmailAndPassword = async () => {
    return await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        const name = await onUpdateProfile();

        return await setSecureValue(
          KeyChainAccount,
          res.user.uid,
          password,
        ).then(() => {
          const result: AppUser = {
            uid: res.user.uid!,
            email: res.user.email!,
            displayName: name!,
            createdAt: res.user.metadata.creationTime!,
          };
          return result;
        });
      });
  };

  // Email Sign In
  const onSignInEmailAndPassword = async () => {
    return await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        return await setSecureValue(
          KeyChainAccount,
          res.user.uid,
          password,
        ).then(() => {
          const result: AppUser = {
            uid: res.user.uid!,
            email: res.user.email!,
            displayName: res.user.displayName!,
            createdAt: res.user.metadata.creationTime!,
          };

          return result;
        });
      });
  };

  // 로그인 시, uid를 통해 appData를 얻어오고 recoil에 세팅
  const getDataAndSetRecoil = async (user: AppUser) => {
    await _readRealtime(user.uid).then(async snapshot => {
      if (snapshot.val()) {
        await _getDoc(user.uid).then(res => {
          setKoreaMapData(snapshot.val()['koreaMapData']);
          setAppUser(user);
          setStory(res?.story);
          setRegionCount(snapshot.val()['regionCount']);
        });
      } else {
        // 구글 로그인으로 첫 로그인인 경우
        const appDataInit: AppData = {
          email: user.email,
          uid: user.uid,
          koreaMapData: koreaMapDataInit,
          regionCount: RegionCountInit,
        };
        await _updateRealtime(appDataInit).then(async () => {
          const appStoryInit: AppStory = {
            uid: user.uid,
            story: {},
          };
          await _setDoc(appStoryInit).then(() => {
            setKoreaMapData(koreaMapDataInit);
            setAppUser(user);
            setStory(null);
            setRegionCount(RegionCountInit);
          });
        });
      }
    });
  };

  // 회원가입 시 초기 데이터를 firebase/recoil에 세팅
  const setDataAndSetRecoil = async (user: AppUser) => {
    const appDataInit: AppData = {
      email: user.email,
      uid: user.uid,
      koreaMapData: koreaMapDataInit,
      regionCount: RegionCountInit,
    };

    await _updateRealtime(appDataInit).then(async () => {
      const appStoryInit: AppStory = {
        uid: user.uid,
        story: {},
      };
      await _setDoc(appStoryInit).then(() => {
        setKoreaMapData(koreaMapDataInit);
        setAppUser(user);
        setStory(null);
        setRegionCount(RegionCountInit);
      });
    });
  };

  // Profile Update (displayName)
  const onUpdateProfile = async () => {
    return await auth()
      .currentUser?.updateProfile({
        displayName: displayName,
      })
      .then(res => setAppUser({...appUser!, displayName: displayName}));
  };

  // Send Password Reset Email
  const onSendPasswordResetEmail = async () => {
    return await auth()
      .sendPasswordResetEmail(email)
      .then(res => res);
  };

  // Recoil 초기화
  const setInitRecoil = () => {
    setAppUser(null);
    setKoreaMapData(koreaMapDataInit);
    setStory(null);
    setRegionCount(RegionCountInit);
  };

  // Sign Out
  const onSignOut = async () => {
    await auth()
      .signOut()
      .then(async () => {
        await removeSecureValue(KeyChainPinCode);
        await removeSecureValue(KeyChainAccount).then(() => setInitRecoil());
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

    await _deleteRealtime(uid);
    await _deleteDoc(uid);
    await _deleteAllStorage(uid);

    await auth()
      .currentUser?.delete()
      .then(async () => {
        await removeSecureValue(KeyChainPinCode);
        await removeSecureValue(KeyChainAccount).then(() => setInitRecoil());
      });
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
