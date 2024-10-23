import {
  SuccessToast,
  ErrorToast,
  InfoToast,
  ToastProps,
} from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const toastConfig = {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      style={{
        backgroundColor: '#22bb33',
        borderLeftColor: '#22bb33',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
      }}
      contentContainerStyle={{paddingHorizontal: 5}}
      text1Style={{
        color: '#ffffff',
      }}
      renderLeadingIcon={() => (
        <MaterialIcons name="check-circle" size={18} color="#ffffff" />
      )}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: '#bb2124',
        borderLeftColor: '#bb2124',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
      }}
      contentContainerStyle={{paddingHorizontal: 5}}
      text1Style={{
        color: '#ffffff',
      }}
      renderLeadingIcon={() => (
        <MaterialIcons name="check-circle" size={18} color="#ffffff" />
      )}
    />
  ),
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      style={{
        backgroundColor: '#5bc0de',
        borderLeftColor: '#5bc0de',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
      }}
      contentContainerStyle={{paddingHorizontal: 5}}
      text1Style={{
        color: '#ffffff',
      }}
      renderLeadingIcon={() => (
        <MaterialIcons name="info" size={18} color="#ffffff" />
      )}
    />
  ),
};
