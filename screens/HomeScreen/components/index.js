import React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  View,

  ActivityIndicator,
} from "react-native";
// import { Searchbar } from "react-native-paper";
import Loader from "../../Loader";
import { Card, Colors, Title, ToggleButton, Paragraph, Searchbar, Button } from "react-native-paper";
import RNUrlPreview from "react-native-url-preview";
const { width, height } = Dimensions.get("screen");
import Firebase from "../../../firebase";
import { Block } from "galio-framework";
import { withNavigation } from "react-navigation";
import _ from 'lodash'
import { contains } from "react-native-redash";
let userid;
//let DataArray = []
import LinkPreview from 'react-native-link-preview';

export default withNavigation(
  class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        NewsData: [],
        SavedData: [],
        searchQuery: "",
        hio: [],
        loading: false,
        listloading: false, // user list loading
        isRefreshing: false, 
        page: 0,
        posts: [],
        InfoData: []
      };
    }
    onChangeSearch = (query) => {
      this.setState({ searchQuery: query });
    };

    openWebView = (uri) => {
      this.props.navigation.navigate('WebViewScreen', { uri: uri });
      console.log(uri)
    }
    
    componentDidMount() {
        this.setState({
            loading: true,
        });
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
            this.setState({ hio }); 

          Firebase.database()
          .ref("/topiclist/")
          .once("value", (snapshot) => {
            snapshot.val().map( item => {
              LinkPreview.getPreview(item.link).then(data => {
                let DataArray = data
                DataArray.contentType = item.topic
                this.state.InfoData.push(DataArray)
              })
            })
          });
        });
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 2500);
    }

    // addRecords = (page) => {
    //   const newRecords = []
    //   for(var i = page * 12, il = i + 12; i < il && i < 
    //     this.state.NewsData.length; i++){
    //     newRecords.push(this.state.NewsData[i]);
    //   }
    //   this.setState({
    //     posts: [...this.state.posts, ...newRecords]
    //   });
    // }

    // onScrollHandler = () => {
    //   this.setState({
    //     page: this.state.page + 1
    //   }, () => {
    //     this.addRecords(this.state.page);
    //   });
    // }

    savelist = (props) => {
      console.log("hi");

      Firebase.database()
        .ref("UsersList/" + userid + "/savedlist/")
        .once("value", (snapshot) => {
          if (snapshot.val() === "new" || snapshot.val() === null) {
            this.state.SavedData.push(props);
            Firebase.database()
              .ref("UsersList/" + userid)
              .update({
                savedlist: this.state.SavedData,
              });
            ToastAndroid.showWithGravityAndOffset(
              "Added to Saved List",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          } else {
            this.setState({ SavedData: snapshot.val() });
            const arrayitem = snapshot
              .val()
              .filter((itm) => itm.id !== props.id);
            arrayitem.push(props);
            Firebase.database()
              .ref("UsersList/" + userid)
              .update({
                savedlist: arrayitem,
              });
            this.setState({ SavedData: [] });
            ToastAndroid.showWithGravityAndOffset(
              "Added to Saved List",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }
        });
    };


    renderItem = ({item}) => {
      if(this.state.hio.includes(item.contentType)){
        return( 
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.images[0] }} />
            <Card.Content >
              <Title style={styles.titlecard}>{item.title}</Title>
              <Paragraph style={styles.paracard}>{item.description}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>#{item.contentType}</Button>
      <ToggleButton
                style={styles.righticon}
                icon="heart"
                color={Colors.pink300}
                //  status={item.Saved}
               // onPress={() => this.savelist(item)}
              ></ToggleButton>
    </Card.Actions>
         
        </Card>
        )}
    }
    
    onRefresh() {
          this.setState({isRefreshing:true})
          var currentIndex = this.state.InfoData.length, temporaryValue, randomIndex;
          console.log(currentIndex)
          let array = this.state.NewsData
          while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          this.setState({NewsData:array})
          this.setState({isRefreshing:false})
    }
    // renderFooter = () => {
    //   //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    //     if (!this.state.listloading) return null;
    //    return (
    //      <ActivityIndicator
    //        style={{ color: '#000' }}
    //      />
    //    );
    //  };
    //  handleLoadMore = () => {
    //   this.setState({isRefreshing:true})
    // };

    render() {
      const { searchQuery } = this.state;
      return (
        <View style={styles.Container}>
          <Loader loading={this.state.loading} />
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={(text) => this.onChangeSearch(text)}
            value={searchQuery}
          />
          <FlatList
            data={this.state.InfoData}
        //    keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
            // getItemLayout={(data, index) => (
            //   {length: height*0.14, offset: height*0.14 * index, index}
            // )}     
      //      ListFooterComponent={this.renderFooter.bind(this)}
            renderItem={this.renderItem}  
          //  onEndReached={this.onScrollHandler}
          //  onEndThreshold={0}
         //    onEndReached={this.handleLoadMore.bind(this)}
           
          /> 
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    
  },
  titlecard: {
    top:-100,
    fontSize: 22,
    color:'#fff',
    position:'absolute',
    fontWeight:"bold",
   // textShadowOffset:{width: -1,height: -1},
    lineHeight: 25,
    letterSpacing:1,
    // textShadowColor: "#808088",
    // textShadowRadius: 2,
    
    right:20,
    textShadowColor:'black',
    textShadowOffset:{width: 0, height: 0},
    textShadowRadius:20,
   
  },
  paracard: {
    paddingTop:10,
    lineHeight: 17,
    letterSpacing:0.7,
  },
  righticon: {
    right:10,
    position:"absolute"
  },
  // cardsty: {
  //   marginTop: -16,
  //   marginBottom: -16,
  // },
  // linktitle: {
  //   fontWeight: "bold",
  //   //  width:width
  // },
  // linkcontainer: {
  //   backgroundColor: "#fff",
  //   //   flex: 1,
  //   //  // flexDirection: "row",
  //   //   flexWrap: "wrap",
  // },
  // linkimage: {
  //   //alignItems: 'flex-end' ,
  //   // flexDirection: 'row',
  //   //  justifyContent: 'flex-start' ,
  //   display: "none",
  // },
  // imagesty: {
  //   width: 80,
  // },
  // discript: {
  //   //dont remove
  // },
  // styleurl: {
  //   flex: 1,
  //   flexDirection: "column",
  // },
  // loadcards: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
