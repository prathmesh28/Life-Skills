import firebase from "firebase";
const Config = {
  apiKey: "AIzaSyCAqsboP9ozpTEgcXPzPTHbFlOsH8mQs7k",
  authDomain: "sem-project-cf70a.firebaseapp.com",
  databaseURL: "https://sem-project-cf70a.firebaseio.com",
  projectId: "sem-project-cf70a",
  storageBucket: "sem-project-cf70a.appspot.com",
  messagingSenderId: "914543804917",
  appId: "1:914543804917:web:9e13265a3da7b6bc8b60bc",
  measurementId: "G-QB6TFHH503"
};
  // Initialize Firebase
const Firebase = firebase.initializeApp(Config);
export default Firebase;