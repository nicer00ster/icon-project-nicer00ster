// Initialize Firebase
import * as firebase from 'firebase';
// We'll be storing all our expenses and totals with a realtime database.
  const firebaseConfig = {
    apiKey: "AIzaSyCC63BA3ACjr3GLBrTxm0CL5aRQQfnKpJw",
    authDomain: "icon-project-19913.firebaseapp.com",
    databaseURL: "https://icon-project-19913.firebaseio.com",
    storageBucket: "icon-project-19913.appspot.com"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);



export default firebaseApp;