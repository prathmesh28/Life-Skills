import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  View,
} from "react-native";
import { Card, Colors, ToggleButton } from "react-native-paper";
import RNUrlPreview from "react-native-url-preview";
import { WebView } from "react-native-webview";
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
        News: data,
        NewsData: data,
        showURL: false,
        Saved: false,
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

     //   console.log(this.state.todos)
        //console.log(this.state.)
      result =  this.state.NewsData.filter(element => {
           if(hio.includes(element.topic)){
             return element
           } 
      })
      this.setState({ News:result })
  });


}

list = () => { 
  return this.state.News.map(element => {
       return (
         <Card  style={styles.card}  onPress={() => this.setState({ showURL: true })}>
         <Card.Title
           key={element.id}
           title={element.topic}
           titleStyle={styles.titlecard}
           right={(props) => 
             <ToggleButton
                 icon="heart"
                 color={Colors.pink300}
              //   status={element.Saved}
                 onPress={ () => this.savelist(element)}
               ></ToggleButton>
           }
           rightStyle={styles.righticon}
           style={styles.cardsty}
         />
         <View pointerEvents="none">
       <RNUrlPreview  
         text={element.link} 
         titleStyle={styles.linktitle}
         containerStyle={styles.linkcontainer}
         titleNumberOfLines={2}
         imageStyle={styles.linkimage}
         disable
       />
       </View>
       </Card>
       )
     
  });
 
};


savelist = (props) => {
  console.log("hi")

    Firebase.database().ref('UsersList/' + userid + "/savedlist/").once('value', snapshot => {
    
       // console.log(this.state.SavedData)
       // console.log(props)
       let savecheck
       if(snapshot.val()){
        this.setState({SavedData:snapshot.val()})

        savecheck = this.state.SavedData.find((item) =>  item.id===props.id)
       
       
              
              console.log(savecheck)
              if(savecheck===undefined){
                  //  console.log("not present")
                    this.state.SavedData.push(props)
                    Firebase.database().ref('UsersList/' + userid ).update({
                        savedlist: this.state.SavedData,
                                  }).then((data)=>{
                                      console.log('data ' , data)
                                  }).catch((error)=>{
                                    console.log('error ' , error)
                                  })
              }else{
                console.log("present")
                var array = [...this.state.SavedData]; 
                var index = array.indexOf(savecheck)
                
                if (index !== -1) {
                    array.splice(index, 1);
                    this.setState({SavedData: array});
                }
             //   console.log(this.state.SavedData)
                Firebase.database().ref('UsersList/' + userid ).update({
                savedlist: this.state.SavedData,
                        }).then((data)=>{
                            console.log('data ' , data)
                        }).catch((error)=>{
                          console.log('error ' , error)
                        })
              }
    
      }else{
       this.state.SavedData.push(props)
       Firebase.database().ref('UsersList/' + userid ).update({
      savedlist: this.state.SavedData,
                }).then((data)=>{
                    console.log('data ' , data)
                }).catch((error)=>{
                  console.log('error ' , error)
                })
      }

    })
  
}
  render() {
   
    return (
      <ScrollView
      showsVerticalScrollIndicator={false}
     // style={{ marginBottom:50 }}
    >
        {this.list()}
   
    
    </ScrollView>
    )
    
  }
}
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
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
