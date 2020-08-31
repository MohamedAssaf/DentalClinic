import * as firebase from "firebase/app";
import "firebase/auth";

// Your app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNREkLKEc5ZbBXGeDRGceq3gyyd08m1bI",
    authDomain: "kmdc-2064c.firebaseapp.com",
    databaseURL: "https://kmdc-2064c.firebaseio.com",
    projectId: "kmdc-2064c",
    storageBucket: "kmdc-2064c.appspot.com",
    messagingSenderId: "516439951480",
    appId: "1:516439951480:web:d98ad78d271ac022f9458d",
    measurementId: "G-CHDF43P3P1"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;