import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandOutlinedButton} from 'src/components/button';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {
  dateToFormatString,
  //   dateToCurrentOffSetFormat,
} from 'src/utils/dateFormat';

const AccountInfo = () => {
  const {appUser} = useEmailAndPasswordAuth();

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white p-6">
      <View className="w-full p-4 flex-row justify-between items-center">
        <Text>닉네임</Text>
        <Text>{appUser?.displayName}</Text>
      </View>
      <View className="w-full p-4 flex-row justify-between items-center">
        <Text>이메일</Text>
        <Text>{appUser?.email}</Text>
      </View>
      <View className="w-full p-4 flex-row justify-between items-center">
        <Text>가입일</Text>
        {/* <Text>
          {dateToCurrentOffSetFormat(new Date(), 'YYYY년 MM월 DD일 HH:mm')}
        </Text> */}
      </View>
      <View className="w-full p-4 mt-auto">
        <BrandOutlinedButton classes="w-full" text="회원 탈퇴" />
      </View>
    </SafeAreaView>
  );
};

export default AccountInfo;
