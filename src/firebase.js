import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCKltQf1BsoHqCbvmARIbCc_jnMb2FhjU0",
    authDomain: "golden-elegance.firebaseapp.com",
    databaseURL: "https://golden-elegance.firebaseio.com",
    projectId: "golden-elegance",
    storageBucket: "golden-elegance.appspot.com",
    messagingSenderId: "990214156587",
    appId: "1:990214156587:web:f5d677393f300be737d56e",
    measurementId: "G-GX98V16XNP"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };