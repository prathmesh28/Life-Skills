import React from "react";
import { StyleSheet, Dimensions, ImageBackground, StatusBar, Image } from "react-native";
import { Block, Text} from "galio-framework";
import Button from '../components/Button';
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

export default class StartScreen extends React.Component {

  static navigationOptions = {
    headerShown: false
  };

  render() {
      return (
        <Block flex middle>
          <StatusBar hidden />
          <ImageBackground
            source={Images.Onboarding}
            style={{ width, height, zIndex: 1 }}>
            <Block flex middle>
              <Block style={styles.registerContainer} middle>
                <Block width={width * 0.8} middle >
                  <Image 
                      style={styles.logoimg} 
                      source={require('../assets/logo.png')} />
                </Block>
              
                <Block  width={width * 0.8} style={{ marginBottom: 15 }} middle>
                  <Block middle>
                    <Button 
                      color="primary" 
                      style={styles.login}
                      onPress={() =>this.props.navigation.navigate('Login')}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Log In
                      </Text>
                    </Button>
                  </Block>
                  <Block middle>
                    <Button 
                      color="primary" 
                      style={styles.register}
                      onPress={() => this.props.navigation.navigate('Register')}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Register
                      </Text>
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
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
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
      width: width * 0.5,
    },
    register: {
      marginTop: 25,
      color: argonTheme.COLORS.PRIMARY,
      fontWeight: "800",
      fontSize: 14,
      width: width * 0.5,
    },
  logoimg:{
    marginBottom: 100,
    width: 300,
    height: 150,
  },
});
