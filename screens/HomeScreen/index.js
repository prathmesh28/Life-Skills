import React from "react";
import { StyleSheet, Dimensions, StatusBar, ImageBackground } from "react-native";
import Home from "./components/index"
import { Block } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import Constants from 'expo-constants';
export default class HomeScreen extends React.Component {
  

  componentDidMount() {
    this.Onboarding = require("../../assets/backbg.jpg")
  
  }


  render() {
  
    return (

      <Block flex center>
        <StatusBar 
        translucent={true} 
        backgroundColor={'transparent'} />

        <ImageBackground
          source={require("../../assets/backbg.jpg")}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block middle>
            
              <Block style={styles.cards}>
                <Home />
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
    height: height * 0.85,
    marginTop: Constants.statusBarHeight
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
