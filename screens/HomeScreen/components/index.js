import React from "react";
import { View, StyleSheet, Text, AsyncStorage, ScrollView, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import RNUrlPreview from 'react-native-url-preview';
const { width, height } = Dimensions.get("screen");
import data from "./data"

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    News: data
};
}
  list = () => {
    return this.state.News.map(element => {
      return (
        <Card  style={styles.card}>
        <RNUrlPreview  
          text={element.link} 
          //titleStyle={ element.title}
          //containerStyle
          //imageStyle
          //faviconStyle
          //textContainerStyle
        />
        </Card>
      );
    });
  };
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        //style={{ width, marginTop: '5%' }}
      >
        
          {this.list()}
          {this.list()}
      
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  card: {
    margin:10
  }
});
