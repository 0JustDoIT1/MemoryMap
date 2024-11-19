import {Pressable, View} from 'react-native';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandOutlinedButton} from 'src/components/button';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {dateToSeoulTime} from 'src/utils/dateFormat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';
import React, {useEffect, useState} from 'react';
import CustomBottomSheet from 'src/components/bottomSheet';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
import MemoizedCustomAlert from 'src/components/alert';
import useDialog from 'src/hook/useDialog';
import {AccountInfoProps} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';

interface DisplayNameBottomSheet {
  handleClosePress: () => void;
}

const DisplayNameBottomSheet = ({handleClosePress}: DisplayNameBottomSheet) => {
  const {appUser, displayName, setDisplayName, onUpdateProfile} =
    useEmailAndPasswordAuth();

  useEffect(() => {
    setDisplayName(appUser?.displayName!);
  }, [appUser]);

  // 닉네임 수정
  const onUpdateDisplayName = async () => {
    await onUpdateProfile().then(() => handleClosePress());
  };

  return (
    <View className="w-full">
      <TextInput
        className="w-full bg-white"
        mode="outlined"
        label="제목"
        placeholder="(10자)"
        activeOutlineColor={customColor.brandMain}
        value={displayName}
        maxLength={10}
        onChangeText={setDisplayName}
      />
      <BrandOutlinedButton
        text="수정"
        classes="w-full mt-4 py-1"
        onPress={onUpdateDisplayName}
      />
    </View>
  );
};

const AccountInfo = ({navigation}: AccountInfoProps) => {
  const {appUser, onWithdrawal, setInitRecoil} = useEmailAndPasswordAuth();
  const {
    bottomSheetModalRef,
    snapPoints,
    bottomSheetTitle,
    bottomSheetDescription,
    bottomSheetContents,
    settingBottomSheet,
    handlePresentPress,
    handleClosePress,
    renderBackdrop,
  } = useCustomBottomSheet();
  const {visibleDialog, showDialog, hideDialog} = useDialog();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 닉네임 수정을 위한 바텀시트
  const onPressDisplayName = () => {
    settingBottomSheet({
      title: '닉네임 수정',
      contents: <DisplayNameBottomSheet handleClosePress={handleClosePress} />,
      snap: '35%',
    });
    handlePresentPress();
  };

  // 회원탈퇴
  const onWithdrawalAccount = async () => {
    setIsLoading(true);
    hideDialog();
    await onWithdrawal()
      .then(() => onWithdrawalAccountSuccess())
      .catch(error => onWithdrawalAccountError(error));
  };

  const onWithdrawalAccountSuccess = () => {
    setIsLoading(false);
    navigation.navigate('Auth');
  };

  const onWithdrawalAccountError = (error: any) => {
    setInitRecoil();
    setIsLoading(false);
    navigation.navigate('Auth');
    showBottomToast('error', '회원탈퇴 실패');
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white p-6">
      {isLoading ? (
        <View className="w-full h-full justify-center items-center">
          <ActivityIndicator animating={true} color={customColor.brandMain} />
        </View>
      ) : (
        <React.Fragment>
          <View className="w-full p-4 flex-row justify-between items-center">
            <View className="w-1/5">
              <Text>닉네임</Text>
            </View>
            <View className="w-4/5 flex-row justify-end items-center">
              <Text className="mx-2">{appUser?.displayName}</Text>
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
              <Text>{appUser?.email}</Text>
            </View>
          </View>
          <View className="w-full p-4 flex-row justify-between items-center">
            <View className="w-1/5">
              <Text>가입일</Text>
            </View>
            <View className="w-4/5 flex-row justify-end items-center">
              <Text>
                {dateToSeoulTime(appUser?.createdAt, 'YYYY년 MM월 DD일 (ddd)')}
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
      <CustomBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleClosePress={handleClosePress}
        renderBackdrop={renderBackdrop}
        title={bottomSheetTitle}
        description={bottomSheetDescription}
        contents={bottomSheetContents}
      />
    </SafeAreaView>
  );
};

export default AccountInfo;
