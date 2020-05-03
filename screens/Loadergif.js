import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      {/* <View style={styles.modalBackground}> */}
       {/* <View style={styles.activityIndicatorWrapper}>
           <ActivityIndicator 
            size="large" color="#1699e0"
            animating={loading} /> */}
            <AnimatedLoader
                visible={loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../assets/login.json")}
                animationStyle={styles.lottie}
                speed={1}
            />
        {/* </View> */}
      {/* </View> */}
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: "rgba(255,255,255,0.75)",
    // height: 100,
    // width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  lottie: {
    width: 100,
    height: 100
  }
});

export default Loader;