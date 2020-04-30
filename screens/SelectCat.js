import React from "react";
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar
} from "react-native";
import { Block, Text, Button } from "galio-framework";
import { argonTheme } from "../constants";
const { width, height } = Dimensions.get("screen");
import Catlist from "./Catlist"
import Firebase from "../firebase"

export default class SelectCat extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  state = { check: false }


  async componentDidMount() {
    const { uid } = Firebase.auth().currentUser;

    Firebase.database().ref('UsersList/' + uid + "/topiclist/").on('value', snapshot => {
      console.log("checkthis" + snapshot.val())

      if (snapshot.val() === "new") {
        this.setState({ check: true })
      }
      else {
        var status = snapshot.val().some((el) => {
          return (el.selected == true);
        });
        console.log(status);
        if (status) {
          this.setState({ check: false })
        } else {
          this.setState({ check: true })
        }
      }


    });
  }


  render() {

    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={require("../assets/backbg.jpg")}
          style={{ height: height, width: width }}
        //imageStyle={styles.profileBackground}
        >
          <Block flex middle>

            <Block center style={styles.box}>
              <Block >
                <Text style={styles.title} color="black" >
                  Choose Topics
            </Text>
              </Block>

              <Block center style={styles.area}>
                <Block flex style={styles.profileContainer}>
                  <Catlist />
                </Block>

                <Button
                  color="primary"
                  style={styles.createButton}
                  disabled={this.state.check}
                  onPress={() => this.props.navigation.navigate('App')}
                >
                  <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                    Next
                </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    )
  }
}

const styles = StyleSheet.create({

  box: {
    // marginTop:110,
    height: height * 0.7,   //change this
    width: width * 0.9,
    elevation: 7,
    backgroundColor: "#F4F5F7",
    borderRadius: 20

  },
  profileContainer: {
    marginTop: 50,
    width: width * 0.83,
    //   borderRadius: 4,
    // shadowRadius: 8,
    shadowOpacity: 0.1,
  },
  title: {
    marginTop: 50,
    fontSize: 35,
    fontWeight: "700"

  },
  createButton: {
    position: "relative",
    bottom: 50,
    width: width * 0.5,
  },
  area: {
    flex: 1,
    justifyContent: "center",
  }
})