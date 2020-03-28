import React from "react";
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView 
  } from "react-native";
  import { Block, Checkbox, Text, theme } from "galio-framework";
  
  import Button from '../components/Button';
  import Icon from "../components/Icon";
  import Input from "../components/Input";
  import { Images, argonTheme } from "../constants";
  const { width, height } = Dimensions.get("screen");

  import PassMeter from "react-native-passmeter";
import Firebase from '../firebase';


const MAX_LEN = 15,
MIN_LEN = 6,
PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    state = { name: "", email: "", password: "", check: false, errorMessage: null }
    handleSignUp = () => {
        console.log(this.state.check)
        Firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    
    render() {
        return (
            <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
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
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
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
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
              <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                  <Block flex={0.27} row style={styles.errorMessage}>
                  {this.state.errorMessage && (
                  <Text style={styles.error}>{this.state.errorMessage}</Text>
                  )}
                
                </Block>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >

                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Name"
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
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
                            style={styles.inputIcons}
                          />
                        }
                      />
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
                            style={styles.inputIcons}
                          />
                        }
                      />
                      <PassMeter 
                                  showLabels
                                  password={this.state.password}
                                  maxLength={MAX_LEN}
                                  minLength={MIN_LEN}
                                  labels={PASS_LABELS}
                                />
                         </Block>
                   
                    <Block row width={width * 0.75}>
                      <Checkbox
                         
                        onChange={ () => this.setState({check: !this.state.check}) }
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                      />
                      <Button
                        style={{ width: 100 , elevation: 0}}
                        color="transparent"
                        
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 14
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Block>
                    <Block middle>
                      <Button 
                        color="primary" 
                        style={styles.createButton}
                        onPress={this.handleSignUp}
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
      flex: 0.5, justifyContent: "center"
    },
    createButton: {
      width: width * 0.5,
      marginTop: 25
    },
    errorMessage: {
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
  
  ///export default Register;
  