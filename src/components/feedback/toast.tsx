import {
  SuccessToast,
  ErrorToast,
  InfoToast,
  ToastProps,
  BaseToast,
} from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {staticStyles} from '../../style/staticStyles';

export const ToastConfig = {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      style={staticStyles.successToast}
      contentContainerStyle={staticStyles.toastContent}
      text1Style={staticStyles.toastText1}
      renderLeadingIcon={() => (
        <MaterialIcons name="check-circle" size={18} color="#ffffff" />
      )}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={staticStyles.errorToast}
      contentContainerStyle={staticStyles.toastContent}
      text1Style={staticStyles.toastText1}
      renderLeadingIcon={() => (
        <MaterialIcons name="check-circle" size={18} color="#ffffff" />
      )}
    />
  ),
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      style={staticStyles.infoToast}
      contentContainerStyle={staticStyles.toastContent}
      text1Style={staticStyles.toastText1}
      renderLeadingIcon={() => (
        <MaterialIcons name="info" size={18} color="#ffffff" />
      )}
    />
  ),
  blackOpacity: ({text1}: any) => (
    <View style={staticStyles.blackOpacityToast}>
      <Text style={staticStyles.toastText1}>{text1}</Text>
    </View>
  ),
};
