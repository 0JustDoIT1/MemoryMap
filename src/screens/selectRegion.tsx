import React, {useMemo} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import Accordion from 'src/components/accordion';

const SelectRegion = () => {
  const {koreaMapData, getColorRegionList} = useKoreaMap();

  const regionList = useMemo(() => getColorRegionList(), [koreaMapData]);

  const regionMain = useMemo(
    () => Object.keys(getColorRegionList()).sort(),
    [koreaMapData],
  );

  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-brandLight p-6">
      <FlatList
        className="w-full"
        data={regionMain}
        keyExtractor={item => item}
        renderItem={({item}) => <Accordion title={item} item={regionList} />}
      />
    </SafeAreaView>
  );
};

export default SelectRegion;
