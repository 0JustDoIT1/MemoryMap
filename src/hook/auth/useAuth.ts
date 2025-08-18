import {WebClientId} from '@env';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  FirebaseAuthTypes,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from '@react-native-firebase/auth';
import {showBottomToast} from 'src/utils/ui/showToast';
import {Platform} from 'react-native';

const useAuth = () => {
  // 로그인 상태
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Google Sign In Configure
  useEffect(() => {
    // webClientId: Firebase 콘솔(GCP)에서 발급된 "Web client"의 Client ID 사용
    GoogleSignin.configure({
      webClientId: WebClientId,
    });
  }, []);

  // Firebase Auth 구독: 로그인/로그아웃/토큰 갱신까지 반영
  useEffect(() => {
    const auth = getAuth();
    const unsub = auth.onAuthStateChanged(user => {
      setUser(user);
      setInitializing(false);
    });
    return unsub;
  }, []);

  // 연타 방지
  const inProgressRef = useRef<boolean>(false);

  // Google Sign in & Firebase Sign In
  const googleSignIn = useCallback(async (): Promise<
    FirebaseAuthTypes.UserCredential | undefined
  > => {
    if (inProgressRef.current) {
      showBottomToast('info', '구글 로그인이 진행 중입니다.');
      return;
    }

    try {
      inProgressRef.current = true;

      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      const res = await GoogleSignin.signIn();

      if (!isSuccessResponse(res)) {
        // sign in was cancelled by user
        return;
      }

      const {idToken} = res.data;

      if (!idToken) {
        showBottomToast('error', '로그인 토큰을 가져올 수 없습니다.');
        return;
      }

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(idToken);
      const userInfo = await signInWithCredential(auth, credential);

      return userInfo;
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            showBottomToast('error', '구글 로그인이 이미 진행 중입니다.');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            showBottomToast(
              'error',
              '구글 플레이 서비스를 사용할 수 없거나 이전 버전입니다.',
            );

            break;
          default:
            // some other error happened
            showBottomToast('error', `구글 로그인 에러 : ${error.code}`);
        }
      } else {
        // an error that's not related to google sign in occurred
        showBottomToast('error', '로그인에 실패했습니다.');
      }
    } finally {
      inProgressRef.current = false;
    }
  }, []);

  // Google Sign Out & Firebase Sign Out
  const googleSignOut = useCallback(async (): Promise<void> => {
    try {
      const auth = getAuth();
      // Google 계정 연결 해제(선택) 후 signOut
      // revokeAccess(): Google 계정과 앱의 연결을 끊음(다음 로그인 시 재동의)
      await GoogleSignin.revokeAccess().catch(() => {});
      await GoogleSignin.signOut();
      await signOut(auth);
    } catch (error) {
      showBottomToast('error', '로그아웃에 실패했습니다.');
    }
  }, []);

  return {user, initializing, googleSignIn, googleSignOut};
};

export default useAuth;
