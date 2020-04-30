import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AsyncStorage } from 'react-native';
import Firebase from '../firebase';
import AnimatedSplash from "react-native-animated-splash-screen";
export default class LoadingScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    constructor() {
        super();
        this.state = { email: null, name: null };
    }

    componentDidMount() {

        AsyncStorage.getItem('email').then((value) => this.setState({ email: value }))
        Firebase.auth().onAuthStateChanged(user => {
            //changed Lcat to App
            this.props.navigation.navigate(user ? "Lcat" : (this.state.email ? "Login" : "Intro"));
        });
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
