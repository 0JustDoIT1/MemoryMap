import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {FormOutlinedButton} from 'src/components/button';
import CustomHelperText from 'src/components/helperText';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import useKoreaMap from 'src/hook/useKoreaMap';
import {useAppTheme} from 'src/style/paperTheme';
import {Account, AppUser} from 'src/types/account';
import {SignInProps, StackParamList} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';

interface EmailSignIn extends Omit<SignInProps, 'route'> {
  navigation: NativeStackNavigationProp<StackParamList, 'SignIn', undefined>;
  close: () => void;
}

const EmailSignIn = ({navigation, close}: EmailSignIn) => {
  const theme = useAppTheme();

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

  const {getDataAndSetRecoil} = useKoreaMap();
  const {setEmail, setPassword, onSignInEmailAndPassword} =
    useEmailAndPasswordAuth();

  const onSignInAccount = async (data: Account) => {
    if (!data.email || !data.password)
      return setError('password', {type: 'custom'});

    return await onSignInEmailAndPassword()
      .then(res => onSignInSuccess(res))
      .catch(error => onSignInError(error));
  };

  const onSignInSuccess = async (result: AppUser) => {
    const appUserInit = {
      uid: result.uid,
      email: result.email,
      displayName: result.displayName,
    };
    await getDataAndSetRecoil(appUserInit);
    close();
    navigation.replace('Main');
  };

  const onSignInError = (error: any) => {
    return showBottomToast('error', '이메일 또는 비밀번호가 틀렸습니다.');
  };

  return (
    <View className="w-full">
      <Controller
        name="email"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            className="w-full bg-white"
            mode="flat"
            label="이메일"
            activeUnderlineColor={theme.colors.brandMain}
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
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            className="w-full bg-white mt-1"
            mode="flat"
            label="비밀번호"
            activeUnderlineColor={theme.colors.brandMain}
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
    </View>
  );
};

export default EmailSignIn;
