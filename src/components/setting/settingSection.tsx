import React from 'react';
import {Section} from 'react-native-tableview-simple';
import {staticStyles} from 'src/style/staticStyles';

type ISettingSection = React.ComponentProps<typeof Section>;

const SettingSection = (props: ISettingSection) => (
  <Section
    sectionPaddingTop={20}
    sectionPaddingBottom={0}
    headerTextStyle={staticStyles.settingTableSectionTitle}
    hideSurroundingSeparators
    {...props}
  />
);

export default SettingSection;
