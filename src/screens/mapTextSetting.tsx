import {Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TMapTextSetting} from 'src/types/stack';
import {useLayoutEffect} from 'react';
import useBackButton from 'src/hook/common/useBackButton';
import MapTextSettingOpt from 'src/components/setting/mapTextSettingOpt';
import useMapTextSetting from 'src/hook/setting/useMapTextSetting';
import LoadingOverlay from './loadingOverlay';

const MapTextSettingScreen = ({navigation}: TMapTextSetting) => {
  useBackButton(() => navigation.goBack());

  const {isDisabled, onLoading, select, setSelect, isDirty, onShowRegionName} =
    useMapTextSetting(navigation);

  // Header button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          className="px-2"
          onPress={onShowRegionName}
          disabled={isDisabled || !isDirty}
          accessibilityRole="button"
          accessibilityLabel="설정 저장">
          <Text
            className="text-brandLight"
            style={{opacity: !isDirty || isDisabled ? 0.4 : 1}}>
            저장
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, onShowRegionName, isDirty, isDisabled]);

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <MapTextSettingOpt
        value="show"
        label="항상 표시"
        selected={select}
        onSelect={setSelect}
        isDisabled={isDisabled}
      />
      <MapTextSettingOpt
        value="condition"
        label="빈 지역명만 표시"
        selected={select}
        onSelect={setSelect}
        isDisabled={isDisabled}
      />
      <MapTextSettingOpt
        value="hide"
        label="표시 안함"
        selected={select}
        onSelect={setSelect}
        isDisabled={isDisabled}
      />
      <LoadingOverlay visible={onLoading} />
    </SafeAreaView>
  );
};

export default MapTextSettingScreen;
