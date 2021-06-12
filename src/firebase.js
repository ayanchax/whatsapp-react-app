import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDk6yUFd8xrtmvPtRJK_l9Dy_KHwvJpo7o",
    authDomain: "whatsapp-clone-1590c.firebaseapp.com",
    projectId: "whatsapp-clone-1590c",
    storageBucket: "whatsapp-clone-1590c.appspot.com",
    messagingSenderId: "998631441263",
    appId: "1:998631441263:web:620b759813f1c52a389e9a",
    measurementId: "G-MQKRX4NVMS",
};
// initialize firebase app with the configuration
const firebaseApp = firebase.initializeApp(firebaseConfig);
// connect the app with no sql realtime database called firestore
const db = firebaseApp.firestore();
// set up authentication for firebase
const auth = firebase.auth();
// set up authentication provider as google, the app will let user sign in via google.
const authProvider = new firebase.auth.GoogleAuthProvider();

export { auth, authProvider };
export default db;