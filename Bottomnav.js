import * as React from "react";
import HomeScreen from "./screens/HomeScreen/index";
import ProfileScreen from "./screens/ProfileScreen";
import SavedScreen from "./screens/SavedScreen";
import WebViewScreen from "./screens/HomeScreen/components/WebViewScreen";
import { createAppContainer } from "react-navigation";
import { BottomNavigation, Text } from "react-native-paper";
import { createStackNavigator } from "react-navigation-stack";

export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      {
        key: "home",
        title: "Home",
        icon: "home",
        color: "#942de3",
      },
      {
        key: "heart",
        title: "Saved",
        icon: "heart",
        color: "#1699e0",
      },
      {
        key: "profile",
        title: "Profile",
        icon: "face-profile",
        color: "#b026ff",
      },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: createAppContainer(
      createStackNavigator(
        {
          home: HomeScreen,
          WebViewScreen: WebViewScreen,
        },
        {
          headerMode: "none",
        }
      )
    ),
    heart: createAppContainer(
      createStackNavigator(
        {
          SavedScreen: SavedScreen,
          WebViewScreen: WebViewScreen,
        },
        {
          headerMode: "none",
        }
      )
    ),
    profile: ProfileScreen,
  });

  render() {
    return (
      <BottomNavigation
        shifting={true}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}