import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AsyncStorage } from 'react-native';
import Firebase from '../firebase';
export default class SelectCat extends React.Component{
  static navigationOptions = {
    headerShown: false
  };
  componentDidMount() {
    Firebase.database().ref('UsersList/').once('child_added', function (snapshot) {
      console.log("hi",snapshot.val())
      console.log("yo",snapshot.val().email)
  });
  

    AsyncStorage.getItem('name', (err, name) => {
        //  console.log("one",name)
        //  console.log("two",displayName)
         const { email, displayName } = Firebase.auth().currentUser;
        this.props.navigation.navigate(name ? "Cat" : "App");
    })
  }
  render(){
    
    
    return(
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
