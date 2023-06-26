import React from "react";
import {} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import {HomeScreen,MovieScreen} from "../src/screens/screenexports";
import HomeScreen from "../src/screens/HomeScreen";
import MovieScreen from "../src/screens/MovieScreen";
import Search from "../src/screens/Search";
import ViewAll from "../src/screens/ViewallScreen";
import Tv from "../src/screens/TvScreen";
import TvDetail from "../src/screens/TvDetailScreen";

const Stack = createStackNavigator();

export const HomeStack = ()=>{

    return(
      <Stack.Navigator
      screenOptions={{headerMode:"float"}}
      >
      <Stack.Screen
        name="Amovies"
        component={HomeScreen}
        options={{ headerShown: true ,headerTintColor:"white",headerStyle:{
          backgroundColor:"#000000d6",
        }}}
      />
      <Stack.Screen
        name="movie"
        component={MovieScreen}
        options={{ headerShown: false,headerBackground:"#222",headerTintColor:"#FFF",headerStyle:{
          elevation:5,
        }}}
        
      />
      <Stack.Screen
      name="ViewAll"
      component={ViewAll}
      options={{headerShown:false}}
      />
    </Stack.Navigator>
    )
};

export const SearchStack = ()=>{

  return(
    <Stack.Navigator>
      <Stack.Screen 
      name="search"
      component={Search}
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen 
      name="movie"
      component={MovieScreen}
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen
      name="Tvdetail"
      component={TvDetail}
      options={{
        headerShown:false
      }}
      />
    </Stack.Navigator>
  )
};

export const TvStack = ()=>{

  return(
    <Stack.Navigator>
      <Stack.Screen 
      name="Tv"
      component={Tv}
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen
      name="Tvdetail"
      component={TvDetail}
      options={{
        headerShown:false
      }}
      />
    </Stack.Navigator>
  )
}
