import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import StartScreen from "./screens/StartScreen";
import IntroScreen from "./screens/IntroScreen"
import Bottomnav from "./Bottomnav"
import SelectCat from "./screens/SelectCat"
const AuthStack = createStackNavigator({
    Start:StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Cat:SelectCat
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
            App: Bottomnav, 
        },
        {
            initialRouteName: "Loading"
        }
    )
);
