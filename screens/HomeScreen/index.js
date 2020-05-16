import React from "react";
import { FlatList, StyleSheet, Dimensions, StatusBar, ImageBackground } from "react-native";
import Home from "./components/index"
import { Block, Text } from "galio-framework";
const { width, height } = Dimensions.get("screen");
import Constants from 'expo-constants';
import Firebase from '../../firebase'
import Topics from '../Topics'
import { Card, Title } from 'react-native-paper';

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
     
      renderData: Topics,
     
    }
  }

  async componentDidMount() {
    this.Onboarding = require("../../assets/backbg.jpg")
    const { uid } = Firebase.auth().currentUser;
    userid = uid

    Firebase.database().ref('UsersList/' + userid + "/topiclist/").on('value', snapshot => {
      if (snapshot.val() !== "new") {
        this.setState({ renderData: snapshot.val() })
      }
    });
  
  }


  render() {
  
    return (

      <Block flex center>
        <StatusBar 
        translucent={true} 
        backgroundColor={'transparent'} />
 <Block  >
        <ImageBackground
          source={require("../../assets/backbg.jpg")}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
         
            <Block style={{ backgroundColor:'#1699e0', height:height*0.05, padding: Constants.statusBarHeight}}>
            <Text style={{ 
              fontSize: 20,
              position:'relative',
              color:'#fff',
              letterSpacing:1,
              textAlign:'center',
              textShadowColor:'black',
              textShadowOffset:{width: 0, height: 0},
              textShadowRadius:20, 
              }}>Life Skills</Text>
          </Block>
          <Block middle>
          
              <Block style={styles.cards}>
                <Home />
              </Block>
            
          </Block>
        
        </ImageBackground>
        </Block>
      </Block>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  cards: {
    width: width * 0.9,
    height: height * 0.85,
   
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height,
    
  },
  cardy: {
  
    borderRadius:30,
    height:40,
    width:100,
   textAlign:"center"

  },
  txt: {
    fontSize: 11,
  //  position:"absolute",
  },
});
