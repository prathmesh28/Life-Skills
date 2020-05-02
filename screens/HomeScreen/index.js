import React from "react";
import { StyleSheet, Dimensions, AsyncStorage, StatusBar, ImageBackground } from "react-native";
import Home from "./components/index"
import RNUrlPreview from 'react-native-url-preview';
import { Block, Checkbox, theme } from "galio-framework";
import { Button, Input } from '../../components';
import { argonTheme } from "../../constants";
import { Searchbar } from 'react-native-paper';
import AnimatedSplash from "react-native-animated-splash-screen";
const { width, height } = Dimensions.get("screen");
import Firebase from "../../firebase"
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.Onboarding = require("../../assets/backbg.jpg")

  }

  _onChangeSearch = query => this.setState({ searchQuery: query });

  render() {
    const { searchQuery } = this.state;

    return (

      <Block flex center>
        <StatusBar hidden />

        <ImageBackground
          source={require("../../assets/backbg.jpg")}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
          blurRadius={ 1 } 
        >
          <Block middle>
            <Searchbar
              style={styles.search}
              placeholder="Search"
              onChangeText={this._onChangeSearch}
              value={searchQuery}
            />
            <Block middle>

              <Block style={styles.cards}>
                <Home />

              </Block>
            </Block>
          </Block>
        </ImageBackground>

      </Block>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginTop: width * 0.1,
    marginBottom: width * 0.07,
    borderRadius: 50,
    width: width * 0.9
  },
  cards: {
    width: width * 0.9,
    height: height * 0.79
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height,
    
  },
});
