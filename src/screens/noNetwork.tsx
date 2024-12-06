import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';

const NoNetwork = () => {
  const theme = useAppTheme();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <MaterialCommunityIcons
        name="close-network-outline"
        color={theme.colors.brandMain}
        size={80}
      />
      <Text className="mt-4 text-base text-center">
        네트워크가 연결되지 않았습니다.
      </Text>
      <Text className="text-base text-center">
        Wi-Fi 또는 데이터를 활성화 해주세요.
      </Text>
    </SafeAreaView>
  );
};

export default NoNetwork;
