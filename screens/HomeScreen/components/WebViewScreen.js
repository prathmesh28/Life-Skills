import * as React from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants'
export default class MyWeb extends React.Component {
    
    render() {
        // console.log('method called');
        // console.log(this.props.navigation.getParam('uri'));
        return <WebView source={{ uri: this.props.navigation.getParam('uri') }} style={{  marginTop: Constants.statusBarHeight }} />;
        
    }
}
