import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, View} from 'react-native';
import {Portal, TextInput} from 'react-native-paper';
import {useSetRecoilState} from 'recoil';
import {FormOutlinedButton} from 'src/components/button';
import CustomHelperText from 'src/components/helperText';
import useAuth from 'src/hook/useAuth';
import {appUserState} from 'src/recoil/atom';
import LoadingScreen from 'src/screens/loadingScreen';
import {customColor} from 'src/style/customColor';
import {SignIn} from 'src/types/account';
import {SignInProps, StackParamList} from 'src/types/stack';
import {getInitialDataToDB, syncDataToSQLite} from 'src/utils/auth';
import {showBottomToast} from 'src/utils/showToast';

interface EmailSignIn extends Omit<SignInProps, 'route'> {
  navigation: NativeStackNavigationProp<StackParamList, 'SignIn', undefined>;
  close: () => void;
}

const EmailSignIn = ({navigation, close}: EmailSignIn) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    values: {
      email: '',
      password: '',
    },
  });

  const setAppUser = useSetRecoilState(appUserState);
  const {setEmail, setPassword, onSignInEmailAndPassword} = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Email SignIn
  const onSignInAccount = async (data: SignIn) => {
    Keyboard.dismiss();
    setIsLoading(true);

    // Check email & password
    if (!data.email || !data.password) {
      setIsLoading(false);
      return setError('password', {type: 'custom'});
    }

    try {
      const newUser = await onSignInEmailAndPassword();
      await syncDataToSQLite(newUser);
      const finalUser = await getInitialDataToDB(newUser);
      setAppUser(finalUser);

      onSignInSuccess();
    } catch (error) {
      onSignInError(error);
    }
  };

  const onSignInSuccess = async () => {
    close();
    navigation.replace('Main', {screen: 'Map'});
  };

  const onSignInError = (error: any) => {
    setIsLoading(false);
    return showBottomToast('error', '이메일 또는 비밀번호가 틀렸습니다.');
  };

  return (
    <View className="w-full">
      <Controller
        name="email"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            className="w-full bg-white"
            mode="flat"
            label="이메일"
            activeUnderlineColor={customColor.brandMain}
            value={value}
            onChangeText={text => {
              onChange(text);
              setEmail(text);
            }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            className="w-full bg-white mt-1"
            mode="flat"
            label="비밀번호"
            activeUnderlineColor={customColor.brandMain}
            value={value}
            onChangeText={text => {
              onChange(text);
              setPassword(text);
            }}
            secureTextEntry={true}
          />
        )}
      />
      {errors.password && (
        <CustomHelperText
          type="error"
          text="이메일 또는 비밀번호를 확인해 주세요."
        />
      )}
      <FormOutlinedButton
        text="로그인"
        classes="w-full mt-4 py-1"
        isDisabled={isSubmitting}
        onSubmit={handleSubmit(onSignInAccount)}
      />
      {isLoading && (
        <Portal>
          <LoadingScreen />
        </Portal>
      )}
    </View>
  );
};

export default EmailSignIn;
