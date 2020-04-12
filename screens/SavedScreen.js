import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Firebase from '../firebase';

export default class SavedScreen extends React.Component {

    render() {
        return (
          
        <View style={styles.container}>
          <Text>hi</Text>
        </View>
  
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

