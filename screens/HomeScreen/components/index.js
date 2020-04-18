import React from "react";
import { View, StyleSheet, Text, AsyncStorage, ScrollView, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph, IconButton ,Image } from 'react-native-paper';
import RNUrlPreview from 'react-native-url-preview';
const { width, height } = Dimensions.get("screen");
import data from "../../data"
//let arraynews = [];
const ary = []
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    News: data,
    arraynews:null
  };
}

 async componentDidMount(){
  
      const myArray = await AsyncStorage.getItem('topickey');
      // console.log(JSON.parse(myArray));
      const arraynews = JSON.parse(myArray)
      // console.log(arraynews);
      
      const arraylist = arraynews.filter(element => {
        
          ary.push(element.selected?element.name:null)
         
          
          //return ary
        
          
      
      })
      this.setState({arraylist:ary})
     //console.log(this.state.arraylist)
      //this.setState({arraylist})
   }
//use asyncdata for categories

//   list = () => {
//  //   {console.log(arraynews)}
//     return this.state.News.map(element => {
//     return arraynews.map(item => {

    //  let temp = arraynews.find(item=> item.name === element.topic)
    //  if(temp.arraynews) {
    //   e.address = temp.address;
    // }

    //  let op = people.map((e,i)=>{
    //   let temp = address.find(element=> element.id === e.id)
    //   if(temp.address) {
    //     e.address = temp.address;
    //   }
    //   return e;
    // })
    // console.log(op);
    
  //   if(item.name===element.topic)
     //  if(element.topic===item.name)

     list = () => { 
      // console.log(this.state.arraylist)
     return this.state.News.map(element => {
         //     console.log(this.state.arraylist)
         // let temp = this.state.arraylist.find(item=> item.name === element.topic)
        //   console.log(arraynews)
      //     if(temp.this.state.arraynews) {

     //   return this.state.arraylist.map(item => {
     // console.log(this.state.arraylist)
    // console.log(ary)
        if(ary.indexOf(element.topic) !== -1){
          return (
            <Card  style={styles.card}>
            <Card.Title
              key={element.id}
              title={element.topic}
              titleStyle={styles.titlecard}
              right={(props) => <IconButton {...props} icon="heart" onPress={() => { }} />}
              rightStyle={styles.righticon}
              style={styles.cardsty}
            />
          <RNUrlPreview  
            text={element.link} 
          />
          </Card>
          )
        }
          
   //     });
        // if(temp){
        //   return tepm
        // }
     });
    
  };
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        //style={{ width, marginTop: '5%' }}
      >
        
          {this.list()}
          {/* {this.list()} */}
      
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  card: {
    margin:10,
  },
  titlecard: {
    fontSize:12
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
    marginBottom: -16

  }

});
