import React from 'react';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import {Pressable, ScrollView, View} from 'react-native';
import {Switch} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TSetting} from 'src/types/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';
import CustomAlert from 'src/components/alert/alert';
import {staticStyles} from 'src/style/staticStyles';
import {useAppTheme} from 'src/style/paperTheme';
import {onOpenStoreLink} from 'src/utils/openLink';
import useExitApp from 'src/hook/common/useExitApp';
import {useAppPinCode} from 'src/store/appPinCode';
import {useDynamicStyle} from 'src/hook/common/useDynamicStyle';
import {useSettingAction} from 'src/hook/setting/useSettingAction';

const SettingScreen = ({navigation}: TSetting) => {
  const theme = useAppTheme();

  const appPinCode = useAppPinCode(state => state.appPinCode);

  useExitApp();
  const {
    appVersion,
    isDisabled,
    visibleDialog,
    showDialog,
    hideDialog,
    onPressMapText,
    onPressPinCodeSetting,
    onPressPinCodeReset,
    onPressContactUs,
    onPressTermPrivacyUrl,
    onPressTermServiceUrl,
    onResetMap,
  } = useSettingAction(navigation);

  const cellHasBorder = useDynamicStyle({border: {bottom: 0.5}});
  const cellNoneBorder = useDynamicStyle();

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-gray-100"
      edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView className="w-full">
        <TableView style={staticStyles.settingTable} appearance="light">
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={staticStyles.settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={cellHasBorder.settingTableCell}
              cellStyle="RightDetail"
              title="지역명 표시"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={staticStyles.settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.gray}
                  onPress={onPressMapText}
                  disabled={isDisabled}
                />
              }
            />
            <Cell
              contentContainerStyle={cellNoneBorder.settingTableCell}
              cellStyle="RightDetail"
              title="암호 잠금"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={staticStyles.settingTableCellTitle}
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
                  <Switch
                    color={customColor.brandMain}
                    value={appPinCode}
                    onValueChange={() => onPressPinCodeSetting(!!appPinCode)}
                    disabled={isDisabled}
                  />
                </View>
              }
            />
          </Section>
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={staticStyles.settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={cellHasBorder.settingTableCell}
              cellStyle="RightDetail"
              title="지도 초기화"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={staticStyles.settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.gray}
                  onPress={showDialog}
                  disabled={isDisabled}
                />
              }
            />
            {/* <Cell
              contentContainerStyle={cellNoneBorder.settingTableCell}
              cellStyle="RightDetail"
              title="백업 및 복구"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={staticStyles.settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.gray}
                  onPress={onPressBackUp}
                  disabled={isDisabled}
                />
              }
            /> */}
          </Section>
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={staticStyles.settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={cellNoneBorder.settingTableCell}
              cellStyle="RightDetail"
              title="의견 보내기"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={staticStyles.settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.gray}
                  onPress={onPressContactUs}
                  disabled={isDisabled}
                />
              }
            />
            <Cell
              contentContainerStyle={cellNoneBorder.settingTableCell}
              cellStyle="RightDetail"
              title="리뷰 작성"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={staticStyles.settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.gray}
                  onPress={onOpenStoreLink}
                  disabled={isDisabled}
                />
              }
            />
          </Section>
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={staticStyles.settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={cellHasBorder.settingTableCell}
              cellStyle="RightDetail"
              title="서비스 이용 약관"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={staticStyles.settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.gray}
                  onPress={onPressTermServiceUrl}
                  disabled={isDisabled}
                />
              }
            />
            <Cell
              contentContainerStyle={cellNoneBorder.settingTableCell}
              cellStyle="RightDetail"
              title="개인정보 처리 방침"
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={staticStyles.settingTableCellTitle}
              hideSeparator
              cellAccessoryView={
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color={theme.colors.gray}
                  onPress={onPressTermPrivacyUrl}
                  disabled={isDisabled}
                />
              }
            />
          </Section>
          <Section
            sectionPaddingTop={20}
            sectionPaddingBottom={0}
            headerTextStyle={staticStyles.settingTableSectionTitle}
            hideSurroundingSeparators>
            <Cell
              contentContainerStyle={cellNoneBorder.settingTableCell}
              cellStyle="RightDetail"
              title="앱 버전"
              detail={`v ${appVersion}`}
              titleTextColor={theme.colors.darkGray}
              titleTextStyle={staticStyles.settingTableCellTitle}
              rightDetailColor={theme.colors.gray}
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
