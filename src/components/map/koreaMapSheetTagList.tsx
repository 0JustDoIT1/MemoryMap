// components/map/koreaMapTagList.tsx
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {IKoreaRegionData} from 'src/types/koreaMap';

interface IKoreaMapSheetTagList {
  regionData: IKoreaRegionData;
}

const KoreaMapSheetTagList = ({regionData}: IKoreaMapSheetTagList) => {
  const tagList = useMemo(() => {
    return regionData.title === regionData.main
      ? []
      : [regionData.main, regionData.title];
  }, [regionData]);

  return (
    <View className="w-full flex-row justify-start items-center mb-8">
      {tagList.map(item => (
        <Text
          key={item}
          className="py-1 px-2 mr-1 text-xs text-outline text-center border border-outline rounded-xl">
          {item}
        </Text>
      ))}
      {regionData.type !== 'init' && (
        <Text className="py-1 px-2 mr-1 text-xs text-outline text-center border border-outline rounded-xl">
          # 스토리 {regionData.story}건
        </Text>
      )}
    </View>
  );
};

export default KoreaMapSheetTagList;
