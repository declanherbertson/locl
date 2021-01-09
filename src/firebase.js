import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'


var firebaseConfig = {
  apiKey: "AIzaSyAp_8zvzTP3Vj8BVukNL5kKdO6FNARWHug",
  authDomain: "locl-dd878.firebaseapp.com",
  projectId: "locl-dd878",
  storageBucket: "locl-dd878.appspot.com",
  messagingSenderId: "423912732964",
  appId: "1:423912732964:web:24fff3a4351f818fa21bb1",
  measurementId: "G-8LDB587MMD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
