import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Firebase from '../firebase';
export default class SelectCat extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  componentDidMount() {
    let namevalue
    const { uid } = Firebase.auth().currentUser;
    //console.log(uid)
    Firebase.database().ref('UsersList/' + uid + "/topiclist/").once('value', function (snapshot) {

      namevalue = snapshot.val()
      // console.log(snapshot.val())
      //  console.log("topiccheck"+namevalue)
      //  console.log("topiccheck123"+namevalue)

    });
    // this.props.navigation.navigate("Cat");
    if (namevalue === "new") {
      this.props.navigation.navigate("Cat");

    } else {
      this.props.navigation.navigate("App");
    }
    console
  }
  render() {
    return (
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
