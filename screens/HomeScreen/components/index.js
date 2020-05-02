import React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  View,
} from "react-native";
import { Card, Colors, ToggleButton } from "react-native-paper";
import RNUrlPreview from "react-native-url-preview";
const { width, height } = Dimensions.get("screen");
import data from "../../data";
import Firebase from "../../../firebase";
import { Block } from "galio-framework";
import { withNavigation } from "react-navigation";

let userid;
let result = [];
export default withNavigation(
  class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        News: [],
        NewsData: data,
        SavedData: []
      };
    }

    openWebView = (uri) => {
      this.props.navigation.navigate("WebViewScreen", { uri: uri });
    };

    componentDidMount() {
      const { uid } = Firebase.auth().currentUser;
      userid = uid;

      Firebase.database()
        .ref("UsersList/" + uid + "/topiclist/")
        .on("value", (snapshot) => {
          const hio = snapshot.val().map((element) => {
            if (element.selected) {
              const temp = element.name;
              return temp;
            }
          });

          result = this.state.NewsData.filter(element => {
            if (hio.includes(element.topic)) {
              return element
            }
          })
          this.setState({ News: result })
        });

    }


    savelist = (props) => {
      console.log("hi")

      Firebase.database().ref('UsersList/' + userid + "/savedlist/").once('value', snapshot => {
        // console.log(snapshot.val())
        if (snapshot.val() === "new" || snapshot.val() === null) {
          this.state.SavedData.push(props)
          //console.log(this.state.SavedData)
          Firebase.database().ref('UsersList/' + userid).update({
            savedlist: this.state.SavedData,
          })
        }
        else {
          // console.log(snapshot.val())
          this.setState({ SavedData: snapshot.val() })
          const arrayitem = snapshot.val().filter(itm => itm.id !== props.id)
          arrayitem.push(props)
          console.log(arrayitem)
          Firebase.database().ref('UsersList/' + userid).update({
            savedlist: arrayitem
          })
        }
      })

    }
    render() {

      return (
        <View style={styles.Container} >
          <FlatList

            data={this.state.News}
            keyExtractor={item => item.id.toString()}
            //style={{ flex: 1 }}
            // numColumns={3}

            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Title
                  key={item.id}
                  title={item.topic}
                  titleStyle={styles.titlecard}
                  right={(props) =>
                    <ToggleButton
                      icon="heart"
                      color={Colors.pink300}
                      //  status={item.Saved}
                      onPress={() => this.savelist(item)}
                    ></ToggleButton>
                  }
                  rightStyle={styles.righticon}
                  style={styles.cardsty}
                />
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.openWebView(item.link) }}>
                  <View pointerEvents="none">
                    <RNUrlPreview
                      text={item.link}
                      titleStyle={styles.linktitle}
                      containerStyle={styles.linkcontainer}
                      titleNumberOfLines={2}
                      imageStyle={styles.linkimage}

                    />
                  </View>
                </TouchableOpacity>
              </Card>

            )
            }
          />
        </View>
      )

    }
  }
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection:"column"
  },
  card: {
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: height * 0.2
  },
  titlecard: {
    fontSize: 12,

    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
  },
  button: {
    elevation: 0,
    borderRadius: 100,
    color: "red",
  },
  righticon: {},
  cardsty: {
    marginTop: -16,
    marginBottom: -16,
  },
  linktitle: {
    // backgroundColor: '#fff'
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  linkcontainer: {
    backgroundColor: "#fff",
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  // linkimage: {
  //   //alignItems: 'flex-end' ,
  //  // flexDirection: 'row',
  //  //  justifyContent: 'flex-start' ,
  // }
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
