import firebase from 'firebase'
const env = require("../config/env.json")
// const envJson = env['test']
const envJson = env['prod']
const firebaseConfig = {
  apiKey: envJson.firebase.apiKey,
  authDomain: envJson.firebase.authDomain,
  projectId: envJson.firebase.projectId,
  storageBucket: envJson.firebase.storageBucket,
  messagingSenderId: envJson.firebase.messagingSenderId,
  appId: envJson.firebase.appId
};
  
firebase.initializeApp(firebaseConfig);

export default firebase; 