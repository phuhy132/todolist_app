import fire from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXAa7FAsQAh9TGsJHqpORLDfU69sd-Wu4",
  authDomain: "react-native-af92f.firebaseapp.com",
  databaseURL: "https://react-native-af92f.firebaseio.com",
  projectId: "react-native-af92f",
  storageBucket: "react-native-af92f.appspot.com",
  messagingSenderId: "510110669437",
  appId: "1:510110669437:web:a01f521ec13988ed66af14",
  measurementId: "G-H11JL29V74",
};

// Initialize Firebase

class Firebase {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!fire.apps.length) {
      fire.initializeApp(firebaseConfig);
    }
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        fire
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getList(callback) {
    let ref = fire
      .firestore()
      .collection("users")
      .doc(this.userID)
      .collection("lists");
    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];
      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }
  get userID() {
    return fire.auth().currentUser.uid;
  }
  detach() {
    this.unsubscribe();
  }
}

export default Firebase;
