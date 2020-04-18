import React from "react";
import { View, StyleSheet, Text, AsyncStorage, ScrollView, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import RNUrlPreview from 'react-native-url-preview';
import Saved from "./HomeScreen/components/index"
import data from "./data"
export default class SavedScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        News: data
    };
    }
      list = () => {
        return this.state.News.map(element => {
          return element.Saved ? (
            <Card  style={styles.card}>
          <Card.Title
            title={element.topic}
            titleStyle={styles.titlecard}
            right={(props) => <IconButton {...props} icon="heart" onPress={(elements) => {elements.Saved==!elements.Saved}} />}
            rightStyle={styles.righticon}
            style={styles.cardsty}
          />
        <RNUrlPreview  
          text={element.link} 
          //titleStyle={ element.title}
          //containerStyle 
          //imageStyle
          //faviconStyle
          //textContainerStyle
        />
        </Card>
          ):(<Text>hi</Text>)
        });
      };
    render() {
        return (
          
            <ScrollView
            showsVerticalScrollIndicator={false}
            //style={{ width, marginTop: '5%' }}
          >
            
              {/* {this.list()} */}
              
          
          </ScrollView>
  
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

