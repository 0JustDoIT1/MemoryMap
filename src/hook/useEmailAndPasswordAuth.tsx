import auth from '@react-native-firebase/auth';
import {useCallback, useState} from 'react';
import {AppUser} from 'src/types/account';
import {showBottomToast} from 'src/utils/showToast';

const useEmailAndPasswordAuth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  // Email Sign Up
  const onSignUpEmailAndPassword = useCallback(async () => {
    return await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        const name = await onUpdateProfile(false);
        const result: AppUser = {
          uid: res.user.uid as string,
          email: res.user.email as string,
          displayName: name as string,
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
          uid: res.user.uid as string,
          email: res.user.email as string,
          displayName: res.user.displayName as string,
        };

        return result;
      });
  }, [email, password]);

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
    onSendPasswordResetEmail,
  };
};

export default useEmailAndPasswordAuth;
