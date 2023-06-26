import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import {HomeScreen,Search} from "../src/screens/screenexports";
import HomeStack from "./Stack";
import Search from "../src/screens/Search";
import HomeScreen from "../src/screens/HomeScreen";


const Tab = createMaterialBottomTabNavigator();

const Tabs = ()=>{

    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Search" component={Search}/>
            <Tab.Screen name="TV" component={Search}/>
            <Tab.Screen name="profile" component={HomeScreen}/>
        </Tab.Navigator>
    )


};


export default Tabs; 