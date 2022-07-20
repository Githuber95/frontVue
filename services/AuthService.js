import firebase from "@/firebase/config";

class AuthService {
  signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth().signOut();
  }

  
}

export default new AuthService();