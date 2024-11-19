import React from 'react';
import {Pressable, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {SettingProps} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';
import {Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {LinkingEmail} from 'src/constants/linkingEmail';

const SettingScreen = ({navigation}: SettingProps) => {
  const {appUser, onSignOut} = useEmailAndPasswordAuth();

  // 로그 아웃
  const onSignOutAuth = async () => {
    await onSignOut()
      .then(() => navigation.replace('Auth'))
      .catch(error => onSignOutAuthError(error));
  };

  const onSignOutAuthError = (error: any) => {
    showBottomToast('error', '로그아웃에 실패했습니다.');
  };

  // 개인/보안 버튼
  const onPressAccount = () => {
    navigation.navigate('AccountInfo');
  };

  const onPressContactUs = async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    const version = DeviceInfo.getVersion();
    const email = appUser?.email!;
    console.log('###', version);
    Linking.openURL(LinkingEmail(deviceName, version, email));
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white">
      <View className="w-full flex-row justify-start items-center p-4">
        <View>
          <MaterialCommunityIcons
            name="account-circle"
            size={50}
            color={customColor.gray}
          />
        </View>
        <View className="ml-3">
          <Text>{appUser?.displayName}</Text>
          <Text className="text-gray-500">{appUser?.email}</Text>
        </View>
      </View>
      <Divider className="w-full bg-black my-1" />
      <Pressable
        className="w-full flex-row justify-between items-center py-3 px-4"
        onPress={onPressAccount}>
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="account-lock-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-3">
            <Text>개인/보안</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <Pressable className="w-full flex-row justify-between items-center py-3 px-4">
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="lock-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-3">
            <Text>잠금화면 설정</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <Pressable className="w-full flex-row justify-between items-center py-3 px-4">
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="advertisements-off"
            size={30}
            color={customColor.black}
          />
          <View className="ml-3">
            <Text>광고 제거</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <Pressable className="w-full flex-row justify-between items-center py-3 px-4">
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="palette-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-3">
            <Text>앱 색상</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <Pressable
        className="w-full flex-row justify-between items-center py-3 px-4"
        onPress={onPressContactUs}>
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="email-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-3">
            <Text>문의하기</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <Pressable className="w-full flex-row justify-between items-center py-3 px-4">
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="message-reply-text-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-3">
            <Text>리뷰 작성하기</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <Pressable className="w-full flex-row justify-between items-center py-3 px-4">
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="information-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-3">
            <Text>앱 버전</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <Pressable
        className="w-full flex-row justify-between items-center py-3 px-4"
        onPress={onSignOutAuth}>
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="location-enter"
            size={30}
            color={customColor.black}
          />
          <View className="ml-3">
            <Text>로그 아웃</Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingScreen;
