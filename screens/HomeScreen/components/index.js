import React from "react";
import { StyleSheet, FlatList, Dimensions, TouchableOpacity, ToastAndroid, View, Image } from "react-native";
import Loader from "../../Loader";
import { Text, Card, Colors, Title, ToggleButton, Paragraph, Button } from "react-native-paper";
import Firebase from "../../../firebase";
import { withNavigation } from "react-navigation";
import _ from 'lodash'
let userid;
export default withNavigation(
  class Home extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        SavedData: [],
        hio: [],
        loading: false,
        isRefreshing: false, 
        InfoData: [],
        top: false
      }
    }
    
    componentDidMount(){
      this.setState({
        loading: true,
      });

      const { uid } = Firebase.auth().currentUser
      userid = uid

      Firebase.database()
        .ref("UsersList/" + uid + "/topiclist/")
        .on("value", (snapshot) => {
            const hio = snapshot.val().map((element) => {
              if (element.selected) {
                const temp = element.name
                  return temp
              }
            })
            this.setState({ hio }); 
      })
      Firebase.database()
        .ref("TopicsData/")
        .on("value", (snapshot) => {
          this.setState({ InfoData : snapshot.val() })
        })

      setTimeout(() => {
        this.setState({
          loading: false,
        })
      }, 2500);
    }

    openWebView = (uri) => {
      this.props.navigation.navigate('WebViewScreen', { uri: uri });
    }

    savelist = (props) => {
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
            )

          } 
          else {
            this.setState({ SavedData: snapshot.val() });
            const arrayitem = snapshot
              .val()
              .filter((itm) => itm.DataArray.id !== props.DataArray.id)
            arrayitem.push(props)

            Firebase.database()
              .ref("UsersList/" + userid)
              .update({
                savedlist: arrayitem,
            })
            this.setState({ SavedData: [] })
            ToastAndroid.showWithGravityAndOffset(
              "Added to Saved List",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            )
          }
      })
    }


    renderItem = ({item}) => {
      if(this.state.hio.includes(item.DataArray.contentType)){
        return( 
          <Card style={styles.card}>
            <TouchableOpacity onPress={() => { this.openWebView(item.DataArray.url) }}>
              <Card.Cover source={{ uri: item.DataArray.images[0] }} blurRadius={1}/>
              <Card.Content >
                <Title style={styles.titlecard}>{item.DataArray.title}</Title>
                <Paragraph style={styles.paracard}>{item.DataArray.description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button>#{item.DataArray.contentType}</Button>
                <ToggleButton
                  style={styles.righticon}
                  icon="heart"
                  color={Colors.pink300}
                  onPress={() => this.savelist(item)}
                ></ToggleButton>
              </Card.Actions>
            </TouchableOpacity>
        </Card>
      )}
    }
    
    onRefresh() {
      this.setState({isRefreshing:true})
      var currentIndex = this.state.InfoData.length, temporaryValue, randomIndex;
      let array = this.state.InfoData
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      this.setState({InfoData:array})
      this.setState({isRefreshing:false})
    }

    upButtonHandler = () => {
      this.ListView_Ref.scrollToOffset({ offset: 0,  animated: true });
      this.setState({ top: false})
    }

    render() {
      const { searchQuery } = this.state;
      return (
        <View style={styles.Container}>
          <Loader loading={this.state.loading} />
          
          <FlatList
            data={this.state.InfoData}
            keyExtractor={(item) => item.DataArray.id.toString()}
            showsVerticalScrollIndicator={false}
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
            //onScrollBeginDrag={() => this.setState({ top: true})}
            //onScroll={() => this.setState({ top: true})}
            
            onScrollToTop={() => this.setState({ top: false})}
            onMomentumScrollBegin={() => this.setState({ top: true})}

            ref={(ref) => {
              this.ListView_Ref = ref;
            }}
            renderItem={this.renderItem}  
            onEndThreshold={0}
          /> 
          {this.state.top &&<TouchableOpacity
            activeOpacity={0.8}
            onPress={this.upButtonHandler}
            style={styles.upButton}>
              <Image
                source={{
                  uri:
                    'https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/13543369451543238868-512.png',
                }}
                style={styles.upButtonImage}
              />
              <Text>Top</Text>
          </TouchableOpacity>}
        </View>
      )
    }
  }
)

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius:5
  },
  titlecard: {
    top:-130,
    fontSize: 22,
    color:'#fff',
    position:'absolute',
    fontWeight:"bold",
    lineHeight: 25,
    letterSpacing:1,
    right:10,
    textShadowColor:'black',
    textShadowOffset:{width: 1, height: 1},
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
  upButtonImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  upButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius:50,
    opacity: 0.7,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 70,
  },
})
