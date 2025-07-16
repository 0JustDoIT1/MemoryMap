import React from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectRegionProps} from 'src/types/stack';
import CustomAccordion from 'src/components/common/accordion';
import useBackButton from 'src/hook/useBackButton';

const SelectRegionScreen = ({navigation, route}: SelectRegionProps) => {
  const regionList = route.params.regionList;
  const regionMainList = route.params.regionMainList;

  const onSelectRegion = (value: string) => {
    navigation.pop();
    navigation.navigate('AddStory', {regionId: value});
  };

  useBackButton(() => navigation.goBack());

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-brandLight p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      <FlatList
        className="w-full"
        data={regionMainList}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <CustomAccordion
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
