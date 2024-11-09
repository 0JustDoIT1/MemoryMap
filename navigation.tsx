import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import BootSplash from 'react-native-bootsplash';

import {StackParamList} from 'src/types/stack';

import MapScreen from 'src/screens/map';
import SignInScreen from 'src/screens/signIn';
import StoryScreen from 'src/screens/story';
import SettingScreen from 'src/screens/setting';
import Root from 'src/screens/root';
import {useAppTheme} from 'src/style/paperTheme';
import CropImage from 'src/screens/cropImage';
import {Pressable} from 'react-native';

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
        headerTitle: 'MemoryMap',
        tabBarStyle: {
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
            const name = focused ? 'image' : 'image-outline';
            return <Ionicons name={name} size={size} color={color} />;
          },
          // tabBarLabel: '여행지도',
        }}
      />
      <Tab.Screen
        name="Story"
        component={StoryScreen}
        options={({navigation}) => ({
          tabBarIcon: ({focused, size, color}) => {
            const name = focused ? 'book' : 'book-outline';
            return <Ionicons name={name} size={size} color={color} />;
          },
          headerRight: () => (
            <Pressable
              className="px-4"
              onPress={() => {
                navigation.navigate('');
              }}>
              <Entypo name="pencil" size={20} color="#000000" />
            </Pressable>
          ),
          // tabBarLabel: '스토리',
        })}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            const name = focused ? 'options' : 'options-outline';
            return <Ionicons name={name} size={size} color={color} />;
          },
          // tabBarLabel: '설정',
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
        <Stack.Screen
          name="CropImage"
          component={CropImage}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
