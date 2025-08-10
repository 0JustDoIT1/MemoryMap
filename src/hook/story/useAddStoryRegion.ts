import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import {Keyboard} from 'react-native';
import useKoreaMapQuery from 'src/hook/map/useKoreaMapQuery';
import {TStackParamList} from 'src/types/stack';

export const useSelectRegion = (
  navigation: NativeStackNavigationProp<TStackParamList, 'AddStory', undefined>,
) => {
  const {isColorSuccess, isColorLoading, isColorError, colorData} =
    useKoreaMapQuery();

  // Navigate to region selection page
  const onPressRegion = useCallback(() => {
    Keyboard.dismiss();
    if (!isColorSuccess || !colorData) return;
    navigation.navigate('SelectRegion', {
      regionList: colorData.all,
      regionMainList: colorData.main,
    });
  }, [isColorSuccess, colorData, navigation]);

  const isRegionSelectable =
    isColorSuccess && (colorData?.main?.length ?? 0) > 0;
  return {
    onPressRegion,
    isRegionSelectable,
    isColorSuccess,
    isColorLoading,
    isColorError,
  };
};
