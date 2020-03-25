import firebase from "firebase";
const Config = {
  apiKey: "AIzaSyBNDBRCJY2NRkqtm5Njf5DwoUzfy5NHsck",
  authDomain: "life-skills-87c6e.firebaseapp.com",
  databaseURL: "https://life-skills-87c6e.firebaseio.com",
  projectId: "life-skills-87c6e",
  storageBucket: "life-skills-87c6e.appspot.com",
  messagingSenderId: "152119177283",
  appId: "1:152119177283:web:f8a695a710b3272e34e4f6"
};
  // Initialize Firebase
const Firebase = firebase.initializeApp(Config);
export default Firebase;