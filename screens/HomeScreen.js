import React from "react";
import { View, Text, StyleSheet, LayoutAnimation, TouchableOpacity } from "react-native";
import Firebase from '../firebase';
export default class HomeScreen extends React.Component {
    state = { email: "", displayName: "" };

    componentDidMount() {
        const { email, displayName } = Firebase.auth().currentUser;

        this.setState({ email, displayName });
    }

   

    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
                <Text>Hi {this.state.displayName}!</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "black",
        borderRadius: 4,
        height: 52,
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    }
});
