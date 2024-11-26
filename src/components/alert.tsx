import React from 'react';
import {Pressable, View} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';

interface CustomAlert {
  visible: boolean;
  title: string;
  description?: string;
  buttonText: string;
  buttonOnPress: () => void;
  hideAlert: () => void;
}

const CustomAlert = ({
  visible,
  title,
  description,
  buttonText,
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
        style={customStyle().alert}>
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
              onPress={hideAlert}>
              <Text className="text-blue-500">취소</Text>
            </Pressable>
            <View className="h-full border-r-[0.5px] border-blur"></View>
            <Pressable
              className="w-1/2 flex justify-center items-center py-4"
              onPress={buttonOnPress}>
              <Text className="text-error">{buttonText}</Text>
            </Pressable>
          </View>
        </View>
      </Dialog>
    </Portal>
  );
};

const MemoizedCustomAlert = React.memo(CustomAlert);

export default MemoizedCustomAlert;
