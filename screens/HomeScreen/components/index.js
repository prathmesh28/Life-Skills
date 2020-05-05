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
import { Searchbar } from "react-native-paper";
import Loader from "../../Loader";
import { Card, Colors, Title, ToggleButton } from "react-native-paper";
import RNUrlPreview from "react-native-url-preview";
const { width, height } = Dimensions.get("screen");
import Firebase from "../../../firebase";
import { Block } from "galio-framework";
import { withNavigation } from "react-navigation";
import _ from 'lodash'
import { contains } from "react-native-redash";
let userid;
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
             // const temp 
              LinkPreview.getPreview(item.link).then(data => {
                this.state.InfoData.push(data);
               // console.log(title)
                //console.log(this.state.InfoData)
                // Firebase.database().ref('InfoData/' ).set({
                //    FullData:this.state.InfoData
                // }).then((data)=>{  console.log("updated")  })
              })
            })
           // console.log(this.state.InfoData)
            // Firebase.database().ref('InfoData/' ).set({
            //   FullData
            // }).then((data)=>{  console.log("updated")  })

            const NewsData = snapshot.val().filter( item =>{
              if(this.state.hio.includes(item.topic)){
                return item
              }
            })
          //  this.setState({ NewsData });

            this.setState({
              NewsData,
              page: 0,
            }, function() {
              this.addRecords(0);
            });
          });
         
        });
      //  console.log(this.state.NewsData)
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 2500);
    }

    addRecords = (page) => {
      const newRecords = []
      for(var i = page * 12, il = i + 12; i < il && i < 
        this.state.NewsData.length; i++){
        newRecords.push(this.state.NewsData[i]);
      }
      this.setState({
        posts: [...this.state.posts, ...newRecords]
      });
    }

    onScrollHandler = () => {
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.addRecords(this.state.page);
      });
    }

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
        return( 
          <Card style={styles.card}>
          <Card.Title
            key={item.id}
            title={item.title}
            titleStyle={styles.titlecard}
            right={(props) => (
              <ToggleButton
                icon="heart"
                color={Colors.pink300}
                //  status={item.Saved}
                onPress={() => this.savelist(item)}
              ></ToggleButton>
            )}
            rightStyle={styles.righticon}
            style={styles.cardsty}
          />
        
          <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.openWebView(item.link); console.log('clicked'); }}>
          <Card.Content style={styles.styleurl} pointerEvents="none">
            <ActivityIndicator
              style={styles.loadcards}
              size="large"
              color="#741cc7"
            />

            <RNUrlPreview
              text={item.link}
              titleStyle={styles.linktitle}
              containerStyle={styles.linkcontainer}
              titleNumberOfLines={3}
              imageStyle={styles.imagesty}
              descriptionStyle={styles.linkimage}
            />
             {/* { LinkPreview.getPreview(item.link).then(data => console.log(data)) } */}
            <RNUrlPreview
              text={item.link}
              title={false}
              containerStyle={styles.linkcontainer}
              imageStyle={styles.linkimage}
              descriptionStyle={styles.discript}
              descriptionNumberOfLines={4}
            />
          </Card.Content>
          </TouchableOpacity>
        </Card>
        )
    }
    
    onRefresh() {
          this.setState({isRefreshing:true})
          var currentIndex = this.state.NewsData.length, temporaryValue, randomIndex;
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
            getItemLayout={(data, index) => (
              {length: height*0.24, offset: height*0.24 * index, index}
            )}     
      //      ListFooterComponent={this.renderFooter.bind(this)}
            renderItem={this.renderItem}  
            onEndReached={this.onScrollHandler}
            onEndThreshold={0}
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
    paddingLeft: 10,
    paddingRight: 10,
    height: height * 0.24,
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
    display: "none",
  },
  imagesty: {
    width: 80,
  },
  discript: {
    //dont remove
  },
  styleurl: {
    flex: 1,
    flexDirection: "column",
  },
  loadcards: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
