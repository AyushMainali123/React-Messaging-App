import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAdtbHNG0B5xroSScXBkAudNzby287LOFM",
  authDomain: "facebook-messenger-clone-77bd5.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-77bd5.firebaseio.com",
  projectId: "facebook-messenger-clone-77bd5",
  storageBucket: "facebook-messenger-clone-77bd5.appspot.com",
  messagingSenderId: "26885019975",
  appId: "1:26885019975:web:b79b1d86b5456539a39462",
  measurementId: "G-TZ0CY58M9Z",
};

const fb = firebase.initializeApp(firebaseConfig);


const db = fb.firestore()
export default db
