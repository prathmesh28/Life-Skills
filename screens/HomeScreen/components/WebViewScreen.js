import * as React from 'react';
import { StyleSheet, Dimensions, StatusBar, View, Button, Text } from "react-native" 
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants'
import { FAB } from 'react-native-paper';
const { width, height } = Dimensions.get("screen") 
export default class MyWeb extends React.Component {
    
    render() {
        
        return (
        <View style={{ height:height, width:width }}> 
            <StatusBar 
                translucent={true} 
                backgroundColor={'#1699e0'} 
                />
           
            <WebView 
                source={{ uri: this.props.navigation.getParam('uri') }} 
                style={{  marginTop: Constants.statusBarHeight }} 
            />
            <FAB
                style={styles.fab}
                icon="keyboard-backspace"
                onPress={() => { this.props.navigation.navigate('App')}}
            />
        </View>
        )
        
    }
}
const styles = StyleSheet.create({
    fab: {
        backgroundColor:'#1699e0',
      position: 'absolute',
      margin: 16,
      left: 0,
      bottom: 40,
    },
  })