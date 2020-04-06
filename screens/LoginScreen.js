import React from "react";
import { StyleSheet, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView, LayoutAnimation, AsyncStorage } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Icon, Input } from '../components';
import { Images, argonTheme } from "../constants";
import Firebase from '../firebase';

const { width, height } = Dimensions.get("screen");

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  state = {
    email: '',
    password: '',
    errorMessage: null,
  };
  componentDidMount = () => AsyncStorage.getItem('email').then((value) => this.setState({ 'email': value }))

  handleLogin = () => {
    const { email, password } = this.state;

    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
    AsyncStorage.setItem('email', email);
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.Onboarding}
          style={{ width, height, zIndex: 1 }}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.35} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-facebook"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}/>
                      <Text style={styles.socialTextButtons}>FACEBOOK</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}/>
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>

              <Block flex>
                <Block flex={0.37} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                  <Block row flex={0.27} style={styles.errorMessage}>
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
                            style={styles.inputIcons}/>
                        }/>
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
                            style={styles.inputIcons}/>
                        }/> 
                    </Block>
                    <Block middle>
                      <Button 
                        color="primary" 
                        style={styles.createButton}
                        onPress={this.handleLogin}
                        disabled={this.state.check}> 
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
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
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
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
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
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
  }
});