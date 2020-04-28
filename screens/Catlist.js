import React from "react";
import { StyleSheet, Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { Block } from "galio-framework";
import { Card, Title } from 'react-native-paper';
const { width, height } = Dimensions.get("screen");
import Topics from "./Topics"
import Firebase from '../firebase'
let userid =null

export default class Cattist extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      renderData:Topics
    }
  }

async componentDidMount() {

  const { uid } = Firebase.auth().currentUser;
  userid=uid

  Firebase.database().ref('UsersList/' + userid + "/topiclist/").on('value', snapshot => {
    if(snapshot.val()!=="new"){
      this.setState({renderData:snapshot.val()})
    }
  });
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
      Firebase.database()
      .ref('UsersList/' + userid )
      .update({
        topiclist: this.state.renderData
      })
      //.then(() => console.log('Data updated.'));
  }


render(){
        return(
        <View style={styles.Container} >
          <FlatList
          
            data={this.state.renderData}
            keyExtractor={item => item.id.toString()}
            style={{flex: 1}}
            numColumns={3}
            
            renderItem={({ item }) => (
              <Block style={styles.CatCards} >
              <TouchableOpacity  onPress={() => this.onPressHandler(item.id)} >
                <Card
                  style={
                    item.selected==false
                      ? {
                          ...styles.CatStyle,
                        }
                      : {
                        ...styles.CatStyle,
                          backgroundColor: '#ADD8E6',
                        }
                  } Center>
                  <Card.Cover source={item.img} style={styles.img}/>
                  <Card.Content>
                 
                  <Title style={styles.txt} textBreakStrategy={'simple'}>{item.name} </Title>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
              </Block>
            )}
          />
          </View>
        )
      }
   }


const styles = StyleSheet.create({
  Container: {
    flex:1,
    justifyContent:"center"
    
  },
CatCards:{
  flex: 1, 
  flexDirection: 'column', 
  flexWrap: "wrap"
},
CatStyle: {
   margin:5,
  width:width*0.26,
  height:width*0.33,
  // borderWidth:1,
  elevation:6,
},
img:{
  width: width*0.2, 
  padding:10, 
  height: width*0.2, 
  backgroundColor: "transparent",
  alignSelf:"center",

},
txt:{
  fontSize:13,
  textAlign: 'center',
  lineHeight: 15,
  marginTop:7,
  margin:-14
}

});
