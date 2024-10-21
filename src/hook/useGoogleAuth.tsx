import {useEffect} from 'react';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {WebClientId} from '@env';
import {showBottomToast} from 'src/utils/showToast';

const useGoogleAuth = () => {
  // Google Sign In Configure
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WebClientId,
    });
  }, []);

  // Google Sign In
  const onSignInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {type, data} = await GoogleSignin.signIn();
      if (type === 'success') {
        const userInfo = data.user;
        const idToken = data.idToken;

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);

        return showBottomToast('success', `반갑습니다. ${data.user.name}님!`);
      } else if (type === 'cancelled') {
        return;
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation sign in is in progress already
        return showBottomToast(
          'error',
          '이미 로그인 진행 중입니다. 잠시만 기다려주세요.',
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available
        return showBottomToast(
          'error',
          '구글 플레이 서비스를 이용할 수 없거나 업데이트가 필요합니다.',
        );
      } else {
        // some other error
        return showBottomToast('error', '구글 로그인에 실패했습니다.');
      }
    }
  };

  // Google Sign Out
  const onSignOutGoogle = async () => {
    return await auth().signOut();
  };

  return {onSignInGoogle, onSignOutGoogle};
};

export default useGoogleAuth;
