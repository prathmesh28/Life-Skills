
import React from "react";
import { StyleSheet, Dimensions, AsyncStorage, StatusBar, ImageBackground, ScrollView } from "react-native";
import RNUrlPreview from 'react-native-url-preview';
import { Block, Checkbox, theme } from "galio-framework";
import { Button, Input } from '../components';
import { Images, argonTheme } from "../constants";
import { Avatar, Card, Title, Paragraph, IconButton, Image, Colors, ToggleButton, FAB, Portal, } from 'react-native-paper';
import Home from './HomeScreen/components/index'
import data from "./data"
import Firebase from "../firebase";

const { width, height } = Dimensions.get("screen");
let savedlist = []
let userid
let qwe = []
export default class SavedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SavedData: []
  };
}

componentDidMount(){
  const { uid } = Firebase.auth().currentUser;
  userid= uid
 
 
   Firebase.database().ref('UsersList/' + uid  ).on('value', snapshot => {
    this.setState({SavedData:snapshot.val().savedlist})
   // const savedarray = snapshot.val()
    //console.log(savedarray)
   //this.state.SavedData.push(snapshot.val())

   //  console.log(this.state.SavedData)
    // console.log(snapshot.val().savedlist)
    savedlist=this.state.SavedData
   })
   //console.log(this.state.SavedData)

}

list = () => { 
 // Firebase.database().ref('UsersList/' + userid + "/SavedList/" ).on('value', snapshot => {
  //  let news = snapshot.val()
  console.log(savedlist)
  return this.state.SavedData.map(element => {
 // console.log(element)
    // return (
    //   <Card  style={styles.card} onPress={() => this.setState({ showURL: true })}>
    //   <Card.Title
    //     key={element.Savedlist.id}
    //     title={element.Savedlist.topic}
    //     titleStyle={styles.titlecard}
    //     right={(props) => 
    //       <ToggleButton
    //           icon="heart"
    //           color={Colors.pink300}
    //          // status={element.Savedlist.Saved}
    //           onPress={ () => this.savelist(element.Savedlist)}
    //         ></ToggleButton>
    //     }
    //     rightStyle={styles.righticon}
    //     style={styles.cardsty}
    //   />
     
    // <RNUrlPreview  
    //   text={element.Savedlist.link} 
    //   titleStyle={styles.linktitle}
    //   containerStyle={styles.linkcontainer}
    //   titleNumberOfLines={2}
    //   imageStyle={styles.linkimage}
    //   disable
    // />
    // </Card>
    // )
  
});

//})
}

  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <Block flex  style={styles.cards}>
        <ScrollView
        showsVerticalScrollIndicator={false}
      >
      
        <Block flex >
         {this.list()}
        </Block>
        </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    margin: 8,
    width: 55,
    position: "absolute",
    bottom: 10,
    right: 10
  },
  card: {
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  titlecard: {
    fontSize: 12,

  },
  button: {
    elevation: 0,
    borderRadius: 100,
    color: "red"
  },
  righticon: {

  },
  cardsty: {
    marginTop: -16,
    marginBottom: -16,

  },
  linktitle: {
    // backgroundColor: '#fff'
    fontWeight: "bold",
    alignItems: "flex-start",

  },
  linkcontainer: {
    backgroundColor: '#fff',
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cards: {
    marginTop: 50,
    width: width * 0.9,
    height: height * 0.79
  },
});