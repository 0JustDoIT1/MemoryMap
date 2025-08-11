import React from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TSelectRegion} from 'src/types/stack';
import CustomAccordion from 'src/components/common/accordion';
import useBackButton from 'src/hook/common/useBackButton';

const SelectRegionScreen = ({navigation, route}: TSelectRegion) => {
  const {regionList, regionMainList} = route.params;

  const onSelectRegion = (regionId: string) => {
    navigation.pop();
    navigation.navigate('AddStory', {regionId});
  };

  useBackButton(() => navigation.goBack());

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-brandLight p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      <FlatList
        className="w-full"
        data={regionMainList}
        keyExtractor={(item, index) => `${item}-${index}`}
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
