import {
  SuccessToast,
  ErrorToast,
  InfoToast,
  ToastProps,
} from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {customStyle} from './customStyle';

export const toastConfig = {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      style={customStyle().successToast}
      contentContainerStyle={customStyle().toastContent}
      text1Style={customStyle().toastText1}
      renderLeadingIcon={() => (
        <MaterialIcons name="check-circle" size={18} color="#ffffff" />
      )}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={customStyle().errorToast}
      contentContainerStyle={customStyle().toastContent}
      text1Style={customStyle().toastText1}
      renderLeadingIcon={() => (
        <MaterialIcons name="check-circle" size={18} color="#ffffff" />
      )}
    />
  ),
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      style={customStyle().infoToast}
      contentContainerStyle={customStyle().toastContent}
      text1Style={customStyle().toastText1}
      renderLeadingIcon={() => (
        <MaterialIcons name="info" size={18} color="#ffffff" />
      )}
    />
  ),
};
