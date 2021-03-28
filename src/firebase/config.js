import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyAM0O6R4E5RiuxOpyyHmF6KpCidFoTYUDw",
  authDomain: "hap-db.firebaseapp.com",
  projectId: "hap-db",
  storageBucket: "hap-db.appspot.com",
  messagingSenderId: "932918078034",
  appId: "1:932918078034:web:96d2e14bacd99ad87b4d8b",
};
firebase.initializeApp(firebaseConfig);
var hapAuth = firebase.auth;
var hapDatabase = firebase.database();
var hapFirestore = firebase.firestore();
export { hapAuth };
export { hapDatabase };
export { hapFirestore };
export default hapAuth;
