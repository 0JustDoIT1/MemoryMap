import React from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import MemoizedAccordion from 'src/components/accordion';
import {SelectRegionProps} from 'src/types/stack';

const SelectRegionScreen = ({navigation, route}: SelectRegionProps) => {
  const {regionList, regionMain} = useKoreaMap();

  const onSelectRegion = (value: string) => {
    navigation.navigate('EditStory', {title: '스토리 작성', id: value});
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-brandLight p-6">
      <FlatList
        className="w-full"
        data={regionMain}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <MemoizedAccordion
            title={item}
            item={regionList}
            onSelect={onSelectRegion}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SelectRegionScreen;
