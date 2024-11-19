import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSetRecoilState} from 'recoil';
import {FormOutlinedButton} from 'src/components/button';
import CustomHelperText from 'src/components/helperText';
import {FormRegEx} from 'src/constants/regex';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {isLoadingState} from 'src/recoil/atom';
import {customColor} from 'src/style/customColor';
import {showBottomToast} from 'src/utils/showToast';

interface ResetPassword {
  close: () => void;
}

const ResetPasswordScreen = ({close}: ResetPassword) => {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const {setEmail, onSendPasswordResetEmail} = useEmailAndPasswordAuth();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    values: {
      email: '',
    },
  });

  const onSendResetPassword = async (data: {email: string}) => {
    setIsLoading(true);
    await onSendPasswordResetEmail()
      .then(res => onSendResetPasswordSuccess())
      .catch(error => onSendResetPasswordError(error));
  };

  const onSendResetPasswordSuccess = () => {
    close();
    setIsLoading(false);
    showBottomToast('success', '비밀번호 재설정을 위한 메일이 전송되었습니다.');
  };

  const onSendResetPasswordError = (error: any) => {
    setIsLoading(false);
    if (error.code === 'auth/too-many-requests') {
      showBottomToast(
        'error',
        '요청이 너무 빈번합니다. 잠시 후 다시 시도해 주세요.',
      );
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
            activeUnderlineColor={customColor.brandMain}
            value={value}
            onChangeText={text => {
              onChange(text);
              setEmail(text);
            }}
          />
        )}
      />
      {errors.email && (
        <CustomHelperText type="error" text={errors.email?.message} />
      )}
      <FormOutlinedButton
        text="확인"
        classes="w-full mt-4 py-1"
        isDisabled={isSubmitting}
        onSubmit={handleSubmit(onSendResetPassword)}
      />
    </View>
  );
};

export default ResetPasswordScreen;
