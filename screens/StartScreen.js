import React from "react";
import { StyleSheet, Dimensions, ImageBackground, StatusBar, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Icon } from '../components';
import { argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

export default class StartScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  componentWillMount() {
    const Onboarding = require("../assets/backbg.jpg")
    const logo = require('../assets/skills.png')
}

  render() {
      return (
        <Block flex middle>
          <StatusBar hidden />
          <ImageBackground
            source={this.Onboarding}
            style={{ width, height, zIndex: 1 }}>
            <Block flex middle>
              <Block style={styles.registerContainer} middle>
                <Block width={width * 0.8} middle >
                   <Image 
                      style={styles.logoimg} 
                      source={this.logo} /> 
                </Block>
                <Block middle width={width * 0.8} style={{position:"relative" ,top:-60}}>
                  <Text style={{fontSize:22, fontWeight:"bold", textAlign: 'justify', lineHeight: 50,}}>
                    Welcome to Life Skills</Text>
                  <Text center style={{fontSize:17, }}>
                    A platform that provides you with a variety of topics to learn from and life hacks to make your lifestyle more productive and organized.
                  </Text>
                </Block>
                <Block row width={width * 0.8} style={{ marginBottom: 15 }} middle>
                  <Block style={{ margin: 10 }}>
                    <Button 
                      color="primary" 
                      style={styles.login}
                      onPress={() =>this.props.navigation.navigate('Login')}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Log In
                      </Text>
                    </Button>
                  </Block>
                  <Block style={{ margin: 10 }}>
                    <Button 
                      color="intro" 
                      style={styles.register}
                      onPress={() => this.props.navigation.navigate('Register')}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Register
                      </Text>
                    </Button>
                  </Block>
                </Block>
                <Block flex={0.15} middle style={styles.socialConnect}>
                <Text center color="#8898AA" size={12} style={{lineHeight:30, marginTop:-30}}>
                  OR{"\n"}
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30,backgroundColor:"#3b5998" }}
                    onPress={() => this.signInWithGoogleAsync}>
                    <Block row>
                      <Icon
                        name="logo-facebook"
                        family="Ionicon"
                        size={14}
                        color={"white"}
                        style={{ marginTop: 2, marginRight: 5 }}/>
                      <Text style={styles.socialTextButtons}>FACEBOOK</Text>
                    </Block>
                  </Button>
                  <Button style={{...styles.socialButtons, backgroundColor:"#db4a39"}}
                      onPress={() => this.signInWithGoogleAsync}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"white"}
                        style={{ marginTop: 2, marginRight: 5 }}/>
                      <Text style={{...styles.socialTextButtons, color:"white"}}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      );
  }
}
const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.9,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
    login: {
      color: argonTheme.COLORS.PRIMARY,
      fontWeight: "800",
      fontSize: 14,
      width: width * 0.3,
    },
    register: {
      color: argonTheme.COLORS.INTRO,
      fontWeight: "800",
      fontSize: 14,
      width: width * 0.3,
    },
  logoimg:{
    top:-100,
    width: 180,
    height: 180,
  },
  socialConnect: {
    backgroundColor: "#f0f0f0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    position:"absolute",
    borderColor: "#8898AA",
    width: width * 0.9,
    height: height * 0.16,
    bottom:0,
    position:"absolute"
  },
  pass: {
    
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "black",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.WHITE,
    fontWeight: "800",
    fontSize: 14
  },
});
