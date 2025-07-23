import {Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MapTextSettingProps} from 'src/types/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';
import {setAsyncStorage} from 'src/utils/asyncStorage';
import {appShowRegionNameKey} from 'src/constants/app';
import {useEffect, useState} from 'react';
import {AppShowRegionName} from 'src/types/appData';
import {customStyle} from 'src/style/customStyle';
import useButton from 'src/hook/useButton';
import useBackButton from 'src/hook/useBackButton';
import {useAppShowRegionName} from 'src/store/appShowRegionName';

const MapTextSettingScreen = ({navigation}: MapTextSettingProps) => {
  const theme = useAppTheme();

  const appShowRegionName = useAppShowRegionName(
    state => state.appShowRegionName,
  );
  const setAppShowRegionName = useAppShowRegionName(
    state => state.setAppShowRegionName,
  );

  const {isDisabled, disabledButton} = useButton();

  const [select, setSelect] = useState<AppShowRegionName>(appShowRegionName);

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

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <Pressable
        className="flex-row justify-between items-center w-full p-4 border-y border-y-gray-300"
        style={
          customStyle({
            bgColor:
              select === 'show' ? theme.colors.brandLight : theme.colors.white,
          }).mapTextSettingSelect
        }
        onPress={() => setSelect('show')}
        disabled={isDisabled}>
        <Text
          className="text-left text-lg"
          style={
            customStyle({
              color:
                select === 'show'
                  ? theme.colors.white
                  : theme.colors.brandLight,
            }).mapTextSettingText
          }>
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
        style={
          customStyle({
            color:
              select === 'condition'
                ? theme.colors.white
                : theme.colors.brandLight,
            bgColor:
              select === 'condition'
                ? theme.colors.brandLight
                : theme.colors.white,
          }).mapTextSettingSelect
        }
        onPress={() => setSelect('condition')}
        disabled={isDisabled}>
        <Text
          className="text-left text-lg"
          style={
            customStyle({
              color:
                select === 'condition'
                  ? theme.colors.white
                  : theme.colors.brandLight,
            }).mapTextSettingText
          }>
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
        style={
          customStyle({
            color:
              select === 'hide' ? theme.colors.white : theme.colors.brandLight,
            bgColor:
              select === 'hide' ? theme.colors.brandLight : theme.colors.white,
          }).mapTextSettingSelect
        }
        onPress={() => setSelect('hide')}
        disabled={isDisabled}>
        <Text
          className="text-left text-lg"
          style={
            customStyle({
              color:
                select === 'hide'
                  ? theme.colors.white
                  : theme.colors.brandLight,
            }).mapTextSettingText
          }>
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
