import {Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TMapTextSetting} from 'src/types/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';
import {setAsyncStorage} from 'src/utils/asyncStorage';
import {appShowRegionNameKey} from 'src/constants/app';
import {useEffect, useState} from 'react';
import {IAppShowRegionName} from 'src/types/app';
import useButton from 'src/hook/common/useButton';
import useBackButton from 'src/hook/common/useBackButton';
import {useAppShowRegionName} from 'src/store/appShowRegionName';
import {useDynamicStyle} from 'src/hook/common/useDynamicStyle';

const MapTextSettingScreen = ({navigation}: TMapTextSetting) => {
  const theme = useAppTheme();

  const appShowRegionName = useAppShowRegionName(
    state => state.appShowRegionName,
  );
  const setAppShowRegionName = useAppShowRegionName(
    state => state.setAppShowRegionName,
  );

  const {isDisabled, disabledButton} = useButton();

  const [select, setSelect] = useState<IAppShowRegionName>(appShowRegionName);

  useBackButton(() => navigation.goBack());

  // Save show region name
  const onShowRegionName = async () => {
    disabledButton();
    await setAsyncStorage(appShowRegionNameKey, select);
    setAppShowRegionName(select);
    navigation.goBack();
  };

  // Header button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          className="px-2"
          onPress={onShowRegionName}
          disabled={isDisabled}>
          <Text className="text-brandLight">저장</Text>
        </Pressable>
      ),
    });
  }, [navigation, select]);

  // 공통 색
  const activeBG = theme.colors.brandLight;
  const inactiveBG = theme.colors.white;
  const activeText = theme.colors.white;
  const inactiveText = theme.colors.brandLight;

  const isShowActive = select === 'show';
  const isCondActive = select === 'condition';
  const isHideActive = select === 'hide';

  // show
  const showContainerStyles = useDynamicStyle({
    bgColor: isShowActive ? activeBG : inactiveBG,
  });
  const showTextStyles = useDynamicStyle({
    color: isShowActive ? activeText : inactiveText,
  });

  // condition
  const condContainerStyles = useDynamicStyle({
    bgColor: isCondActive ? activeBG : inactiveBG,
  });
  const condTextStyles = useDynamicStyle({
    color: isCondActive ? activeText : inactiveText,
  });

  // hide
  const hideContainerStyles = useDynamicStyle({
    bgColor: isHideActive ? activeBG : inactiveBG,
  });
  const hideTextStyles = useDynamicStyle({
    color: isHideActive ? activeText : inactiveText,
  });

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <Pressable
        className="flex-row justify-between items-center w-full p-4 border-y border-y-gray-300"
        style={showContainerStyles.mapTextSettingSelect}
        onPress={() => setSelect('show')}
        disabled={isDisabled}>
        <Text
          className="text-left text-lg"
          style={showTextStyles.mapTextSettingText}>
          항상 표시
        </Text>
        {select === 'show' && (
          <MaterialCommunityIcons
            name="check-bold"
            size={24}
            color={theme.colors.white}
          />
        )}
      </Pressable>
      <Pressable
        className="flex-row justify-between items-center w-full p-4 border-y border-y-gray-300"
        style={condContainerStyles.mapTextSettingSelect}
        onPress={() => setSelect('condition')}
        disabled={isDisabled}>
        <Text
          className="text-left text-lg"
          style={condTextStyles.mapTextSettingText}>
          빈 지역명만 표시
        </Text>
        {select === 'condition' && (
          <MaterialCommunityIcons
            name="check-bold"
            size={24}
            color={theme.colors.white}
          />
        )}
      </Pressable>
      <Pressable
        className="flex-row justify-between items-center w-full p-4 border-y border-y-gray-300"
        style={hideContainerStyles.mapTextSettingSelect}
        onPress={() => setSelect('hide')}
        disabled={isDisabled}>
        <Text
          className="text-left text-lg"
          style={hideTextStyles.mapTextSettingText}>
          표시 안함
        </Text>
        {select === 'hide' && (
          <MaterialCommunityIcons
            name="check-bold"
            size={24}
            color={theme.colors.white}
          />
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default MapTextSettingScreen;
