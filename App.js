import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from './src/screens/HomeScreen';
import Search from './src/screens/Search';
import {HomeStack,SearchStack,TvStack} from "./Navigator/Stack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tv from "./src/screens/TvScreen";


const Tab = createMaterialBottomTabNavigator();

// const Tab = createBottomTabNavigator()

export default function App () {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    Black: require("./assets/fonts/NunitoSans-Black.ttf"),
    ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    Light: require("./assets/fonts/NunitoSans-Light.ttf"),
    SemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
  });

  // return <HomeScreen />

  return fontLoaded ? (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FFFFFF"
      inactiveColor="#064ee3"
      barStyle={{ backgroundColor: '#111' }}
      >
            <Tab.Screen name="Home" component={HomeStack} 
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
            />
            <Tab.Screen name="Search" component={SearchStack}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="database-search-outline" color={color} size={26} />
              ),
            }}
            />
            <Tab.Screen name="TV" component={TvStack}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="youtube-tv" color={color} size={26} />
              ),
            }}
            />
            {/* <Tab.Screen name="profile" component={HomeScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="face-man-profile" color={color} size={26} />
              ),
            }}
            /> */}
        </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
};
