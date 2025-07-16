import React from 'react';
import {View} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import {BrandContainedButton} from '../common/button';

interface CustomConfirmAlert {
  visible: boolean;
  title: string;
  description?: string;
  buttonText: string;
  buttonOnPress: () => void;
  hideAlert?: () => void;
  dismissable?: boolean;
}

const CustomConfirmAlert = ({
  visible,
  title,
  description,
  buttonText,
  buttonOnPress,
  hideAlert,
  dismissable,
}: CustomConfirmAlert) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={dismissable}
        onDismiss={hideAlert}
        dismissableBackButton={dismissable}
        style={customStyle().alert}>
        <View className="flex justify-center items-center pt-2 pb-6">
          <Text className="text-base text-center">{title}</Text>
          {description && (
            <Text className="text-xs text-center mt-1 text-gray-600">
              {description}
            </Text>
          )}
        </View>
        <View className="w-full flex justify-center items-center p-4">
          <BrandContainedButton
            classes="w-full rounded-md"
            text={buttonText}
            onPress={buttonOnPress}
          />
        </View>
      </Dialog>
    </Portal>
  );
};

export default CustomConfirmAlert;
