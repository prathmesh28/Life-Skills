import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  ActivityIndicator
} from "react-native";
import Constants from 'expo-constants';
import { Block, Text, theme } from "galio-framework";
import Firebase from '../../firebase';
import { Button } from "../../components";
const { width, height } = Dimensions.get("screen");
import Catlist from "../Catlist"
export default class ProfileScreen extends React.Component {
  state = { email: "", displayName: "", photoURL: "", loadpic: true };
  signOutUser = () => {
    Firebase.auth().signOut();
  };
  componentDidMount() {
    const { email, displayName, photoURL } = Firebase.auth().currentUser;
    this.Onboarding = require("../../assets/backbg.jpg")
    this.Exit = require("../../assets/exit.png");
    this.setState({ email, displayName });
   
    if(photoURL){
      this.setState({ photoURL });
    }else{
      this.setState({ photoURL:"https://api.adorable.io/avatars/124/" + displayName + ".png" });
    }



  }

  render() {
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={this.Onboarding}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <Button style={{ ...styles.socialButtons, right: 10 }} onPress={this.signOutUser}>
              <Image
                source={this.Exit}
                style={styles.exit}
              ></Image>
              <Text style={{
                color: "#fff",
                fontSize: 14,
                marginLeft: -6
              }}>logout</Text>
            </Button>

            <Block flex style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}>
                <Image
                  source={{ 
                    uri: this.state.photoURL }}
                  style={styles.avatar}
                  onLoadEnd={ ()=>{ this.setState({ loadpic: false })}}
                  />
                    
            {this.state.loadpic &&<ActivityIndicator  size="large" color="#741cc7"/> }
              </Block>

              <Block flex>
                <Block middle style={styles.nameInfo}>
                  <Text bold size={28} color="#32325D">
                    {this.state.displayName}
                  </Text>
              </Block>
              <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
                </Block>
                <Block middle style={{ marginBottom: 50 }}>
                  <Text bold size={20} color="#32325D">Topics</Text>
                </Block>
                  <Catlist />
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height
  },
  profileCard: {
    //position: "relative",
    //height:height*0.4,
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: height * 0.15,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "absolute",
    marginTop: -80,
    alignSelf: "center",
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderColor: '#fff'
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  socialButtons: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 100,
    elevation: 0,
    marginTop: Constants.statusBarHeight

  },
  exit: {
    width: 44,
    height: 44,
  },
});