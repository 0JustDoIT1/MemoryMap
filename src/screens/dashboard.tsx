import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useDashboard from 'src/hook/useDashboard';
import useExitApp from 'src/hook/common/useExitApp';
import {TDashboard} from 'src/types/stack';
import LoadingScreen from './loadingScreen';
import DashboardCard from 'src/components/dashboard/dashboardCard';
import DashboardHero from 'src/components/dashboard/dashboardHero';

const DashboardScreen = ({navigation}: TDashboard) => {
  const {
    koreaMapRegionCount,
    mapData,
    storyData,
    isLoadingAny,
    isErrorAny,
    percent,
    visitedTotal,
    dashboardCardsList,
  } = useDashboard();
  useExitApp();

  if (isErrorAny) {
    return null;
  }

  if (isLoadingAny) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white"
      edges={['bottom', 'left', 'right']}>
      {mapData && storyData && (
        <>
          <DashboardHero
            visitedTotal={visitedTotal}
            totalRegions={koreaMapRegionCount}
            percent={percent}
            photo={mapData.photo}
            color={mapData.color}
            storyCount={storyData.count}
            navigation={navigation}
          />

          <View className="w-full h-3/5 flex justify-center px-8 mt-4">
            {dashboardCardsList.map(card => (
              <DashboardCard
                key={card.title}
                title={card.title}
                value={card.value}
                region={card.region}
                othersCount={card.others}
              />
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;
