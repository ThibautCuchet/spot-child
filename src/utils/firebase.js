import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAbL6axcC-bjWs0gG5e1F4OM2zV0RRcBOg",
  authDomain: "child-spot.firebaseapp.com",
  databaseURL: "https://child-spot.firebaseio.com",
  projectId: "child-spot",
  storageBucket: "child-spot.appspot.com",
  messagingSenderId: "51857483336",
  appId: "1:51857483336:web:593649dee77133c84d1a7d",
};

firebase.initializeApp(config);

export default firebase;
