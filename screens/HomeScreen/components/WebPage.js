import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import data from "./data"

const myHtmlFile = require("https://medium.com/the-mission/why-there-is-no-such-thing-as-time-management-4d514a21060a");

class WebPage extends Component {
  render() {
    return (
      <WebView source={myHtmlFile} />
    );
  }
}