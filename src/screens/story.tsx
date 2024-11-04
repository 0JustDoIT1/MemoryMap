import React from 'react';
import {Image} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StoryProps} from 'src/types/stack';

const StoryScreen = ({navigation}: StoryProps) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-black">
      <Text>스토리</Text>
      <Image
        width={100}
        height={100}
        source={{
          uri: 'https://reactjs.org/logo-og.png',
        }}
      />
    </SafeAreaView>
  );
};

export default StoryScreen;
