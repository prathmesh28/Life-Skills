import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import StartScreen from "./screens/StartScreen";
import IntroScreen from "./screens/IntroScreen"

const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
            }
        },
        
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "#161F3D",
            inactiveTintColor: "#B8BBC4",
            showLabel: false
        }
    }
);

const AuthStack = createStackNavigator({
    Start:StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen
});
const IntroPages = createStackNavigator({
    Guide: IntroScreen,
});
export default createAppContainer(

    createSwitchNavigator(
        {
            Intro: IntroPages,
            Loading: LoadingScreen,
            Auth: AuthStack,
            App: AppTabNavigator, 
        },
        {
            initialRouteName: "Loading"
        }
    )
);
