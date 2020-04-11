import React,{ useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View 
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Card, Title } from 'react-native-paper';
const { width, height } = Dimensions.get("screen");



export default function Cattist(){

        return(
            
                <Block middle flex={1} style={styles.CatContainer}>
                  <Card style={styles.CatStyle} Center>
                    <Card.Cover source={ require("../../../assets/cat/book.png")} style={styles.img}/>
                    <Card.Content>
                      <Title style={{ fontSize:13,textAlign: 'justify',lineHeight: 15,marginTop:7 }} >Knowledge </Title>
                    </Card.Content>
                  </Card>

                  <Card style={styles.CatStyle}>
                    <Card.Cover source={ require("../../../assets/cat/emotions.png")} style={styles.img}/>
                    <Card.Content>
                      <Title style={{ fontSize:13,textAlign: 'justify',lineHeight: 15,marginTop:7 }} >Emotions </Title>
                    </Card.Content>
                  </Card>

                  <Card style={styles.CatStyle}>
                    <Card.Cover source={ require("../../../assets/cat/leadership.png")} style={styles.img}/>
                    <Card.Content>
                      <Title style={{ fontSize:13,textAlign: 'justify',lineHeight: 15,marginTop:7 }} >Leadership </Title>
                    </Card.Content>
                  </Card>

                  <Card style={styles.CatStyle}>
                    <Card.Cover source={ require("../../../assets/cat/conversation.png")} style={styles.img}/>
                    <Card.Content>
                      <Title style={{ fontSize:13,textAlign: 'justify',lineHeight: 15,marginTop:7, }} >Communication</Title>
                    </Card.Content>
                  </Card>
  

                  <Card style={styles.CatStyle}>
                    <Card.Cover source={ require("../../../assets/cat/empathy.png")} style={styles.img}/>
                    <Card.Content>
                      <Title style={{ fontSize:13,textAlign: 'justify',lineHeight: 15,marginTop:7 }} >Love </Title>
                    </Card.Content>
                  </Card>

                  <Card style={styles.CatStyle}>
                    <Card.Cover source={ require("../../../assets/cat/goal.png")} style={styles.img}/>
                    <Card.Content>
                      <Title style={{ fontSize:13,textAlign: 'justify',lineHeight: 15,marginTop:7 }} >Travel </Title>
                    </Card.Content>
                  </Card>
                  
                  </Block>
        )
    
}


const styles = StyleSheet.create({
CatContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    
},
CatStyle: {
  margin:5,
  width:width*0.25,
  height:width*0.33,
},
img:{
  width: width*0.2, padding:5, height: width*0.2, backgroundColor: "#fff",
  alignSelf:"center"
}

});
