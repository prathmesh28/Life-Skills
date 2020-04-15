import React from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import { Card, Title } from 'react-native-paper';
const { width, height } = Dimensions.get("screen");


const Data = [
  {
    id: 1,
    name: 'Knowledge',
    img: require("../../../assets/cat/book.png"),
    selected: false
  },
  {
    id: 2,
    name: 'Emotions',
    img: require("../../../assets/cat/emotions.png"),
    selected: false
  },
  {
    id: 3,
    name: 'Leadership',
    img: require("../../../assets/cat/leadership.png"),
    selected: false
  },
  {
    id: 4,
    name: 'Communication',
    img: require("../../../assets/cat/conversation.png"),
    selected: false
  },
  {
    id: 5,
    name: 'Love',
    img: require("../../../assets/cat/empathy.png"),
    selected: false
  },
  {
    id: 6,
    name: 'Travel',
    img: require("../../../assets/cat/goal.png"),
    selected: false
  },
];

export default class Cattist extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      renderData:Data
    };
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
