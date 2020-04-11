import * as React from 'react';
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SavedScreen from "./screens/SavedScreen"

import { BottomNavigation, Text } from 'react-native-paper';

export default class MyComponent extends React.Component {
  state = {
    index: 2,
    routes: [
      { key: 'home', title: 'Home', icon: 'home', color: '#607D8B' },
      { key: 'heart', title: 'heart', icon: 'heart', color: '#009688' },
      { key: 'profile', title: 'profile', icon: 'face-profile', color: '#741cc7' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

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