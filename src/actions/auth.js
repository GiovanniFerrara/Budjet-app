import { firebase, authProvider } from '../firebase/firebase';

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(authProvider)
  }
}

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut()
  }
}