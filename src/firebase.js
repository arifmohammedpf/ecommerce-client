import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFdoojGP53dDPx3Ove5wi4RAtEab1egrs",
    authDomain: "ecommerce-9d3bd.firebaseapp.com",
    projectId: "ecommerce-9d3bd",
    storageBucket: "ecommerce-9d3bd.appspot.com",
    messagingSenderId: "247710031647",
    appId: "1:247710031647:web:fcd03e9228b35faea0da2a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//export
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()