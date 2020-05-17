import React from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView, LayoutAnimation, AsyncStorage } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Icon, Input } from '../components';
import { argonTheme } from "../constants";
import Firebase from '../firebase';
import Loader from './Loadergif'
import Modal from 'react-native-modal';
const { width, height } = Dimensions.get("screen");

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  
  state = {
    email: '',
    password: '',
    errorMessage: null,
    loading: false,
    pass: false
  };
  componentDidMount() {
    this.Onboarding = require("../assets/backbg.jpg")
    AsyncStorage.getItem('email').then((value) => this.setState({ 'email': value }))
  }
  toggleModal = () => {
    this.setState({pass: true});
   // console.log(this.state.pass)
  };
  handlePasswordReset = async (values, actions) => {
    const { email } = this.state;
    ///const { email } = values
 //   console.log(email)
    try {
      Firebase.auth().sendPasswordResetEmail(email)
    //  console.log('Password reset email sent successfully')
    } catch (error) {
   //   console.log('general', error.message)
     // actions.setFieldError('general', error.message)
    }
    this.setState({passs: false});
  }

  handleLogin = () => {
    this.setState({
      loading: true
    })
    const { email, password } = this.state;
    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
    AsyncStorage.setItem('email', email);
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 2500);
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={this.Onboarding}
          style={{ width, height, zIndex: 1 }}>
          <Loader loading={this.state.loading} />

          <Modal isVisible={this.state.pass} onBackdropPress={() => this.setState({pass: false})}>
                <Block center style={styles.activityIndicatorWrapper}>
                  <Text style={{ fontSize: 25, fontWeight: "600" }}>
                    Reset Password
                  </Text>
                  <Input
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    iconName='ios-mail'
                    iconColor='#2C384A'
                    style={{width:width*0.7}}
                  />
                  <TouchableOpacity onPress={this.handlePasswordReset}>
                    <Text>Send Email</Text>
                  </TouchableOpacity>
                </Block>
              </Modal>

          <Block flex middle>
            
            <Block style={styles.registerContainer}>
              <Block middle>
                <Text style={styles.titletxt}>Login</Text>
              </Block>

              

              <Block flex>
                <Block flex={0.17} middle>
                  <Block flex={0.27} row style={styles.errorMessage}>
                    {this.state.errorMessage && (<Text style={styles.error}>{this.state.errorMessage}</Text>)}
                  </Block>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons} />
                        } />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        secureTextEntry
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons} />
                        } />
                    </Block>
                    <Block middle>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={this.handleLogin}
                        disabled={this.state.check}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          LOG IN
                        </Text>
                      </Button>
                    </Block>

                    <Block>
                    <TouchableOpacity onPress={this.toggleModal}
                      style={{ elevation: 0, marginVertical:45,margin:10 }}
                      color="transparent">
                      <Text style={{ color: argonTheme.COLORS.PRIMARY,
                        fontSize: 14,
                        fontWeight:'bold'
                         }}>Forget Password ?</Text>
                    </TouchableOpacity>
                    </Block>

                  </KeyboardAvoidingView>
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
    height: height * 0.6,
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
  titletxt: {
    marginTop: 60,
    fontSize: 45,
    fontWeight: "600"

  },
  inputIcons: {
    marginRight: 12
  },
  createButton: {
    width: width * 0.5,
    marginTop: 30
  },
  errorMessage: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
  
    height:height*0.3,
    width: width*0.8,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});