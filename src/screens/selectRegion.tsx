import React from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import MemoizedAccordion from 'src/components/accordion';
import {SelectRegionProps} from 'src/types/stack';

const SelectRegionScreen = ({navigation}: SelectRegionProps) => {
  const {regionList, regionMain} = useKoreaMap();

  const onSelectRegion = (value: string) => {
    navigation.navigate('AddStory', {regionId: value});
  };

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-brandLight px-6"
      edges={['top', 'bottom', 'left', 'right']}>
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
