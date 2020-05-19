import * as React from "react";
import HomeScreen from "./screens/HomeScreen/index";
import ProfileScreen from "./screens/ProfileScreen";
import SavedScreen from "./screens/SavedScreen";
import { BottomNavigation, Text } from "react-native-paper";
 
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
      home: HomeScreen,
      heart: SavedScreen,
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