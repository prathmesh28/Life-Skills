import React  from "react";
import { StyleSheet, ImageBackground, Dimensions, StatusBar, KeyboardAvoidingView, AsyncStorage } from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Button, Icon, Input } from '../components';
import { Images, argonTheme } from "../constants";
import Firebase from '../firebase';

import RNPasswordStrengthMeter, { TextPasswordStrengthDisplay } from 'react-native-password-strength-meter';

const { width, height } = Dimensions.get("screen");


export default class RegisterScreen extends React.Component {
  static navigationOptions = {
      headerShown: false
  };

  state = { name: "", email: "", password: "", check: false, errorMessage: null }

// handleText = e => {
//    //console.log(e)
//     this.setState({
//         name: e
//     })
// }
//  handleSubmit = e => {
//     let uname=Firebase.database().ref('name').orderByKey().limitToLast(100);
//     Firebase.database().ref('name').push(this.state.name);
//     this.setState({
//         name:""
//     })
// }
  
  handleSignUp = () => {
    let name=this.state.name
    let email=this.state.email
    let topiclist= "new"
      Firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(userCredentials => {
           // console.log(userCredentials);
            userCredentials.user.updateProfile({displayName: this.state.name});
           
            Firebase.database().ref('UsersList/' + userCredentials.user.uid).set({
                name,
                email,
                topiclist
            }).then((data)=>{
            //    console.log('data ' , data)
            }).catch((error)=>{
             //   console.log('error ' , error)
            })




          })
          .catch(error => this.setState({ errorMessage: error.message }));
      

            //   let name=this.state.name
            //   let email=this.state.email
            //   let topiclist= ""
            //   Firebase.database().ref('UsersList/'+email).set({
            //     name,
            //     email,
            //     topiclist
            // }).then((data)=>{
            // //    console.log('data ' , data)
            // }).catch((error)=>{
            //  //   console.log('error ' , error)
            // })



          AsyncStorage.setItem('email', this.state.email, () => {
            AsyncStorage.setItem('name', this.state.name, () => {
          
            });
          });
  };

  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.Onboarding}
          style={{ width, height, zIndex: 1 }}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block middle>
                <Text style={styles.titletxt}>Register</Text>
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
                      placeholder="Name"
                     
                      onChangeText={
                        name => this.setState({ name })
                        }
                      value={this.state.name}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}/>
                      }/>
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
                          style={styles.inputIcons}/>
                      }>
                     </Input>
                     
                       <Block row style={styles.passwordCheck}>
                        <Block >
                        <Text  size={12} color={argonTheme.COLORS.MUTED}>
                          password strength:
                        </Text>
                       
                        </Block>
                        <Block flex>
                        <TextPasswordStrengthDisplay
                       
                        password={this.state.password}
                        wrapperStyle={{
                          marginTop:-9, 
                        }}
                        labelStyle={{fontWeight:"bold"}}
                      />
                      </Block>
                    </Block>
                  </Block>
                  
                  <Block row width={width * 0.75}>
                    <Checkbox  
                      onChange={ () => this.setState({check: !this.state.check}) }
                      checkboxStyle={{ borderWidth: 3 }}
                      color={argonTheme.COLORS.PRIMARY}
                      label="I agree with the"/>
                    <Button
                      style={{ width: 100 , elevation: 0}}
                      color="transparent"
                      textStyle={{
                        color: argonTheme.COLORS.PRIMARY,
                        fontSize: 14
                      }}>
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
    height: height * 0.8,
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
    marginTop:60,
    fontSize: 45,
    fontWeight: "600"
    
  },
  inputIcons: {
    marginRight: 12
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
  },
 
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
    flex: 0.5, 
    justifyContent: "space-evenly",
  },
});
