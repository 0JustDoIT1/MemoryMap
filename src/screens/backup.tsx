import {Pressable, View} from 'react-native';
import {Portal, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useBackUp from 'src/hook/useBackUp';
import {customColor} from 'src/style/customColor';
import {BackUpProps} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';
import LoadingScreen from './loadingScreen';
import {useState} from 'react';
import useBackButton from 'src/hook/useBackButton';

const BackUpScreen = ({navigation}: BackUpProps) => {
  const {backupAppData, getAppData} = useBackUp();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useBackButton(() => navigation.goBack());

  // BackUp App Data
  const onBackUpData = async () => {
    try {
      setIsLoading(true);
      await backupAppData();
      setIsLoading(false);
      showBottomToast('success', 'Google Drive에 데이터를 백업했습니다.');
    } catch (error: any) {
      setIsLoading(false);
      // showBottomToast('error', '데이터 백업에 실패했습니다.');
      showBottomToast('error', error.code);
      // showBottomToast('error', error.message);
    }
  };

  // Get App Data
  const onGetData = async () => {
    try {
      setIsLoading(true);
      const result = await getAppData();
      setIsLoading(false);
      if (result)
        showBottomToast('success', 'Google Drive에서 데이터를 불러왔습니다.');
      else showBottomToast('info', 'Google Drive에 백업된 데이터가 없습니다.');
    } catch (error) {
      setIsLoading(false);
      showBottomToast('error', '데이터 불러오기에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView
      className="relative flex-1 justify-start items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <View className="w-full h-[92%] flex justify-center items-center p-6">
        <MaterialCommunityIcons
          name="backup-restore"
          size={60}
          color={customColor.black}
        />
        <View className="mt-4">
          <Text className="text-xl">백업 및 복구</Text>
        </View>
        <View className="mt-4">
          <Text className="text-xs text-center">
            "Google Drive" 에 데이터를 백업합니다.
          </Text>
          <Text className="mt-2 text-xs text-center">
            안전한 백업을 위해 백업 중에는 앱을 종료하거나
          </Text>
          <Text className="text-xs text-center">
            다른 앱으로 이동하지 말고 잠시만 기다려 주세요.
          </Text>
        </View>
      </View>
      <View className="w-full h-[8%] flex-row justify-between items-center border-t border-t-gray-300">
        <Pressable
          className="w-1/2 flex-row justify-center items-center"
          onPress={onBackUpData}>
          <MaterialCommunityIcons
            name="cloud-upload-outline"
            size={24}
            color={customColor.black}
          />
          <Text className="ml-2 text-base">백업</Text>
        </Pressable>
        <View className="h-3/4 border-r-[0.5px] border-blur" />
        <Pressable
          className="w-1/2 flex-row justify-center items-center"
          onPress={onGetData}>
          <MaterialCommunityIcons
            name="cloud-download-outline"
            size={24}
            color={customColor.black}
          />
          <Text className="ml-2 text-base">복구</Text>
        </Pressable>
      </View>
      {isLoading && (
        <Portal>
          <LoadingScreen />
        </Portal>
      )}
    </SafeAreaView>
  );
};

export default BackUpScreen;
