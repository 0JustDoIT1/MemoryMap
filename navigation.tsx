import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BootSplash from 'react-native-bootsplash';

import {StackParamList} from 'src/types/stack';

import SignInScreen from 'src/screens/signIn';
import StoryScreen from 'src/screens/story';
import SettingScreen from 'src/screens/setting';
import RootScreen from 'src/screens/root';
import {useAppTheme} from 'src/style/paperTheme';
import {Pressable} from 'react-native';
import EditStoryScreen from 'src/screens/editStory';
import SelectRegionScreen from 'src/screens/selectRegion';
import ViewStoryScreen from 'src/screens/viewStory';
import DashboardScreen from 'src/screens/dashboard';
import AccountInfoScreen from 'src/screens/accountInfo';
import PinCodeSettingScreen from 'src/screens/pinCodeInit';
import PinCodeEnterScreen from 'src/screens/pinCodeEnter';
import AddStoryScreen from 'src/screens/addStory';
import {lazy, Suspense} from 'react';
import CustomActivityIndicatorScreen from 'src/components/activityIndicatorScreen';

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<StackParamList>();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

const Main = () => {
  const theme = useAppTheme();

  const LazyMapScreen = lazy(() => import('./src/screens/map'));

  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontFamily: 'GmarketSansMedium',
        },
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          height: 60,
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
      }}>
      <Tab.Screen
        name="Map"
        options={{
          tabBarIcon: ({focused, size, color}) => {
            const name = focused ? 'map' : 'map-outline';
            return (
              <MaterialCommunityIcons name={name} size={size} color={color} />
            );
          },
          headerTitle: '여행지도',
        }}>
        {props => (
          <Suspense fallback={<CustomActivityIndicatorScreen />}>
            <LazyMapScreen {...props} />
          </Suspense>
        )}
      </Tab.Screen>
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
        screenOptions={{
          headerShown: false,
          animation: 'flip',
        }}>
        <Stack.Screen name="Root" component={RootScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="AddStory"
          component={AddStoryScreen}
          options={({route}) => ({
            headerShown: true,
            headerShadowVisible: false,
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontFamily: 'GmarketSansMedium',
            },
            headerTitleAlign: 'center',
            headerTitle: '스토리 작성',
            headerBackButtonMenuEnabled: true,
          })}
        />
        <Stack.Screen
          name="EditStory"
          component={EditStoryScreen}
          options={({route}) => ({
            headerShown: true,
            headerShadowVisible: false,
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontFamily: 'GmarketSansMedium',
            },
            headerTitleAlign: 'center',
            headerTitle: '스토리 수정',
            headerBackButtonMenuEnabled: true,
          })}
        />
        <Stack.Screen
          name="ViewStory"
          component={ViewStoryScreen}
          options={({route}) => ({
            headerShown: true,
            headerShadowVisible: false,
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontFamily: 'GmarketSansMedium',
            },
            headerTitleAlign: 'center',
            headerTitle: '스토리',
            headerBackButtonMenuEnabled: true,
          })}
        />
        <Stack.Screen
          name="SelectRegion"
          component={SelectRegionScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontFamily: 'GmarketSansMedium',
            },
            headerTitleAlign: 'center',
            headerTitle: '지역 선택',
            headerBackButtonMenuEnabled: true,
            headerStyle: {backgroundColor: theme.colors.brandLight},
          }}
        />
        <Stack.Screen
          name="AccountInfo"
          component={AccountInfoScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontFamily: 'GmarketSansMedium',
            },
            headerTitleAlign: 'center',
            headerTitle: '개인/보안',
            headerBackButtonMenuEnabled: true,
            headerStyle: {backgroundColor: theme.colors.brandLight},
          }}
        />
        <Stack.Screen
          name="PinCodeSetting"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontFamily: 'GmarketSansMedium',
            },
            headerTitleAlign: 'center',
            headerTitle: '잠금화면 설정',
            headerBackButtonMenuEnabled: true,
            headerStyle: {backgroundColor: theme.colors.brandLight},
          }}
          component={PinCodeSettingScreen}
        />
        <Stack.Screen name="PinCodeEnter" component={PinCodeEnterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
