import {TouchableOpacity, View} from 'react-native';
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
        <Dialog.Title className="text-base text-center">{title}</Dialog.Title>
        <Dialog.Content className="p-0 border-t-[0.5px] border-blur">
          <View className="flex-row justify-center items-center">
            <TouchableOpacity
              className="w-1/2 flex justify-center items-center p-3"
              onPress={hideAlert}
              activeOpacity={0.8}>
              <Text className="text-blue-500">취소</Text>
            </TouchableOpacity>
            <View className="h-full border-r-[0.5px] border-blur"></View>
            <TouchableOpacity
              className="w-1/2 flex justify-center items-center p-3"
              onPress={buttonOnPress}
              activeOpacity={0.8}>
              <Text className="text-error">{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default CustomAlert;
