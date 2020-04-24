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
import Catlist from "./Catlist"
export default class SelectCat extends React.Component{
  static navigationOptions = {
    headerShown: false
  };

  render(){
    
    return(
       <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
            source={Images.Onboarding}
            style={{height:height,width:width}}
            //imageStyle={styles.profileBackground}
          >
                   <Block flex middle>

        <Block center style={styles.box}>
           <Block >
            <Text style={styles.title} color="black" >
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
      </Block>
      </ImageBackground>
    </Block>
    )
  }
}

const styles = StyleSheet.create({
 
  box: {
   // marginTop:110,
    height: height* 0.7,   //change this
    width: width * 0.9,
    elevation: 7,
    backgroundColor: "#F4F5F7",
    borderRadius:20

  },
  profileContainer: {
    marginTop:50,
    width: width * 0.83,
  //   borderRadius: 4,
   // shadowRadius: 8,
    shadowOpacity: 0.1,
  },
  title:{
    marginTop:50,
    fontSize: 35,
    fontWeight: "600"
  },
  createButton: {
    position:"relative",
  //  bottom:20
  }
})