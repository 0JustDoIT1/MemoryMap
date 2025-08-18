import React, {memo} from 'react';
import {TableView} from 'react-native-tableview-simple';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TSetting} from 'src/types/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlert from 'src/components/alert/alert';
import {staticStyles} from 'src/style/staticStyles';
import {useAppTheme} from 'src/style/paperTheme';
import {onOpenStoreLink} from 'src/utils/openLink';
import useExitApp from 'src/hook/common/useExitApp';
import {useAppPinCode} from 'src/store/appPinCode';
import {useDynamicStyle} from 'src/hook/common/useDynamicStyle';
import {useSettingResetMap} from 'src/hook/setting/useSettingResetMap';
import {useSettingLink} from 'src/hook/setting/useSettingLink';
import {useSettingNavigation} from 'src/hook/setting/useSettingNavigation';
import SettingCell from 'src/components/setting/settingCell';
import PinCodeAccessory from 'src/components/pinCode/pinCodeAccessory';
import SettingSection from 'src/components/setting/settingSection';

const Chevron = memo(() => {
  const theme = useAppTheme();

  return (
    <MaterialCommunityIcons
      name="chevron-right"
      size={30}
      color={theme.colors.gray}
    />
  );
});

const SettingScreen = ({navigation}: TSetting) => {
  const appPinCode = useAppPinCode(state => state.appPinCode);

  useExitApp();

  const {isDisabled, visibleDialog, showDialog, hideDialog, onResetMap} =
    useSettingResetMap();
  const {
    appVersion,
    onPressContactUs,
    onPressTermPrivacyUrl,
    onPressTermServiceUrl,
  } = useSettingLink();
  const {
    onPressMapText,
    onPressPinCodeSetting,
    onPressPinCodeReset,
    onPressBackUp,
  } = useSettingNavigation(navigation);

  const cellHasBorder = useDynamicStyle({border: {bottom: 0.5}});
  const cellNoneBorder = useDynamicStyle();

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-gray-100"
      edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView className="w-full">
        <TableView style={staticStyles.settingTable} appearance="light">
          <SettingSection>
            <SettingCell
              contentContainerStyle={cellHasBorder.settingTableCell}
              title="지역명 표시"
              onPress={onPressMapText}
              cellAccessoryView={<Chevron />}
            />
            <SettingCell
              contentContainerStyle={cellHasBorder.settingTableCell}
              title="암호 잠금"
              cellAccessoryView={
                <PinCodeAccessory
                  appPinCode={!!appPinCode}
                  isDisabled={isDisabled}
                  onReset={onPressPinCodeReset}
                  onToggle={() => onPressPinCodeSetting(!!appPinCode)}
                />
              }
            />
          </SettingSection>
          <SettingSection>
            <SettingCell
              contentContainerStyle={cellHasBorder.settingTableCell}
              title="지도 초기화"
              onPress={showDialog}
              cellAccessoryView={<Chevron />}
            />
            <SettingCell
              contentContainerStyle={cellNoneBorder.settingTableCell}
              title="백업 및 복구"
              onPress={onPressBackUp}
              cellAccessoryView={<Chevron />}
            />
          </SettingSection>
          <SettingSection>
            <SettingCell
              contentContainerStyle={cellHasBorder.settingTableCell}
              title="의견 보내기"
              onPress={onPressContactUs}
              cellAccessoryView={<Chevron />}
            />
            <SettingCell
              contentContainerStyle={cellHasBorder.settingTableCell}
              title="리뷰 작성"
              onPress={onOpenStoreLink}
              cellAccessoryView={<Chevron />}
            />
          </SettingSection>
          <SettingSection>
            <SettingCell
              contentContainerStyle={cellHasBorder.settingTableCell}
              title="서비스 이용 약관"
              onPress={onPressTermServiceUrl}
              cellAccessoryView={<Chevron />}
            />
            <SettingCell
              contentContainerStyle={cellHasBorder.settingTableCell}
              title="개인정보 처리 방침"
              onPress={onPressTermPrivacyUrl}
              cellAccessoryView={<Chevron />}
            />
          </SettingSection>
          <SettingSection>
            <SettingCell
              contentContainerStyle={cellHasBorder.settingTableCell}
              title="앱 버전"
              detail={`v ${appVersion}`}
            />
          </SettingSection>
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
