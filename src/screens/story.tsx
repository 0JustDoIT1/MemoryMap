import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {StoryProps} from 'src/types/stack';

const StoryScreen = ({navigation}: StoryProps) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-red-300 dark:bg-black">
      <Text>스토리</Text>
    </SafeAreaView>
  );
};

export default StoryScreen;
