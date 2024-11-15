import auth from '@react-native-firebase/auth';
import {useCallback, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {StoryCountInit} from 'src/constants/storyData';
import {
  appUserState,
  koreaMapDataState,
  storyCountState,
  storyState,
} from 'src/recoil/atom';
import {AppData, AppUser} from 'src/types/account';
import {AppStory} from 'src/types/story';
import {_getDoc, _setDoc} from 'src/utils/firestore';
import {_read, _update} from 'src/utils/realtime';
import {showBottomToast} from 'src/utils/showToast';

const useEmailAndPasswordAuth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const setAppUser = useSetRecoilState(appUserState);
  const setKoreaMapData = useSetRecoilState(koreaMapDataState);
  const setStory = useSetRecoilState(storyState);
  const setStoryCount = useSetRecoilState(storyCountState);

  // Email Sign Up
  const onSignUpEmailAndPassword = useCallback(async () => {
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
  }, [email, password]);

  // Email Sign In
  const onSignInEmailAndPassword = useCallback(async () => {
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
  }, [email, password]);

  // 로그인 시, uid를 통해 appData를 얻어오고 recoil에 세팅
  const getDataAndSetRecoil = useCallback(async (user: AppUser) => {
    await _read(user.uid).then(async snapshot => {
      if (snapshot.val()) {
        await _getDoc(user.uid).then(res => {
          setKoreaMapData(snapshot.val()['koreaMapData']);
          setAppUser(user);
          setStory(res?.story);
          setStoryCount(snapshot.val()['count']);
        });
      } else {
        // 구글 로그인으로 첫 로그인인 경우
        const appDataInit: AppData = {
          email: user.email,
          uid: user.uid,
          koreaMapData: koreaMapDataInit,
          count: StoryCountInit,
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
            setStoryCount(StoryCountInit);
          });
        });
      }
    });
  }, []);

  // 회원가입 시 초기 데이터를 firebase/recoil에 세팅
  const setDataAndSetRecoil = useCallback(async (user: AppUser) => {
    const appDataInit: AppData = {
      email: user.email,
      uid: user.uid,
      koreaMapData: koreaMapDataInit,
      count: StoryCountInit,
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
        setStoryCount(StoryCountInit);
      });
    });
  }, []);

  // Profile Update (displayName)
  const onUpdateProfile = useCallback(
    async (update: boolean) => {
      return await auth()
        .currentUser?.updateProfile({
          displayName: displayName,
        })
        .then(res => {
          if (update)
            return showBottomToast('success', `프로필을 변경했습니다.`);
          else return displayName;
        })
        .catch(error =>
          showBottomToast('error', '이메일 또는 비밀번호가 틀렸습니다.'),
        );
    },
    [displayName],
  );

  // Send Password Reset Email
  const onSendPasswordResetEmail = useCallback(async () => {
    return await auth()
      .sendPasswordResetEmail(email)
      .then(res => res);
  }, [email]);

  // Sign Out
  const onSignOut = useCallback(async () => {
    setAppUser(null);
    setKoreaMapData(koreaMapDataInit);
    setStory(null);
    setStoryCount(StoryCountInit);

    return await auth().signOut();
  }, []);

  return {
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
