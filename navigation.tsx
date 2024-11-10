import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
import AddStory from 'src/screens/addStory';
import {launchImageLibrary} from 'react-native-image-picker';
import SelectRegion from 'src/screens/selectRegion';

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
                navigation.navigate('AddStory', {title: '스토리 작성'});
              }}>
              <FontAwesome name="pencil-square-o" size={24} color="#000000" />
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
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="CropImage"
          component={CropImage}
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
                <MaterialIcons name="refresh" size={24} color="#000000" />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="AddStory"
          component={AddStory}
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
          name="SelectRegion"
          component={SelectRegion}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
