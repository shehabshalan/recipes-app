import firebase from 'firebase'
import 'firebase/firestore'
//initalize firebase
var firebaseConfig = {
    apiKey: "AIzaSyBicH0jr7dK1vq5lzGBvU5tYUlJOknGOM4",
    authDomain: "my-recipes-53104.firebaseapp.com",
    databaseURL: "https://my-recipes-53104.firebaseio.com",
    projectId: "my-recipes-53104",
    storageBucket: "my-recipes-53104.appspot.com",
    messagingSenderId: "564348028924",
    appId: "1:564348028924:web:a758ede04082892b081479"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots:true})
export default firebaseApp.firestore()