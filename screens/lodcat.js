import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Firebase from '../firebase';
export default class SelectCat extends React.Component{
  static navigationOptions = {
    headerShown: false
  };
  componentDidMount() {
    let namevalue
    const { uid } = Firebase.auth().currentUser;
    //console.log(uid)
    Firebase.database().ref('UsersList/' + uid).once('child_added', function (snapshot) {
  
      namevalue = snapshot.val().topiclist
    
      // console.log(namevalue)
   
    });
   // this.props.navigation.navigate("Cat");
    if(namevalue==="new" || namevalue===undefined){
      this.props.navigation.navigate("Cat");

    }else{
      this.props.navigation.navigate("App");
    }
 
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
