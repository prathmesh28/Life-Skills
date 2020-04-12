import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AsyncStorage } from 'react-native';
import Firebase from '../firebase';
export default class LoadingScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
      };
      constructor(){
        super();
        this.state = {email: null, name: null};
    }
    

    componentDidMount() {

        AsyncStorage.getItem('email').then((value) => this.setState({ 'email': value }))
        AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))
        // console.log(AsyncStorage.getItem('name'))
        // console.log(AsyncStorage.getItem('email'))

        Firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? (this.state.name ? "Cat" : "App" ) : (this.state.email ? "Login" : "Intro" ) );
        });
    }
    // (this.state.name ? "Cat" : "App" )
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
