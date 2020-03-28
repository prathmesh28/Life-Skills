import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground, Image } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import { Block, Checkbox, Text, theme } from "galio-framework";
import Button from '../components/Button';
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");

export default class StartScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
      };
      constructor(props) {
        super(props);
        this.state = {
          showRealApp: false,
          //To show the main page of the app
        };
      }
      _onDone = () => {
        this.setState({ showRealApp: true });
      };
      _onSkip = () => {
        this.setState({ showRealApp: true });
      };
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
        //If false show the Intro Slides
        if (this.state.showRealApp) {
          //Real Application
          return (
            <Block flex middle>
            
            <ImageBackground
              source={Images.RegisterBackground}
              style={{ width, height, zIndex: 1 }}
            >
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
        } else {
          //Intro slides
          return (
            <AppIntroSlider
              slides={slides}
              renderItem={this._renderItem}
              onDone={this._onDone}
              showSkipButton={true}
              onSkip={this._onSkip}
            />
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
      image: {
        width: 200,
        height: 200,
      },
      logoimg:{
        marginBottom: 100,
        width: 300,
        height: 150,
      },
      text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 30,
      },
      title: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
      },
    });
    
    const slides = [
      {
        key: 's1',
        text: 'Best Recharge offers',
        title: 'Mobile Recharge',
        image: {
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
        },
        backgroundColor: '#20d2bb',
      },
      {
        key: 's2',
        title: 'Flight Booking',
        text: 'Upto 25% off on Domestic Flights',
        image: {
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
        },
        backgroundColor: '#febe29',
      },
      {
        key: 's3',
        title: 'Great Offers',
        text: 'Enjoy Great offers on our all services',
        image: {
          uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
        },
        backgroundColor: '#22bcb5',
      },
      {
        key: 's4',
        title: 'Best Deals',
        text: ' Best Deals on all our services',
        image: {
          uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
        },
        backgroundColor: '#3395ff',
      },
      {
        key: 's5',
        title: 'Bus Booking',
        text: 'Enjoy Travelling on Bus with flat 100% off',
        image: {
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
        },
        backgroundColor: '#f6437b',
      },
      {
        key: 's6',
        title: 'Train Booking',
        text: ' 10% off on first Train booking',
        image: {
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
        },
        backgroundColor: '#febe29',
      },
    ];