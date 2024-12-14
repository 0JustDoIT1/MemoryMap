import React from 'react';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import {Pressable, ScrollView, View} from 'react-native';
import {Switch} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SettingProps} from 'src/types/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';
import {Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  LinkingEmail,
  TermPrivacyUrl,
  TermServiceUrl,
} from 'src/constants/linking';
import {useRecoilValue} from 'recoil';
import {appPinCodeState} from 'src/recoil/atom';
import CustomAlert from 'src/components/alert';
import useButton from 'src/hook/useButton';
import useDialog from 'src/hook/useDialog';
import useKoreaMapMutation from 'src/hook/useKoreaMapMutation';
import {showBottomToast} from 'src/utils/showToast';
import {customStyle} from 'src/style/customStyle';
import {useAppTheme} from 'src/style/paperTheme';

const SettingScreen = ({navigation}: SettingProps) => {
  const theme = useAppTheme();
  const appVersion = DeviceInfo.getVersion();

  const appPinCode = useRecoilValue(appPinCodeState);

  const {isDisabled, disabledButton, abledButton} = useButton();
  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {resetMapMutation} = useKoreaMapMutation();

  // BackUp AppData
  const onPressBackUp = () => {
    navigation.navigate('BackUp');
  };

  // Email Contact us
  const onPressContactUs = async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    await Linking.openURL(LinkingEmail(deviceName, appVersion));
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

  // Map Text show
  const onPressMapText = () => {
    navigation.navigate('MapTextSetting');
  };

  // Reset Map & RegionCount
  const onResetMap = async () => {
    try {
      disabledButton();
      await resetMapMutation.mutateAsync();

      abledButton();
      hideDialog();
      showBottomToast('info', '지도를 새로 채워보세요!');
    } catch (error) {
      abledButton();
      return;
    }
  };

  // Term link
  const onPressTermPrivacyUrl = async () => {
    await Linking.openURL(TermPrivacyUrl);
  };

  // Term link
  const onPressTermServiceUrl = async () => {
    await Linking.openURL(TermServiceUrl);
  };

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-gray-100"
      edges={['left', 'right']}>
      <ScrollView className="w-full">
        <TableView style={customStyle().settingTable} appearance="light">
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={customStyle().settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={
                customStyle({border: {bottom: 0.5}}).settingTableCell
              }
              cellStyle="RightDetail"
              title="지역명 표시"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={customStyle().settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.backdrop}
                  onPress={onPressMapText}
                  disabled={isDisabled}
                />
              }
            />
            <Cell
              contentContainerStyle={customStyle().settingTableCell}
              cellStyle="RightDetail"
              title="암호 잠금"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={customStyle().settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
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
                  <Pressable
                    onPress={onPressPinCodeSetting}
                    disabled={isDisabled}>
                    <View pointerEvents="none">
                      <Switch
                        color={customColor.brandMain}
                        value={appPinCode}
                      />
                    </View>
                  </Pressable>
                </View>
              }
            />
          </Section>
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={customStyle().settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={
                customStyle({border: {bottom: 0.5}}).settingTableCell
              }
              cellStyle="RightDetail"
              title="지도 초기화"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={customStyle().settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.backdrop}
                  onPress={showDialog}
                  disabled={isDisabled}
                />
              }
            />
            <Cell
              contentContainerStyle={customStyle().settingTableCell}
              cellStyle="RightDetail"
              title="백업 및 복구"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={customStyle().settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.backdrop}
                  onPress={onPressBackUp}
                  disabled={isDisabled}
                />
              }
            />
          </Section>
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={customStyle().settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={customStyle().settingTableCell}
              cellStyle="RightDetail"
              title="의견 보내기"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={customStyle().settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.backdrop}
                  onPress={onPressContactUs}
                  disabled={isDisabled}
                />
              }
            />
            {/* <Cell
              contentContainerStyle={customStyle().settingTableCell}
              cellStyle="RightDetail"
              title="리뷰 작성"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={customStyle().settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.backdrop}
                  onPress={onOpenStoreLink}
                  disabled={isDisabled}
                />
              }
            /> */}
          </Section>
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={customStyle().settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={
                customStyle({border: {bottom: 0.5}}).settingTableCell
              }
              cellStyle="RightDetail"
              title="서비스 이용 약관"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={customStyle().settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.backdrop}
                  onPress={onPressTermServiceUrl}
                  disabled={isDisabled}
                />
              }
            />
            <Cell
              contentContainerStyle={customStyle().settingTableCell}
              cellStyle="RightDetail"
              title="개인정보 처리 방침"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={customStyle().settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.backdrop}
                  onPress={onPressTermPrivacyUrl}
                  disabled={isDisabled}
                />
              }
            />
          </Section>
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={customStyle().settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={customStyle().settingTableCell}
              cellStyle="RightDetail"
              title="앱 버전"
              detail={`v ${appVersion}`}
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={customStyle().settingTableCellTitle}
              rightDetailColor={theme.colors.backdrop}
              hideSeparator
            />
          </Section>
        </TableView>
      </ScrollView>

      <CustomAlert
        visible={visibleDialog}
        title="지도를 초기화하시겠습니까?"
        buttonText="초기화"
        isDisabled={isDisabled}
        buttonOnPress={onResetMap}
        hideAlert={hideDialog}
      />
    </SafeAreaView>
  );
};

export default SettingScreen;
