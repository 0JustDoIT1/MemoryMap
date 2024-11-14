import React, {useMemo} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import MemoizedAccordion from 'src/components/accordion';
import {SelectRegionProps} from 'src/types/stack';

const SelectRegion = ({navigation, route}: SelectRegionProps) => {
  const {koreaMapData, getColorRegionList} = useKoreaMap();

  const regionList = useMemo(() => getColorRegionList(), [koreaMapData]);

  const regionMain = useMemo(
    () => Object.keys(getColorRegionList()).sort(),
    [koreaMapData],
  );

  const onSelectRegion = (value: string) => {
    navigation.navigate('AddStory', {title: '스토리 작성', region: value});
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-brandLight p-6">
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
      />
    </SafeAreaView>
  );
};

export default SelectRegion;
