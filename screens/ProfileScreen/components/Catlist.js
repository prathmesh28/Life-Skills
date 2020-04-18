import React from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import { Card, Title } from 'react-native-paper';
const { width, height } = Dimensions.get("screen");
import Topics from "../../Topics"

export default class Cattist extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      renderData:Topics,
      
    }
  }
  async componentWillUnmount() {

      try {
        await AsyncStorage.setItem('topickey', JSON.stringify(this.state.renderData));
      } catch (error) {
        // checking
      }

      // try {
      //       const myArray = await AsyncStorage.getItem('topickey');
      //       if (myArray !== null) {
      //         // We have data!!
      //         console.log(JSON.parse(myArray));
      //       }
      //     } catch (error) {
      //       // Error retrieving data
      //     }
      
  }
  
  onPressHandler(id) {
    let renderData=[...this.state.renderData];
    for(let data of renderData){
      if(data.id==id){
        data.selected=(data.selected==false)?true:!data.selected;

        break;
      }
    }
    
    this.setState({renderData});
    //console.log(this.state.renderData)
  }
render(){
        return(
        
          <FlatList
           
            data={this.state.renderData}
            keyExtractor={item => item.id.toString()}
            style={{flex: 1}}
            numColumns={3}
            
            renderItem={({ item }) => (
              <Block style={styles.CatCards} >
              <TouchableOpacity  onPress={() => this.onPressHandler(item.id)}>
                <Card
                  style={
                    item.selected==false
                      ? {
                          ...styles.CatStyle,
                        }
                      : {
                        ...styles.CatStyle,
                          backgroundColor: '#a1a1a1',
                        }
                  } Center>
                  <Card.Cover source={item.img} style={styles.img}/>
                  <Card.Content>
                 
                  <Title style={styles.txt} >{item.name} </Title>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
              </Block>
            )}
          />

        )
}
    
}


const styles = StyleSheet.create({
CatCards:{
  flex: 1, flexDirection: 'column', 
},
CatStyle: {
  margin:5,
  width:width*0.25,
  height:width*0.33,
},
img:{
  width: width*0.2, 
  padding:5, 
  height: width*0.2, 
  backgroundColor: "#fff",
  alignSelf:"center",

},
txt:{
  fontSize:13,textAlign: 'justify',lineHeight: 15,marginTop:7
}

});
