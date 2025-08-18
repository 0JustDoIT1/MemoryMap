import {useCallback} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TStackParamList} from 'src/types/stack';

export const useSettingNavigation = (
  navigation: NativeStackNavigationProp<TStackParamList, 'Setting', undefined>,
) => {
  // Map Text show
  const onPressMapText = useCallback(() => {
    navigation.navigate('MapTextSetting');
  }, [navigation]);

  // Pincode(lock screen) on/off
  const onPressPinCodeSetting = useCallback(
    (hasPin: boolean) => {
      if (hasPin) navigation.navigate('PinCodeEnter', {route: 'Setting'});
      else navigation.navigate('PinCodeSetting');
    },
    [navigation],
  );

  // Pincode(lock screen) reset
  const onPressPinCodeReset = useCallback(() => {
    navigation.navigate('PinCodeEnter', {route: 'PinCodeSetting'});
  }, [navigation]);

  // BackUp Data
  const onPressBackUp = useCallback(() => {
    navigation.navigate('BackUp');
  }, [navigation]);

  return {
    onPressMapText,
    onPressPinCodeSetting,
    onPressPinCodeReset,
    onPressBackUp,
  };
};
