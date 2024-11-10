import React from 'react';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StoryProps} from 'src/types/stack';

const StoryScreen = ({navigation}: StoryProps) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-2">
      <Text>나만의 여행 스토리</Text>
    </SafeAreaView>
  );
};

export default StoryScreen;
