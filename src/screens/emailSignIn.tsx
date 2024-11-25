import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSetRecoilState} from 'recoil';
import {FormOutlinedButton} from 'src/components/button';
import CustomHelperText from 'src/components/helperText';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {isLoadingState} from 'src/recoil/atom';
import {customColor} from 'src/style/customColor';
import {Account, AppUser} from 'src/types/account';
import {SignInProps, StackParamList} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';

interface EmailSignIn extends Omit<SignInProps, 'route'> {
  navigation: NativeStackNavigationProp<StackParamList, 'SignIn', undefined>;
  close: () => void;
}

const EmailSignInScreen = ({navigation, close}: EmailSignIn) => {
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

  const setIsLoading = useSetRecoilState(isLoadingState);
  const {setEmail, setPassword, onSignInEmailAndPassword, getDataAndSetRecoil} =
    useEmailAndPasswordAuth();

  // 이메일 로그인
  const onSignInAccount = async (data: Account) => {
    Keyboard.dismiss();
    setIsLoading(true);
    if (!data.email || !data.password) {
      setIsLoading(false);
      return setError('password', {type: 'custom'});
    }

    return await onSignInEmailAndPassword()
      .then(res => onSignInSuccess(res))
      .catch(error => onSignInError(error));
  };

  const onSignInSuccess = async (result: AppUser) => {
    await getDataAndSetRecoil(result);
    close();
    navigation.replace('Main', {screen: 'Map'});
    setIsLoading(false);
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
        render={({field: {onChange, onBlur, value}}) => (
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
        render={({field: {onChange, onBlur, value}}) => (
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
    </View>
  );
};

export default EmailSignInScreen;
