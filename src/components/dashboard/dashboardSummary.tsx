// components/dashboard/summaryStrip.tsx
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

interface IDashboardSummary {
  photo: number;
  color: number;
  story: number;
}

const Divider = () => (
  <View className="h-5/6 mx-3 border-r-[0.5px] border-gray-400" />
);

const SummaryItem = ({label, value}: {label: string; value: number}) => (
  <View className="flex items-center mx-6">
    <Text className="text-sm text-brandMain">{label}</Text>
    <Text className="text-xl text-gray-500 mt-[0.5px]">{value}</Text>
  </View>
);

const DashboardSummary = ({photo, color, story}: IDashboardSummary) => (
  <View className="absolute bottom-[-32] w-full h-16 flex-row justify-center items-center bg-white rounded-lg shadow shadow-black">
    <SummaryItem label="사진" value={photo} />
    <Divider />
    <SummaryItem label="색상" value={color} />
    <Divider />
    <SummaryItem label="스토리" value={story} />
  </View>
);

export default React.memo(DashboardSummary);
