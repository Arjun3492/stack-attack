import firebase from "firebase";
require("dotenv").config();

const firebaseConfig = {
    apiKey: process.env.REACT_FB_API_KEY,
    authDomain: process.env.REACT_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_FB_PROJECT_ID,
    storageBucket: process.env.REACT_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_FB_APP_ID,
    measurementId: process.env.REACT_FB_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth };
export default firebase;

