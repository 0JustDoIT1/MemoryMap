import auth from '@react-native-firebase/auth';
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
import {_getDoc, _setDoc} from 'src/utils/firestore';
import {_read, _update} from 'src/utils/realtime';

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
        const name = await onUpdateProfile(false);
        const result: AppUser = {
          uid: res.user.uid!,
          email: res.user.email!,
          displayName: name!,
        };
        return result;
      });
  };

  // Email Sign In
  const onSignInEmailAndPassword = async () => {
    return await auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        const result: AppUser = {
          uid: res.user.uid!,
          email: res.user.email!,
          displayName: res.user.displayName!,
        };

        return result;
      });
  };

  // 로그인 시, uid를 통해 appData를 얻어오고 recoil에 세팅
  const getDataAndSetRecoil = async (user: AppUser) => {
    await _read(user.uid).then(async snapshot => {
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
        await _update(appDataInit).then(async () => {
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

    await _update(appDataInit).then(async () => {
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
  const onUpdateProfile = async (update: boolean) => {
    return await auth()
      .currentUser?.updateProfile({
        displayName: displayName,
      })
      .then(res => displayName);
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
      .then(() => {
        setAppUser(null);
        setKoreaMapData(koreaMapDataInit);
        setStory(null);
        setRegionCount(RegionCountInit);
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
    onSignOut,
  };
};

export default useEmailAndPasswordAuth;
