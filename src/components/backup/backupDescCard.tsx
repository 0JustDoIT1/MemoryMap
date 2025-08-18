import {memo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';

const BackupDescCard = () => {
  const theme = useAppTheme();
  return (
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
  );
};

export default memo(BackupDescCard);
