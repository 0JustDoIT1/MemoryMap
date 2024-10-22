import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import BootSplash from 'react-native-bootsplash';

import {BottomTabStackParamList, RootStackParamList} from 'src/types/stack';

import MapScreen from 'src/screens/map';
import SignInScreen from 'src/screens/signIn';
import StoryScreen from 'src/screens/story';
import SettingScreen from 'src/screens/setting';
import Root from 'src/screens/root';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabStackParamList>();

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
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: true,
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerTitle: 'PhotoMap',
        tabBarStyle: {
          backgroundColor: '#ffffff',
        },
        tabBarActiveTintColor: '#0000ff',
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <FontAwesome name="picture-o" size={size} color={color} />
          ),
          tabBarLabel: '여행지도',
        }}
      />
      <Tab.Screen
        name="Story"
        component={StoryScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Entypo name="book" size={size} color={color} />
          ),
          tabBarLabel: '스토리',
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <FontAwesome name="gear" size={size} color={color} />
          ),
          tabBarLabel: '설정',
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
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
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
