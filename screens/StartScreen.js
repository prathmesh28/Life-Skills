import React from "react";
import { StyleSheet, Dimensions, ImageBackground, StatusBar, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button, Icon } from '../components';
import { argonTheme } from "../constants";
import * as Google from "expo-google-app-auth";
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';
const { width, height } = Dimensions.get("screen");

Facebook.initializeAsync('2926256467492608', 'Life Skill')


export default class StartScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  componentWillMount() {
    this.Onboarding = require("../assets/backbg.jpg")
    this.logo = require('../assets/skills.png')
}


  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }


  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.

        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.

        firebase.auth().signInWithCredential(credential)
          .then(function (result) {
            console.log('user signed in');

            if (result.additionalUserInfo.isNewUser) {
              console.log('new user');

              let topiclist = "new"
              firebase
                .database()
                .ref('/UsersList/' + result.user.uid)
                .set({
                  email: result.user.email,
                  name: result.additionalUserInfo.profile.given_name,
                 topiclist
                })

            } else {
              firebase
                .database()
                .ref('/UsersList/' + result.user.uid).update({ last_logged_in: Date.now() })
            }

          }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId: '1092057614213-1qf6oho4vdi2aiqm5b46vdce09sl6nje.apps.googleusercontent.com',
        iosClientId: '1092057614213-immhnu3nt79fvhmq1st8dl32qlk6o352.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      console.log(result)
      if (result.type === 'success') {
        console.log('google sucess')
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

    loginWithFacebook = async () => {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync
        ('2926256467492608', { permissions: ['public_profile'] })

      if (type == 'success') {

        const credential = await firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInWithCredential(credential).then(function (result) {
          console.log(result.additionalUserInfo, result.additionalUserInfo.profile)


          if (result.additionalUserInfo.isNewUser) {

            let topiclist = "new"
            firebase
              .database()
              .ref('/UsersList/' + result.user.uid)
              .set({
                gmail: result.user.email,
                first_name: result.additionalUserInfo.profile.given_name,
                topiclist
              })

          } else {
            firebase
              .database()
              .ref('/UsersList/' + result.user.uid).update({ last_logged_in: Date.now() })
          }
        }).catch(error => {
          console.log(error);
        })
      }

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
                      onPress={() => this.loginWithFacebook()}>
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
                      onPress={() => this.signInWithGoogleAsync()}>
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
