import React from "react";
import { Text, StatusBar, StyleSheet, FlatList, Dimensions, ToastAndroid, ActivityIndicator, ImageBackground , TouchableOpacity , View } from "react-native";
import { Block } from "galio-framework";
import { Card, Colors, Title, ToggleButton, Paragraph, Button, Searchbar } from "react-native-paper";
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
  this.arrayholder = [];
  }

  componentDidMount(){
    const { uid } = Firebase.auth().currentUser;
    userid= uid

    this.setState({
      loading: true
    })

    Firebase.database().ref('UsersList/' + uid).on('value', snapshot => {
      if(snapshot.val().savedlist === "new"){
        this.setState({ SavedItem: [] })
      }else{
        this.arrayholder = snapshot.val().savedlist;
        this.setState({ SavedItem: snapshot.val().savedlist })
      }
    })

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 0);
  }


  searchFilterFunction = text => {
    this.setState({
      value: text,
    })
    if(this.arrayholder !== undefined){
      const newData = this.arrayholder.filter(item => {
      const itemData = `${item.DataArray.title.toUpperCase()}`
      const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      this.setState({
        SavedItem: newData,
      });
    }
  }

  openWebView = (uri) => {
    this.props.navigation.navigate('WebViewScreen', { uri: uri })
  }

  savelist = (props) => {
    const arrayitem = this.state.SavedItem.filter(itm => itm.DataArray.id!==props.DataArray.id)
    Firebase.database().ref('UsersList/' + userid).update({
      savedlist: arrayitem,
    })
    ToastAndroid.showWithGravityAndOffset(
      'Removed from Saved List',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    )
  }

  ListEmpty = () => {
    return (
      <View style={{ marginTop:20 }}>
        <Text style={{ 
              fontSize: 22,
              position:'relative',
              color:'#fff',
              letterSpacing:1,
              textAlign:'center',
              textShadowColor:'#fff',
              textShadowOffset:{width: 0, height: 0},
              textShadowRadius:20, 
         }}>Saved Articles will appear here.</Text>
      </View>
    )
  }


  renderItem = ({item}) => {
    return( 
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => { this.openWebView(item.DataArray.url) }}>
          <Card.Cover source={{ uri: item.DataArray.images[0] }}  blurRadius={1}/>
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
    )
  }
  render() {
    return (
      <Block flex  style={{ backgroundColor: '#fff'}}>
        <StatusBar 
        translucent={true} 
        backgroundColor={'transparent'} />
        
        <Loader loading={this.state.loading} />
        <ImageBackground
          source={require("../assets/backbg.jpg")}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}>
          <Block style={{ 
                height: height*0.1, 
                paddingTop: Constants.statusBarHeight,
                justifyContent:'center'
                }}>
            
            <Text style={{ 
                fontWeight: 'bold',
                fontSize: 24,
                position:'relative',
                color:'#fff',
                letterSpacing:1,
                textAlign:'center',
                textShadowColor:'black',
                textShadowOffset:{width: 0, height: 0},
                textShadowRadius:20, 
                }}>Saved Articles</Text>
            </Block>
            <Block center>
            <Searchbar
              placeholder="Search Articles..."
              lightTheme
              round
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              value={this.state.value}
              style={{marginHorizontal:20,marginBottom:10}}
            />

            <Block style={{ width: width * 0.9, height: height * 0.77}}>
            <FlatList
              data={this.state.SavedItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.DataArray.id.toString()}
              ListEmptyComponent={this.ListEmpty}
              renderItem={this.renderItem}  
            />
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    )
  }
})

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  titlecard: {
    top:-130,
    fontSize: 22,
    color:'#fff',
    position:'absolute',
    fontWeight:"bold",
    lineHeight: 25,
    letterSpacing:1,
    right:0,
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
  profileContainer: {
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height,
    
  },
});