import React from 'react';
import {Pressable, View} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';
import {staticStyles} from 'src/style/staticStyles';

interface CustomAlert {
  visible: boolean;
  title: string;
  description?: string;
  buttonText: string;
  isDisabled: boolean;
  buttonOnPress: () => void;
  hideAlert: () => void;
}

const CustomAlert = ({
  visible,
  title,
  description,
  buttonText,
  isDisabled,
  hideAlert,
  buttonOnPress,
}: CustomAlert) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={false}
        dismissableBackButton={false}
        onDismiss={hideAlert}
        style={staticStyles.alert}>
        <View className="flex justify-center items-center pt-2 pb-6">
          <Text className="text-base text-center">{title}</Text>
          {description && (
            <Text className="text-xs text-center mt-1 text-error">
              {description}
            </Text>
          )}
        </View>
        <View className="border-t-[0.5px] border-blur">
          <View className="flex-row justify-center items-center">
            <Pressable
              className="w-1/2 flex justify-center items-center py-4"
              disabled={isDisabled}
              onPress={hideAlert}>
              <Text className="text-blue-500">취소</Text>
            </Pressable>
            <View className="h-full border-r-[0.5px] border-blur"></View>
            <Pressable
              className="w-1/2 flex justify-center items-center py-4"
              disabled={isDisabled}
              onPress={buttonOnPress}>
              <Text className="text-error">{buttonText}</Text>
            </Pressable>
          </View>
        </View>
      </Dialog>
    </Portal>
  );
};

export default CustomAlert;
