import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {FormOutlinedButton} from 'src/components/button';
import CustomHelperText from 'src/components/helperText';
import {FormRegEx} from 'src/constants/regex';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {useAppTheme} from 'src/style/paperTheme';
import {AppUser, SignUp} from 'src/types/account';
import Feather from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import {showBottomToast} from 'src/utils/showToast';
import {useSetRecoilState} from 'recoil';
import {appUserState} from 'src/recoil/atom';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SignInProps, StackParamList} from 'src/types/stack';

interface EmailSignUp extends Omit<SignInProps, 'route'> {
  navigation: NativeStackNavigationProp<StackParamList, 'SignIn', undefined>;
  close: () => void;
}

const EmailSignUp = ({navigation, close}: EmailSignUp) => {
  const theme = useAppTheme();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    values: {
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  const setAppUser = useSetRecoilState(appUserState);
  const {setEmail, setPassword, setDisplayName, onSignUpEmailAndPassword} =
    useEmailAndPasswordAuth();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);
  const [passwordCheckVisible, setPasswordCheckVisible] =
    useState<boolean>(true);

  const onSignUpAccount = async (data: SignUp) => {
    if (data.password !== data.passwordCheck)
      return setError('passwordCheck', {type: 'validate'});

    return await onSignUpEmailAndPassword()
      .then(res => onSignUpSuccess(res))
      .catch(error => onSignUpError(error));
  };

  const onSignUpSuccess = (result: AppUser) => {
    setAppUser({
      email: result.email,
      displayName: result.displayName,
    });
    close();
    navigation.replace('Main');
    return showBottomToast('success', `반갑습니다. ${result.displayName}`);
  };

  const onSignUpError = (error: any) => {
    if (error.code === 'auth/email-already-in-use') {
      return showBottomToast('error', '이미 사용 중인 이메일입니다.');
    } else if (error.code === 'auth/invalid-email') {
      return showBottomToast('error', '유효하지 않은 이메일입니다.');
    } else {
      return showBottomToast('error', '회원가입에 실패했습니다.');
    }
  };

  return (
    <View className="w-full">
      <Controller
        name="email"
        control={control}
        rules={{
          required: '이메일을 입력해 주세요.',
          pattern: {
            value: FormRegEx.email,
            message: '이메일 형식에 맞게 입력해 주세요.',
          },
        }}
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
              setDisplayName(text.split('@')[0]);
            }}
          />
        )}
      />
      {errors.email && (
        <CustomHelperText type="error" text={errors.email.message} />
      )}
      <Controller
        name="password"
        control={control}
        rules={{
          required: '비밀번호를 입력해 주세요.',
          pattern: {
            value: FormRegEx.password,
            message: '영문, 숫자, 특수문자를 포함해 주세요.',
          },
        }}
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
            secureTextEntry={passwordVisible}
            right={
              value?.length > 0 && (
                <TextInput.Icon
                  icon={passwordVisible ? 'eye' : 'eye-off'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              )
            }
          />
        )}
      />
      <CustomHelperText
        type="info"
        text={
          <View className="flex-row justify-start items-center">
            <Feather
              name="info"
              size={14}
              color={
                errors.password?.type === 'pattern'
                  ? theme.colors.error
                  : theme.colors.outline
              }
            />
            <Text
              className={`text-xs ml-1 ${
                errors.password?.type === 'pattern'
                  ? 'text-error'
                  : 'text-outline'
              }`}>
              영문, 숫자, 특수문자 조합 8~16자리로 입력해 주세요.
            </Text>
          </View>
        }
      />
      {errors.password?.type === 'required' && (
        <CustomHelperText type="error" text={errors.password.message} />
      )}
      <Controller
        name="passwordCheck"
        control={control}
        rules={{
          required: '비밀번호를 다시 입력해 주세요.',
          validate: value =>
            watch('password') === value || '비밀번호가 다릅니다.',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            className="w-full bg-white mt-1"
            mode="flat"
            label="비밀번호 확인"
            activeUnderlineColor={theme.colors.brandMain}
            value={value}
            onChangeText={onChange}
            secureTextEntry={passwordCheckVisible}
            right={
              value?.length > 0 && (
                <TextInput.Icon
                  icon={passwordCheckVisible ? 'eye' : 'eye-off'}
                  onPress={() => setPasswordCheckVisible(!passwordCheckVisible)}
                />
              )
            }
          />
        )}
      />
      {errors.passwordCheck && (
        <CustomHelperText type="error" text={errors.passwordCheck.message} />
      )}
      <FormOutlinedButton
        text="회원가입"
        classes="w-full mt-4 py-1"
        isDisabled={isSubmitting}
        onSubmit={handleSubmit(onSignUpAccount)}
      />
    </View>
  );
};

export default EmailSignUp;
