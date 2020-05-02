
import React from "react";
import {
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  View,
} from "react-native";import RNUrlPreview from 'react-native-url-preview';
import { Block, Checkbox, theme } from "galio-framework";
import { Avatar, Card, Title, Paragraph, IconButton, Image, Colors, ToggleButton } from 'react-native-paper';
import Firebase from "../firebase";
import { withNavigation } from "react-navigation";

const { width, height } = Dimensions.get("screen");
let userid
export default withNavigation( class SavedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SavedItem: []
  };
}

  openWebView = (uri) => {
    this.props.navigation.navigate("WebViewScreen", { uri: uri });
  };

componentDidMount(){
  const { uid } = Firebase.auth().currentUser;
  userid= uid
  Firebase.database().ref('UsersList/' + uid  ).on('value', snapshot => {
    this.setState({SavedItem:snapshot.val().savedlist})
  })
}

savelist = (props) => {
 // console.log(this.state.SavedItem)
  const arrayitem = this.state.SavedItem.filter(itm => itm.id!==props.id)
  console.log(arrayitem)
    Firebase.database().ref('UsersList/' + userid ).update({
        savedlist: arrayitem
    })

}

  render() {
    return (
      <Block style={styles.Container} >
        <FlatList

          data={this.state.SavedItem}
          keyExtractor={item => item.id.toString()}
        
          renderItem={({ item }) => ( 
            <Card  style={styles.card}  >
         <Card.Title
           key={item.id}
           title={item.topic}
           titleStyle={styles.titlecard}
           right={(props) => 
             <ToggleButton
                 icon="heart"
                 color={Colors.pink300}
              //   status={item.Saved}
                onPress={ () => this.savelist(item)}
               ></ToggleButton>
           }
           rightStyle={styles.righticon}
           style={styles.cardsty}
         />
         <TouchableOpacity onPress={() => { this.openWebView(item.link) }}>
            <View pointerEvents="none">
              <RNUrlPreview  
                text={item.link} 
                titleStyle={styles.linktitle}
                containerStyle={styles.linkcontainer}
                titleNumberOfLines={2}
                imageStyle={styles.linkimage}
                disable
              />
          </View>
       </TouchableOpacity>
       </Card>

          )
            }
          />
          </Block>
    )
  }
}
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    margin: 8,
    width: 55,
    position: "absolute",
    bottom: 10,
    right: 10
  },
  card: {
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  titlecard: {
    fontSize: 12,

  },
  button: {
    elevation: 0,
    borderRadius: 100,
    color: "red"
  },
  righticon: {

  },
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
    backgroundColor: '#fff',
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cards: {
    marginTop: 50,
    width: width * 0.9,
    height: height * 0.79
  },
});