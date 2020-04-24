import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AnimatedSplash from "react-native-animated-splash-screen";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import StartScreen from "./screens/StartScreen";
import IntroScreen from "./screens/IntroScreen"
import Bottomnav from "./Bottomnav"
import SelectCat from "./screens/SelectCat"
import Loadcat from "./screens/lodcat"
import WebPage from "./screens/HomeScreen/components/WebPage"
const AuthStack = createStackNavigator({
    Start:StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    
});
const IntroPages = createStackNavigator({
    Guide: IntroScreen,
});

const Container = createAppContainer(

    createSwitchNavigator(
        {
            Intro: IntroPages,
            Loading: LoadingScreen,
            // Loading: {
            //     screen: (props) => (
            //       <LoadingScreen {...props} setAppLoaded={props.screenProps.setAppLoaded} />
            //     ),
            //   },
            Auth: AuthStack,
            Lcat:Loadcat,
            Cat:SelectCat,
            App: Bottomnav, 
            WebS:WebPage,
        },
        {
            initialRouteName: "Loading"
        }
    )
);

class App extends React.Component {
    // state = {
    //   isLoaded: false,
    // }
   
    // setAppLoaded = () => {
    //   this.setState({ isLoaded: true })
    // }
   
    render() {
      return (
        // <AnimatedSplash
        //   isLoaded={this.state.isLoaded}
        //   logoImage={require("./assets/logo.png")}
        //   backgroundColor={"#262626"}
        //   logoHeight={150}
        //   logoWidht={150}
        // >
          <Container screenProps={{ setAppLoaded: this.setAppLoaded }} />
        // </AnimatedSplash>
      )
    }
  }
   
  export default App