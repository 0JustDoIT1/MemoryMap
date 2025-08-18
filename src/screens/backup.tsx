import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useBackUp from 'src/hook/setting/useBackUp';
import {TBackUp} from 'src/types/stack';
import LoadingOverlay from '../components/feedback/loadingOverlay';
import useBackButton from 'src/hook/common/useBackButton';
import useRecover from 'src/hook/setting/useRecover';
import CustomAlert from 'src/components/alert/alert';
import useAuth from 'src/hook/auth/useAuth';
import {useAppTheme} from 'src/style/paperTheme';

const BackUpScreen = ({navigation}: TBackUp) => {
  const theme = useAppTheme();
  const {user, initializing, googleSignIn, googleSignOut} = useAuth();
  const {
    isDisabled: isDisabledB,
    onLoading: onLoadingB,
    onBackUp,
  } = useBackUp(user);
  const {
    date,
    showDialog,
    hideDialog,
    visibleDialog,
    isDisabled: isDisabledR,
    onLoading: onLoadingR,
    onRecover,
  } = useRecover(user);

  useBackButton(() => navigation.goBack());

  return (
    <SafeAreaView
      className="relative flex-1 justify-start items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <View className="w-full h-[84%] flex justify-start items-center p-6">
        {user && !!date && (
          <View className="w-full px-6">
            <View className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="cloud-check-outline"
                  size={18}
                  color={theme.colors.success}
                />
                <Text className="ml-2 text-xs text-gray-500">최근 백업</Text>
              </View>

              <View className="mt-2">
                <Text className="text-base font-medium text-black text-center">
                  {user.displayName ?? user.email ?? '로그인 계정'}
                </Text>
                <Text className="mt-2 text-xs text-gray-600 text-center">
                  최근 백업 데이터는 <Text className="font-medium">{date}</Text>{' '}
                  입니다.
                </Text>
              </View>
            </View>
          </View>
        )}
        <View className="w-full flex-1 justify-center items-center">
          <MaterialCommunityIcons
            name="backup-restore"
            size={60}
            color={theme.colors.black}
          />
          <View className="mt-4">
            <Text className="text-xl">백업 및 복구</Text>
          </View>
          <View className="mt-4">
            <Text className="text-xs text-center">
              "Firebase" 에 데이터를 백업합니다.
            </Text>
            <Text className="mt-2 text-xs text-center">
              안전한 백업을 위해 백업 중에는 앱을 종료하거나
            </Text>
            <Text className="text-xs text-center">
              다른 앱으로 이동하지 말고 잠시만 기다려 주세요.
            </Text>
          </View>
        </View>
      </View>

      <View className="w-full h-[8%] flex-row justify-between items-center border-t border-t-gray-300">
        <Pressable
          className="w-1/2 flex-row justify-center items-center"
          disabled={isDisabledB || isDisabledR}
          onPress={onBackUp}>
          <MaterialCommunityIcons
            name="login"
            size={24}
            color={theme.colors.black}
          />
          <Text className="ml-2 text-base">백업</Text>
        </Pressable>
        <View className="h-3/4 border-r-[0.5px] border-blur" />
        <Pressable
          className="w-1/2 flex-row justify-center items-center"
          disabled={isDisabledB || isDisabledR}
          onPress={showDialog}>
          <MaterialCommunityIcons
            name="cloud-download-outline"
            size={24}
            color={theme.colors.black}
          />
          <Text className="ml-2 text-base">복구</Text>
        </Pressable>
      </View>
      <View className="w-full h-[8%] flex-row justify-between items-center border-t border-t-gray-300">
        <Pressable
          className="w-full flex-row justify-center items-center"
          disabled={isDisabledB || isDisabledR}
          onPress={() => (user ? googleSignOut() : googleSignIn())}>
          <MaterialIcons
            name={user ? 'logout' : 'login'}
            size={24}
            color={theme.colors.black}
          />
          <Text className="ml-2 text-base">{user ? '로그아웃' : '로그인'}</Text>
        </Pressable>
      </View>

      <CustomAlert
        visible={visibleDialog}
        title={`백업 데이터로 로컬 데이터를 덮어씁니다.\n계속할까요?`}
        buttonText="복구"
        isDisabled={isDisabledB || isDisabledR}
        buttonOnPress={onRecover}
        hideAlert={hideDialog}
      />

      <LoadingOverlay visible={initializing || onLoadingB || onLoadingR} />
    </SafeAreaView>
  );
};

export default BackUpScreen;
