import React from 'react';
import {Pressable, View} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';

interface CustomAlert {
  visible: boolean;
  title: string;
  buttonText: string;
  buttonOnPress: () => void;
  hideAlert: () => void;
}

const CustomAlert = ({
  visible,
  title,
  buttonText,
  hideAlert,
  buttonOnPress,
}: CustomAlert) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideAlert}
        style={customStyle().alert}>
        <Dialog.Title className="text-base text-center py-1">
          {title}
        </Dialog.Title>
        <Dialog.Content className="p-0 border-t-[0.5px] border-blur">
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
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const MemoizedCustomAlert = React.memo(CustomAlert);

export default MemoizedCustomAlert;
