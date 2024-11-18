import React from 'react';
import {Pressable, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandContainedButton} from 'src/components/button';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {SettingProps} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';
import {DataTable} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';

const SettingScreen = ({navigation}: SettingProps) => {
  const theme = useAppTheme();
  const {appUser, onSignOut} = useEmailAndPasswordAuth();

  const onSignOutAuth = async () => {
    await onSignOut()
      .then(() => navigation.replace('Auth'))
      .catch(error => onSignOutAuthError(error));
  };

  const onSignOutAuthError = (error: any) => {
    showBottomToast('error', '로그아웃에 실패했습니다.');
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white">
      <View className="w-full flex-row justify-start items-center p-4">
        <View>
          <MaterialCommunityIcons
            name="account-circle"
            size={50}
            color={theme.colors.gray}
          />
        </View>
        <View className="ml-3">
          <Text>{appUser?.displayName}</Text>
          <Text className="text-gray-500">{appUser?.email}</Text>
        </View>
      </View>
      <Divider className="w-full bg-black my-1" />
      <Pressable className="w-full flex-row justify-between items-center py-3 px-4">
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="account-lock-outline"
            size={30}
            color={theme.colors.black}
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
            color={theme.colors.black}
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
            color={theme.colors.black}
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
            color={theme.colors.black}
          />
          <View className="ml-3">
            <Text>앱 색상</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <Pressable className="w-full flex-row justify-between items-center py-3 px-4">
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="email-outline"
            size={30}
            color={theme.colors.black}
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
            color={theme.colors.black}
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
            color={theme.colors.black}
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
            color={theme.colors.black}
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
