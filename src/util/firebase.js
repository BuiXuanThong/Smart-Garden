import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

firebase.initializeApp({
    apiKey: "AIzaSyDRZvf7dH9KAgXdPlMq4Trlog_Bkl0HMTk",
    authDomain: "myfirebase-dbb.firebaseapp.com",
    databaseURL: "https://myfirebase-dbb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "myfirebase-dbb",
    storageBucket: "myfirebase-dbb.appspot.com",
    messagingSenderId: "810962833205",
    appId: "1:810962833205:web:c578adcabb39da5ff2c67c",
    measurementId: "G-MEYQ2LPGNJ"
});


export const firestore = firebase.database()
export const auth = firebase.auth()
export default firebase