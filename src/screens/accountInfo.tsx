import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandOutlinedButton} from 'src/components/button';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {dateToSeoulTime} from 'src/utils/dateFormat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';

const AccountInfo = () => {
  const theme = useAppTheme();
  const {appUser} = useEmailAndPasswordAuth();

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white p-6">
      <View className="w-full p-4 flex-row justify-between items-center">
        <Text>닉네임</Text>
        <View className="flex-row items-center">
          <Text className="mx-4">{appUser?.displayName}</Text>
          <Pressable>
            <MaterialCommunityIcons
              name="pencil-box-outline"
              size={24}
              color={theme.colors.gray}
            />
          </Pressable>
        </View>
      </View>
      <View className="w-full p-4 flex-row justify-between items-center">
        <Text>이메일</Text>
        <Text>{appUser?.email}</Text>
      </View>
      <View className="w-full p-4 flex-row justify-between items-center">
        <Text>가입일</Text>
        <Text>
          {dateToSeoulTime(appUser?.createdAt, 'YYYY년 MM월 DD일 (ddd)')}
        </Text>
      </View>
      <View className="w-full p-4 mt-auto">
        <BrandOutlinedButton classes="w-full" text="회원 탈퇴" />
      </View>
    </SafeAreaView>
  );
};

export default AccountInfo;
