import React from "react";
import { StyleSheet,Dimensions, AsyncStorage, StatusBar, ImageBackground, ScrollView } from "react-native";
import RNUrlPreview from 'react-native-url-preview';
import { Block, Checkbox, theme } from "galio-framework";
import { Button, Input } from '../components';
import { Images, argonTheme } from "../constants";
import { Avatar, Card, Title, Paragraph, IconButton ,Image, Colors, ToggleButton, FAB, Portal,  } from 'react-native-paper';
import Home from './HomeScreen/components/index'
import data from "./data"
const { width, height } = Dimensions.get("screen");
const savedlist = []
export default class SavedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      News: data,
      saved:null
  };
  this.hello=this.hello.bind(this)
}

componentDidMount(){
  AsyncStorage.getItem('save', (err, save) => {
    this.setState({saved:save})
   });
}

hello = () => {
  AsyncStorage.getItem('save', (err, save) => {
    this.setState({saved:save})
    this.list()
   });
   //this.list()

}
list = () => { 
  
  const savearray = this.state.saved
//  console.log(this.state.saved)
  return this.state.News.map(element => {
 //   console.log(savearray.indexOf(element.id))
 if(savearray!==null){
     if(savearray.indexOf(element.id) !== -1){
 
     return(
         <Card  style={styles.card}>
         <Card.Title
           key={element.id}
           title={element.topic}
           titleStyle={styles.titlecard}
           right={(props) => 
             <ToggleButton
                 icon="heart"
                 //value={element.Saved}
                 color={Colors.pink300}
                 status={element.Saved}
                 onPress={ () => {
                    if(element.Saved){
                     element.Saved=false
                           if(savedlist.indexOf(element.id) !== -1){
                             var index = savedlist.indexOf(element.id);
                             if (index !== -1) savedlist.splice(index, 1);
                           //  console.log(savedlist)
                           } 
                    }else{
                     element.Saved=true
                     if(savedlist.indexOf(element.id) !== -1){
                    } else{
                     savedlist.push(element.id)
                 //    console.log(savedlist)
                    }
                    }
                  
                   
                }}
               ></ToggleButton>
           }
           rightStyle={styles.righticon}
           style={styles.cardsty}
         />
       <RNUrlPreview  
         text={element.link} 
         titleStyle={styles.linktitle}
         containerStyle={styles.linkcontainer}
         titleNumberOfLines={2}
         imageStyle={styles.linkimage}
       />
       </Card>
       )
        }
      }
  })
//});
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
      
      <FAB
            icon="cancel"
            //label="Loading FAB"
            style={styles.fab}
            onPress={() =>  this.hello()}
            visible={this.state.visible}
            
          />
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
    width:55,
    position:"absolute",
    bottom:10,
    right:10
  },
   card: {
    margin:10,
    paddingLeft:10,
    paddingRight:10
  },
  titlecard: {
    fontSize:12,
   
  },
  button: {
    elevation:0,
    borderRadius:100,
    color:"red"
  },
  righticon: {
    
  },
  cardsty: {
    marginTop: -16,
    marginBottom: -16,
    
  },
  linktitle: {
   // backgroundColor: '#fff'
   fontWeight:"bold",
   alignItems:"flex-start",
   
  },
  linkcontainer: {
    backgroundColor: '#fff',
    flex: 2, 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  cards: {
    marginTop:50,
    width:width*0.9,
    height:height*0.79
  },
});