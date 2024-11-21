import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BootSplash from 'react-native-bootsplash';

import {StackParamList} from 'src/types/stack';

import MapScreen from 'src/screens/map';
import SignInScreen from 'src/screens/signIn';
import StoryScreen from 'src/screens/story';
import SettingScreen from 'src/screens/setting';
import RootScreen from 'src/screens/root';
import {useAppTheme} from 'src/style/paperTheme';
import CropImageScreen from 'src/screens/cropImage';
import {Pressable} from 'react-native';
import EditStoryScreen from 'src/screens/editStory';
import {launchImageLibrary} from 'react-native-image-picker';
import SelectRegionScreen from 'src/screens/selectRegion';
import ViewStoryScreen from 'src/screens/viewStory';
import DashboardScreen from 'src/screens/dashboard';
import AccountInfoScreen from 'src/screens/accountInfo';
import PinCodeSettingScreen from 'src/screens/pinCodeInit';
import PinCodeEnterScreen from 'src/screens/pinCodeEnter';

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<StackParamList>();

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

const Main = () => {
  const theme = useAppTheme();

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
          height: 49,
          backgroundColor: theme.colors.brandMain,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: theme.colors.surfaceVariant,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}>
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
              className="px-4"
              onPress={() => {
                navigation.navigate('EditStory', {title: '스토리 작성'});
              }}>
              <MaterialCommunityIcons
                name="pencil-box-outline"
                size={24}
                color="#000000"
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

  const onReImagePicker = async (
    navigation: NativeStackNavigationProp<
      StackParamList,
      'CropImage',
      undefined
    >,
  ) => {
    await launchImageLibrary({
      maxWidth: 250,
      maxHeight: 250,
      mediaType: 'photo',
      quality: 0.7,
    }).then(async res => {
      if (res.assets) {
        navigation.setParams({image: res.assets[0] as string});
      }
    });
  };

  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Root" component={RootScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="CropImage"
          component={CropImageScreen}
          options={({navigation, route}) => ({
            headerShown: true,
            headerShadowVisible: false,
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontFamily: 'GmarketSansMedium',
            },
            headerTitleAlign: 'center',
            headerTitle: route.params.title,
            headerBackButtonMenuEnabled: true,
            headerRight: () => (
              <Pressable
                className="px-4"
                onPress={() => onReImagePicker(navigation)}>
                <MaterialCommunityIcons
                  name="refresh"
                  size={24}
                  color="#000000"
                />
              </Pressable>
            ),
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
            headerTitle: route.params.title,
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
