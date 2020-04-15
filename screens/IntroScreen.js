import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground, Image, StatusBar } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import { argonTheme } from "../constants";
import slides from "./Slides"
const { width, height } = Dimensions.get("screen");


import { Block, Button, Text, theme } from "galio-framework";

import Images from "../constants/Images";

export default class IntroScreen extends React.Component {

  static navigationOptions = {
    headerShown: false
  };
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  render() {
    if (this.state.showRealApp) {
      return (
        <Block flex style={styles.container}>
        <StatusBar hidden />
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={() =>this.props.navigation.navigate('Auth')}
          showSkipButton={true}
          onSkip={() =>this.props.navigation.navigate('Auth')}
        />
        </Block>
      );
    }else{
      return(
        <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height , width , zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.Logo} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              
              <Block center>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.INTRO}
                  onPress={() => this.setState({ showRealApp: true })}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  Get Started
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
      );
    }
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
      //fontWeight: "800",
      fontSize: 14,
      width: width * 0.5,
    },
    register: {
      marginTop: 25,
      color: argonTheme.COLORS.PRIMARY,
      //fontWeight: "800",
      fontSize: 14,
      width: width * 0.5,
    },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    padding: 10,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    //fontWeight: 'bold',
    marginTop: 50,
  },
  container: {
    backgroundColor: theme.COLORS.WHITE
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    //fontWeight: "800",
    marginTop: 60,
    fontSize: 18
  },
  logo: {
    width: 320,
    height: 170,
    zIndex: 2,
    position: 'relative',
    marginTop: '-70%'
  },
  titles: {
    marginTop:'-5%'
    
  },
  subTitle: {
    marginTop: 20
  }
});
