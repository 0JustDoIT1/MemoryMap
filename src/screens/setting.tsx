import React from 'react';
import {Pressable, View} from 'react-native';
import {Divider, Switch, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useAuth from 'src/hook/useAuth';
import {SettingProps} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';
import {Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {LinkingEmail, TermListUrl} from 'src/constants/linking';
import {useRecoilValue} from 'recoil';
import {appPinCodeState} from 'src/recoil/atom';
import {onOpenStoreLink} from 'src/utils/openStoreLink';
import useButton from 'src/hook/useButton';

const SettingScreen = ({navigation, route}: SettingProps) => {
  const appVersion = DeviceInfo.getVersion();

  const appPinCode = useRecoilValue(appPinCodeState);

  const {appUser, onSignOut} = useAuth();
  const {isDisabled, disabledButton, abledButton} = useButton();

  // Sign out
  const onSignOutAuth = async () => {
    disabledButton();
    try {
      await onSignOut();
      abledButton();
      navigation.replace('Auth');
    } catch (error) {
      onSignOutAuthError(error);
    }
  };

  const onSignOutAuthError = (error: any) => {
    abledButton();
    showBottomToast('error', '로그아웃에 실패했습니다.');
  };

  // Navigate account Info
  const onPressAccount = () => {
    navigation.navigate('AccountInfo');
  };

  // Email Contact us
  const onPressContactUs = async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    const email = appUser?.email!;
    await Linking.openURL(LinkingEmail(deviceName, appVersion, email));
  };

  // Pincode(lock screen) on/off
  const onPressPinCodeSetting = () => {
    if (appPinCode) navigation.navigate('PinCodeEnter', {route: 'Setting'});
    else navigation.navigate('PinCodeSetting');
  };

  // Pincode(lock screen) reset
  const onPressPinCodeReset = () => {
    navigation.navigate('PinCodeEnter', {route: 'PinCodeSetting'});
  };

  // Term link
  const onPressTerm = async () => {
    await Linking.openURL(TermListUrl);
  };

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <View className="w-full flex-row justify-start items-center pb-3 px-6">
        <View className="bg-gray-500 rounded-xl">
          <MaterialCommunityIcons
            name="account"
            size={50}
            color={customColor.white}
          />
        </View>
        <View className="ml-4">
          <Text className="text-lg">{appUser?.displayName}</Text>
          <Text className="text-xs text-gray-500">{appUser?.email}</Text>
        </View>
      </View>
      <Divider className="w-full bg-black my-1" />
      <Pressable
        className="w-full flex-row justify-between items-center py-3 px-6"
        onPress={onPressAccount}
        disabled={isDisabled}>
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="account-lock-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-4">
            <Text>개인/보안</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <View className="w-full flex-row justify-between items-center py-3 px-6">
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="lock-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-4">
            <Text>잠금화면 설정</Text>
          </View>
        </View>
        <View className="w-1/2 flex-row justify-end items-center">
          <Pressable
            className="mx-2"
            onPress={onPressPinCodeReset}
            disabled={isDisabled}>
            {appPinCode && (
              <MaterialCommunityIcons
                name="lock-reset"
                size={30}
                color={customColor.gray}
              />
            )}
          </Pressable>
          <Pressable onPress={onPressPinCodeSetting} disabled={isDisabled}>
            <View pointerEvents="none">
              <Switch color={customColor.brandMain} value={appPinCode} />
            </View>
          </Pressable>
        </View>
      </View>
      {/* <Divider className="w-full bg-black my-1" />
      <Pressable className="w-full flex-row justify-between items-center py-3 px-6" disabled={isDisabled}>
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="advertisements-off"
            size={30}
            color={customColor.black}
          />
          <View className="ml-4">
            <Text>광고 제거</Text>
          </View>
        </View>
      </Pressable> */}
      <Divider className="w-full bg-black my-1" />
      <Pressable
        className="w-full flex-row justify-between items-center py-3 px-6"
        onPress={onPressTerm}
        disabled={isDisabled}>
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="file-document-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-4">
            <Text>약관</Text>
          </View>
        </View>
      </Pressable>
      <Divider className="w-full bg-black my-1" />
      <Pressable
        className="w-full flex-row justify-between items-center py-3 px-6"
        onPress={onPressContactUs}
        disabled={isDisabled}>
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="email-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-4">
            <Text>문의하기</Text>
          </View>
        </View>
      </Pressable>
      {/* <Divider className="w-full bg-black my-1" />
      <Pressable
        className="w-full flex-row justify-between items-center py-3 px-6"
        onPress={onOpenStoreLink} disabled={isDisabled}>
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="message-reply-text-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-4">
            <Text>리뷰 작성하기</Text>
          </View>
        </View>
      </Pressable> */}
      <Divider className="w-full bg-black my-1" />
      <View className="w-full flex-row justify-between items-center py-3 px-6">
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="information-outline"
            size={30}
            color={customColor.black}
          />
          <View className="ml-4">
            <Text>앱 버전</Text>
          </View>
        </View>
        <View>
          <Text className="text-gray-600">v {appVersion}</Text>
        </View>
      </View>
      <Divider className="w-full bg-black my-1" />
      <Pressable
        className="w-full flex-row justify-between items-center py-3 px-6"
        onPress={onSignOutAuth}
        disabled={isDisabled}>
        <View className="w-1/2 flex-row justify-start items-center">
          <MaterialCommunityIcons
            name="location-enter"
            size={30}
            color={customColor.black}
          />
          <View className="ml-4">
            <Text>로그 아웃</Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingScreen;
