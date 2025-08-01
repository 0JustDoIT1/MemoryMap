import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BootSplash from 'react-native-bootsplash';

import {StackParamList} from 'src/types/stack';

import StoryScreen from 'src/screens/story';
import SettingScreen from 'src/screens/setting';
import RootScreen from 'src/screens/root';
import {useAppTheme} from 'src/style/paperTheme';
import {Pressable} from 'react-native';
import EditStoryScreen from 'src/screens/editStory';
import SelectRegionScreen from 'src/screens/selectRegion';
import ViewStoryScreen from 'src/screens/viewStory';
import DashboardScreen from 'src/screens/dashboard';
import PinCodeSettingScreen from 'src/screens/pinCodeSetting';
import PinCodeEnterScreen from 'src/screens/pinCodeEnter';
import AddStoryScreen from 'src/screens/addStory';
import BackUpScreen from 'src/screens/backup';
import BackButton from 'src/components/common/backButton';
import MapTextSettingScreen from 'src/screens/mapTextSetting';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MapScreen from './src/screens/map';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import type {AppTheme} from 'src/style/paperTheme';
import type {EdgeInsets} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<StackParamList>();

// Tab Navigator 공통 옵션
const tabScreenOptions = (
  theme: AppTheme,
  insets: EdgeInsets,
): BottomTabNavigationOptions => ({
  headerShown: true,
  headerShadowVisible: false,
  headerTintColor: '#000000',
  headerTitleStyle: {
    fontFamily: 'GmarketSansMedium',
  },
  headerTitleAlign: 'center',
  tabBarStyle: {
    backgroundColor: theme.colors.white,
    paddingBottom: insets.bottom,
    height: 60 + insets.bottom,
    elevation: 2,
  },
  tabBarItemStyle: {
    height: 60,
    paddingTop: 10,
  },
  tabBarActiveTintColor: theme.colors.brandMain,
  tabBarInactiveTintColor: theme.colors.darkGray,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  animation: 'shift',
});

// Stack Navigator 공통 옵션
const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  headerShadowVisible: false,
  headerTintColor: '#000000',
  headerTitleStyle: {
    fontFamily: 'GmarketSansMedium',
  },
  headerTitleAlign: 'center',
  animation: 'flip',
};

const Main = () => {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={tabScreenOptions(theme, insets)}>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            const name = focused ? 'map' : 'map-outline';
            return (
              <MaterialCommunityIcons name={name} size={size} color={color} />
            );
          },
          headerTitle: '여행지도',
        }}
      />
      <Tab.Screen
        name="Story"
        component={StoryScreen}
        options={({navigation}) => ({
          tabBarIcon: ({focused, size, color}) => {
            const name = focused ? 'book' : 'book-outline';
            return (
              <MaterialCommunityIcons name={name} size={size} color={color} />
            );
          },
          headerRight: () => (
            <Pressable
              className="px-6"
              onPress={() => {
                navigation.navigate('AddStory', {});
              }}>
              <MaterialCommunityIcons
                name="pencil-box-outline"
                size={28}
                color={theme.colors.darkGray}
              />
            </Pressable>
          ),
          headerTitle: '스토리',
        })}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => {
            const name = focused ? 'view-dashboard' : 'view-dashboard-outline';
            return (
              <MaterialCommunityIcons name={name} size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            const name = focused ? 'cog' : 'cog-outline';
            return (
              <MaterialCommunityIcons name={name} size={size} color={color} />
            );
          },
          headerTitle: '설정',
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const theme = useAppTheme();

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={stackScreenOptions}>
        <Stack.Screen name="Root" component={RootScreen} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="AddStory"
          component={AddStoryScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '스토리 작성',
            headerLeft: () => (
              <BackButton
                navigation={navigation}
                color={theme.colors.darkGray}
              />
            ),
          })}
        />
        <Stack.Screen
          name="EditStory"
          component={EditStoryScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '스토리 수정',
            headerLeft: () => (
              <BackButton
                navigation={navigation}
                color={theme.colors.darkGray}
              />
            ),
          })}
        />
        <Stack.Screen
          name="ViewStory"
          component={ViewStoryScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '스토리',
            headerLeft: () => (
              <BackButton
                navigation={navigation}
                color={theme.colors.darkGray}
              />
            ),
          })}
        />
        <Stack.Screen
          name="SelectRegion"
          component={SelectRegionScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTintColor: '#ffffff',
            headerTitle: '지역 선택',
            headerStyle: {backgroundColor: theme.colors.brandLight},
            headerLeft: () => (
              <BackButton
                navigation={navigation}
                color={theme.colors.darkGray}
              />
            ),
          })}
        />
        <Stack.Screen
          name="PinCodeSetting"
          component={PinCodeSettingScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTintColor: '#ffffff',
            headerTitle: '잠금화면 설정',
            headerStyle: {backgroundColor: theme.colors.brandLight},
            headerLeft: () => (
              <BackButton navigation={navigation} color={theme.colors.white} />
            ),
          })}
        />
        <Stack.Screen name="PinCodeEnter" component={PinCodeEnterScreen} />
        <Stack.Screen
          name="BackUp"
          component={BackUpScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '',
            headerLeft: () => (
              <BackButton
                navigation={navigation}
                color={theme.colors.darkGray}
              />
            ),
          })}
        />
        <Stack.Screen
          name="MapTextSetting"
          component={MapTextSettingScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: '지역명 표시',
            headerLeft: () => (
              <BackButton
                navigation={navigation}
                color={theme.colors.darkGray}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
