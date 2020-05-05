import React from "react";
import { Text, StatusBar, StyleSheet, FlatList, Dimensions, ToastAndroid, ActivityIndicator, ImageBackground , TouchableOpacity , View } from "react-native";
import RNUrlPreview from 'react-native-url-preview';
import { Block } from "galio-framework";
import { Card, Colors, ToggleButton } from 'react-native-paper';
import Firebase from "../firebase";
import Loader from './Loader'
const { width, height } = Dimensions.get("screen");
import Constants from 'expo-constants';
import { withNavigation } from "react-navigation";

let userid;
export default withNavigation(
  class SavedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SavedItem: [],
      loading: false,
  };
}

    openWebView = (uri) => {
    this.props.navigation.navigate('WebViewScreen', { uri: uri });
    console.log('uri working')
    console.log(uri);
  };

componentDidMount(){
  const { uid } = Firebase.auth().currentUser;
  userid= uid
  this.setState({
    loading: true
  });
  Firebase.database().ref('UsersList/' + uid).on('value', snapshot => {
    this.setState({ SavedItem: snapshot.val().savedlist })
  
  })
  setTimeout(() => {
    this.setState({
      loading: false,
    });
  }, 2500);
}

savelist = (props) => {
  const arrayitem = this.state.SavedItem.filter(itm => itm.id!==props.id)
  Firebase.database().ref('UsersList/' + userid).update({
      savedlist: arrayitem,
  })
  ToastAndroid.showWithGravityAndOffset(
    'Removed from Saved List',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
}

  render() {
    return (
      <Block flex  style={{ backgroundColor: '#005957'}}>
        <StatusBar 
        translucent={true} 
        backgroundColor={'transparent'} />
        
         <Block center>
        <Loader loading={this.state.loading} />
        <Block middle style={styles.top}>
                  {/* <Text bold size={20} color="#fff">Saved Articles</Text> */}
        </Block>
        <FlatList
          data={this.state.SavedItem}
        //  keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={{ width: width * 0.9, height: height * 0.85}}
        // onRefresh={() => }      
          renderItem={({ item }) => { 
            if(item!=='new'||item!==null){
            return( 
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
                        onPress={ () => this.savelist(item) }
                      ></ToggleButton>
                  }
                  rightStyle={styles.righticon}
                  style={styles.cardsty}
                />
                <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.openWebView(item.link); console.log('clicked'); }}>
                
                <Card.Content style={styles.styleurl} pointerEvents="none">
                  <ActivityIndicator style={styles.loadcards} size="large" color="#741cc7"/> 

                  <RNUrlPreview  
                    text={item.link} 
                    titleStyle={styles.linktitle}
                    containerStyle={styles.linkcontainer}
                    titleNumberOfLines={3}
                    imageStyle={styles.imagesty}
                    descriptionStyle ={styles.linkimage}
                  />
                  <RNUrlPreview  
                    text={item.link} 
                    title={false}
                    containerStyle={styles.linkcontainer}
                    imageStyle={styles.linkimage}
                    descriptionStyle ={styles.discript}
                    descriptionNumberOfLines={4}
                  />
                </Card.Content>
                </TouchableOpacity>

              </Card>
            )}
          }}
        />
        </Block>
      </Block>
    )
  }
}
);

const styles = StyleSheet.create({
 
  card: {
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height:height*0.24
  },
  titlecard: {
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
  },
  righticon: {},
  cardsty: {
    marginTop: -16,
    marginBottom: -16,
  },
  linktitle: {
    fontWeight: "bold",
 //  width:width
  },
  top: {
    marginBottom: 20 ,
    marginTop: Constants.statusBarHeight,
  },
  linkcontainer: {
    backgroundColor: "#fff",
  //   flex: 1,
  //  // flexDirection: "row",
  //   flexWrap: "wrap",
  },
  linkimage: {
    //alignItems: 'flex-end' ,
   // flexDirection: 'row',
   //  justifyContent: 'flex-start' ,
   display:'none'
  },
  imagesty: {
    width:80
  },
  discript: {
//dont remove
  },
  styleurl: {
    flex: 1,
    flexDirection: "column",
  },
  loadcards: {
    position:"absolute",
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
});