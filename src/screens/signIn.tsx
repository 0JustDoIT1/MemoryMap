import React from 'react';
import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignInProps} from 'src/types/stack';

const SignInScreen = ({navigation}: SignInProps) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white dark:bg-black">
      <Text className="text-black">로그인</Text>
      <Button
        title="지도"
        onPress={() => {
          navigation.replace('Main');
        }}
      />
    </SafeAreaView>
  );
};

export default SignInScreen;
