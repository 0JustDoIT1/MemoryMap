import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useBackUp from 'src/hook/setting/useBackUp';
import {TBackUp} from 'src/types/stack';
import LoadingOverlay from '../components/feedback/loadingOverlay';
import useBackButton from 'src/hook/common/useBackButton';
import useRecover from 'src/hook/setting/useRecover';
import CustomAlert from 'src/components/alert/alert';
import useAuth from 'src/hook/auth/useAuth';
import BackupRecentCard from 'src/components/backup/backupRecentCard';
import BackupDescCard from 'src/components/backup/backupDescCard';
import BackupAuthFooter from 'src/components/backup/backupAuthFooter';
import BackupFooter from 'src/components/backup/backupFooter';

const BackUpScreen = ({navigation}: TBackUp) => {
  const {user, initializing, googleSignIn, googleSignOut} = useAuth();
  const {
    isDisabled: isDisabledB,
    onLoading: onLoadingB,
    onBackUp,
  } = useBackUp(user);
  const {
    date,
    confirmRecover,
    hideDialog,
    visibleDialog,
    isDisabled: isDisabledR,
    onLoading: onLoadingR,
    onRecover,
  } = useRecover(user);

  useBackButton(() => navigation.goBack());

  const anyDisabled = initializing || isDisabledB || isDisabledR;

  return (
    <SafeAreaView
      className="relative flex-1 justify-start items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <View className="w-full h-[84%] flex justify-start items-center p-6">
        {user && !!date && (
          <BackupRecentCard
            userLabel={user.displayName ?? user.email ?? '로그인 계정'}
            date={date}
          />
        )}
        <BackupDescCard />
      </View>

      <BackupFooter
        disabled={anyDisabled}
        onBackup={onBackUp}
        onRecover={confirmRecover}
      />
      <BackupAuthFooter
        disabled={anyDisabled}
        isSignedIn={!!user}
        onLogin={googleSignIn}
        onLogout={googleSignOut}
      />

      <CustomAlert
        visible={visibleDialog}
        title={`백업 데이터로 로컬 데이터를 덮어씁니다.\n계속할까요?`}
        buttonText="복구"
        isDisabled={anyDisabled}
        buttonOnPress={onRecover}
        hideAlert={hideDialog}
      />

      <LoadingOverlay visible={initializing || onLoadingB || onLoadingR} />
    </SafeAreaView>
  );
};

export default BackUpScreen;
