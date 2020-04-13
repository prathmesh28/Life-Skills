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

        // AsyncStorage.getItem('email').then((value) => this.setState({ 'email': value }))
        //  AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))
        let Name, Email
        AsyncStorage.getItem('name', (err, name) => {
              AsyncStorage.getItem('email', (err, email) => {
                Name=name
                Email=email
                console.log(email)
                console.log(name)

                });
            });
   
       
         
        // Firebase.auth().onAuthStateChanged(user => {
        //     this.props.navigation.navigate(user ? "App" : (this.state.email ? "Login" : "Intro" ) );
        // });


        Firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? (Name ? "Cat" : "App" ) : (Email ? "Login" : "Intro" ) );
        });
        // console.log(this.state.name)
        // console.log(this.state.email)

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
