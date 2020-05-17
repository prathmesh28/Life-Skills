import React from "react" 
import { StyleSheet, Dimensions, StatusBar, ImageBackground } from "react-native" 
import Home from "./components/index"
import { Block, Text } from "galio-framework" 
const { width, height } = Dimensions.get("screen") 
import Constants from 'expo-constants' 

export default class HomeScreen extends React.Component {
  async componentDidMount() {
    this.Onboarding = require("../../assets/backbg.jpg")
  }

  render() {
    return (
      <Block flex center>
        <StatusBar 
          translucent={true} 
          backgroundColor={'transparent'} 
        />
       
        <ImageBackground
          source={require("../../assets/backbg.jpg")}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block style={{ 
            backgroundColor:'#1699e0', 
            height: height*0.1, 
            paddingTop: Constants.statusBarHeight,
            justifyContent:'center'
            }}>
          
            <Text style={{ 
              fontWeight: 'bold',
              fontSize: 24,
              position:'relative',
              color:'#fff',
              letterSpacing:1,
              textAlign:'center',
              textShadowColor:'black',
              textShadowOffset:{width: 0, height: 0},
              textShadowRadius:20, 
              }}>Life Skills</Text>
          </Block>

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
  cards: {
    width: width * 0.9,
    height: height * 0.85,
   
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
  }
})
