import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  AsyncStorage
  
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import Firebase from '../../firebase';
import { Button } from "../../components";
import { Images } from "../../constants";
const { width, height } = Dimensions.get("screen");
import Catlist from "../Catlist"
import Model from "./components/model"
export default class ProfileScreen extends React.Component {
  state = { email: "", displayName: "" };
  signOutUser = () => {
    Firebase.auth().signOut();
//removed this coz when user logs in this dosent update
//     AsyncStorage.getItem('topickey', (err, topickey) => {
//       AsyncStorage.removeItem('topickey')
// //dont remove this
//         });
     
  };
    componentDidMount() {
        const { email, displayName } = Firebase.auth().currentUser;

        this.setState({ email, displayName });
    }
 
  render() {
    return (
      <Block flex style={styles.profile}>
        <StatusBar hidden />
        <Block flex>
          <ImageBackground
            source={Images.Onboarding}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
              
              <Button style={{...styles.socialButtons, right: 10}} onPress={this.signOutUser}>
                <Image
                        source={ Images.Exit }
                         style={styles.exit}
                ></Image>
                <Text style={{ 
                      color: "#fff",
                        fontSize: 14,
                        marginLeft: -6}}>logout</Text>
              </Button>
            
            
              
              <Block flex style={styles.profileCard}>
                
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: "https://api.adorable.io/avatars/124/"+this.state.displayName+".png" }}
                    style={styles.avatar}
                    
                  />
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
                  <Block middle style={{marginBottom:100}}>
                  <Model/>
                  </Block>
                  <Catlist/>
                 
                  
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
    marginTop: height*0.15,
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
    alignSelf:"center"
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 2,
    borderColor:'#fff'
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
    position:"absolute",
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius:100,
    elevation: 0,
    marginTop: 20 
   
  },
  exit: {
    width: 44,
    height: 44,
  },
});