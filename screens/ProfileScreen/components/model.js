import React, { Component } from 'react';
import {  TouchableOpacity, StyleSheet, View } from 'react-native';
import { Block, Text, theme } from "galio-framework";

import Modal from 'react-native-modal';
import Catlist from "../../Catlist"
import { IconButton, Colors } from "react-native-paper"

export default class model extends Component {
  state = {
    visibleModal: null,
  };

  _renderButton = (text, onPress) => (
      <Block  >
        <TouchableOpacity onPress={onPress}>
      <Text>
      {text}
      </Text>
      </TouchableOpacity>
   
   
   </Block>

  );

  _renderModalContent = () => (
    
    <Block style={styles.modalContent}>
      <Catlist/>
      <Block middle>
      {this._renderButton('Done', () => this.setState({ visibleModal: null }))}
    </Block>
    </Block>
  );

  render() {
    return (
      <View >
       {this._renderButton('Topics', () => this.setState({ visibleModal: 1 }))}
        <Modal
          isVisible={this.state.visibleModal === 1}
          backdropColor={'rgba(0, 0, 0, 0.8)'}
          backdropOpacity={1}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    height:400,
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign:"center",
    
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
 
});