import React from "react";
import { View, StyleSheet, Text, AsyncStorage } from "react-native";

export default class ProfileScreen extends React.Component {
 
  state = { email: null}

  componentDidMount = () => AsyncStorage.getItem('email').then((value) => this.setState({ 'email': value }))

  render() {
    return (
      <View style={styles.container}>
        <Text>
          hi {this.state.email}
        </Text>  
    </View>
  )}
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
  }
});
