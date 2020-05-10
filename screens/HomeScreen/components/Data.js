
// componentDidMount() {
//     this.setState({
//         loading: true,
//     });
//     const { uid } = Firebase.auth().currentUser;
//     userid = uid;
 
//     Firebase.database()
//     .ref("UsersList/" + uid + "/topiclist/")
//     .on("value", (snapshot) => {
//         const hio = snapshot.val().map((element) => {
//             if (element.selected) {
//                 const temp = element.name;
//                 return temp;
//             }
//         });
//         this.setState({ hio }); 

      
//     });
//     Firebase.database()
//       .ref("/topiclist/")
//       .once("value", (snapshot) => {
//         this.setState({ NewsData: snapshot.val() })

//         snapshot.val().map( item => {
//           LinkPreview.getPreview(item.link).then(data => {
//             let DataArray = data
//             DataArray.id = item.id
//             DataArray.contentType = item.topic
//             this.state.InfoData.push(DataArray)
//           })
//         })

//       });
//     setTimeout(() => {
//       this.setState({
//         loading: false,
//       });
//     }, 2500);
// }
// export default{
    
// }