import {Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandOutlinedButton, FormOutlinedButton} from 'src/components/button';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {dateToSeoulTime} from 'src/utils/dateFormat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import CustomBottomSheet from 'src/components/bottomSheet';
import MemoizedCustomAlert from 'src/components/alert';
import useDialog from 'src/hook/useDialog';
import {AccountInfoProps} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';
import CustomActivityIndicator from 'src/components/activityIndicator';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Controller, useForm} from 'react-hook-form';
import CustomHelperText from 'src/components/helperText';
import {AppUser} from 'src/types/account';
import {useFocusEffect} from '@react-navigation/native';

interface DisplayNameBottomSheet {
  handleClosePress: () => void;
}

const DisplayNameBottomSheet = ({handleClosePress}: DisplayNameBottomSheet) => {
  const {appUser, displayName, setDisplayName, onUpdateProfile} =
    useEmailAndPasswordAuth();

  useEffect(() => {
    setDisplayName(appUser?.displayName!);
  }, [appUser]);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    values: {
      displayName: displayName,
    },
  });

  // 닉네임 수정
  const onUpdateDisplayName = async () => {
    await onUpdateProfile().then(() => handleClosePress());
  };

  return (
    <View className="w-full">
      <Controller
        name="displayName"
        control={control}
        rules={{
          required: '닉네임을 입력해 주세요.',
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            className="w-full bg-white"
            mode="outlined"
            label="닉네임"
            placeholder="(10자)"
            activeOutlineColor={customColor.brandMain}
            value={value}
            maxLength={10}
            onChangeText={text => {
              onChange(text);
              setDisplayName(text);
            }}
          />
        )}
      />
      {errors.displayName && (
        <CustomHelperText type="error" text={errors.displayName.message} />
      )}

      <FormOutlinedButton
        text="수정"
        classes="w-full mt-4 py-1"
        isDisabled={isSubmitting}
        onSubmit={handleSubmit(onUpdateDisplayName)}
      />
    </View>
  );
};

const AccountInfoScreen = ({navigation}: AccountInfoProps) => {
  // Bottom Sheet Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Bottom Sheet present event
  const handlePresentPress = useCallback(
    () => bottomSheetModalRef.current?.present(),
    [],
  );
  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const {appUser, onWithdrawal, setInitRecoil} = useEmailAndPasswordAuth();

  const {visibleDialog, showDialog, hideDialog} = useDialog();

  const [appUserData, setAppUserData] = useState<AppUser>(appUser!);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setIsFocus(true);

      return () => setIsFocus(false);
    }, []),
  );

  // 닉네임 수정을 위한 바텀시트
  const onPressDisplayName = () => handlePresentPress();

  // 회원탈퇴
  const onWithdrawalAccount = async () => {
    setIsLoading(true);
    hideDialog();
    await onWithdrawal()
      .then(() => onWithdrawalAccountSuccess())
      .catch(error => onWithdrawalAccountError(error));
  };

  const onWithdrawalAccountSuccess = () => {
    navigation.navigate('Auth');
    setIsLoading(false);
  };

  const onWithdrawalAccountError = (error: any) => {
    navigation.navigate('Auth');
    setInitRecoil();
    showBottomToast('error', '회원탈퇴 실패');
  };

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      {isLoading ? (
        <View className="w-full h-full justify-center items-center">
          <CustomActivityIndicator />
        </View>
      ) : (
        <React.Fragment>
          <View className="w-full p-4 flex-row justify-between items-center">
            <View className="w-1/5">
              <Text>닉네임</Text>
            </View>
            <View className="w-4/5 flex-row justify-end items-center">
              <Text className="mx-2">{appUserData.displayName}</Text>
              <Pressable onPress={onPressDisplayName}>
                <MaterialCommunityIcons
                  name="pencil-box-outline"
                  size={24}
                  color={customColor.gray}
                />
              </Pressable>
            </View>
          </View>
          <View className="w-full p-4 flex-row justify-between items-center">
            <View className="w-1/5">
              <Text>이메일</Text>
            </View>
            <View className="w-4/5 flex-row justify-end items-center">
              <Text>{appUserData.email}</Text>
            </View>
          </View>
          <View className="w-full p-4 flex-row justify-between items-center">
            <View className="w-1/5">
              <Text>가입일</Text>
            </View>
            <View className="w-4/5 flex-row justify-end items-center">
              <Text>
                {dateToSeoulTime(
                  appUserData.createdAt,
                  'YYYY년 MM월 DD일 (ddd)',
                )}
              </Text>
            </View>
          </View>
          <View className="w-full p-4 mt-auto">
            <BrandOutlinedButton
              classes="w-full py-1"
              text="회원 탈퇴"
              onPress={showDialog}
            />
          </View>
        </React.Fragment>
      )}

      <MemoizedCustomAlert
        visible={visibleDialog}
        title="정말 탈퇴하시겠어요?"
        description={`탈퇴 버튼 선택 시, 계정과\n모든 데이터가 삭제되며 복구되지 않습니다.`}
        buttonText="회원 탈퇴"
        buttonOnPress={onWithdrawalAccount}
        hideAlert={hideDialog}
      />
      {isFocus && (
        <CustomBottomSheet
          ref={bottomSheetModalRef}
          snap="35%"
          title="닉네임 수정"
          contents={
            <DisplayNameBottomSheet handleClosePress={handleClosePress} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default AccountInfoScreen;
