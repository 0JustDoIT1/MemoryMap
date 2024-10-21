import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {showBottomToast} from 'src/utils/showToast';
import useEmailAndPasswordAuth from './useEmailAndPasswordAuth';
import {UserInfo} from 'src/types/account';

const useKakaoAuth = () => {
  const {onSignUpEmailAndPassword} = useEmailAndPasswordAuth();

  // 카카오 소셜 로그인 처리
  const onSignInKakao = async () => {
    return await KakaoLogin.login()
      .then(async result => {
        const profile = await onGetProfile();
        const userInfo = onProfileToUserInfo(profile);
        await onSignUpEmailAndPassword();
      })
      .catch(error => {
        if (
          error.code === 'E_CANCELLED_OPERATION' ||
          error.message === 'user cancelled.'
        ) {
          return;
        } else {
          return showBottomToast('error', '카카오 로그인에 실패했습니다.');
        }
      });
  };

  const onGetProfile = async () => await KakaoLogin.getProfile();

  const onProfileToUserInfo = (data: KakaoLogin.KakaoProfile) => {
    const random = Math.random().toString(36).substring(2, 5);
    const password = `K${data.id}@!${random}`;
    const displayName = data.nickname;
    const user: UserInfo = {
      email: data.email,
      password: password,
      displayName: displayName,
    };
    return user;
  };

  return {onSignInKakao};
};

export default useKakaoAuth;
