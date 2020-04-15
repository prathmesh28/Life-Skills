import React from "react";
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar
} from "react-native";
import { Block, Text, Button } from "galio-framework";
import { Images, argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");
import Catlist from "./ProfileScreen/components/Catlist"
export default class SelectCat extends React.Component{
  static navigationOptions = {
    headerShown: false
  };

  render(){
    
    return(
       <Block>
        <StatusBar hidden />
        <ImageBackground
            source={Images.Onboarding}
            style={{height:height,width:width}}
            //imageStyle={styles.profileBackground}
          >
        <Block center style={styles.Container}>
          <Block style={styles.title}>
            <Text color="black" size={50}>
                    Choose Topics
            </Text>
          </Block>
          <Block center>
            <Block flex style={styles.profileContainer}>
              <Catlist/>
            </Block>
            
            <Button 
                      color="primary" 
                      style={styles.createButton}
                      onPress={() =>this.props.navigation.navigate('App')}
                      >                      
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                       Next
                      </Text>
                    </Button>
          </Block>
      </Block>
      </ImageBackground>
    </Block>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    marginTop:110,
    height: height*0.65,   //change this
    width: width * 0.9,
    elevation: 1,
    backgroundColor: "#F4F5F7",

  },
  profileContainer: {
    marginTop:50,
    width: width * 0.8,
     borderRadius: 4,
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
  title:{
    marginTop:30
  },
  createButton: {
    position:"absolute",
    marginTop:height*0.49   //change this
  }
})