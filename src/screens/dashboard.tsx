import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DashboardProps} from 'src/types/stack';

const DashboardScreen = ({navigation}: DashboardProps) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white p-2"></SafeAreaView>
  );
};

export default DashboardScreen;
