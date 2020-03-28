import React from "react";
import { View, Text, StyleSheet, TouchableOpacity , Image } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';

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
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.button1} 
                    onPress={() =>this.props.navigation.navigate('Login')}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>
                        Log In
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button2} 
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
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
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        button1: {
            width: 200,
            marginTop:10,
            marginHorizontal: 30,
            backgroundColor: '#005ce6',
            borderRadius: 4,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
          },
          button2: {
            width: 200,
            marginTop:10,
            marginHorizontal: 30,
            backgroundColor: '#005ce6',
            borderRadius: 4,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
          },
      image: {
        width: 200,
        height: 200,
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