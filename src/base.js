import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAX5rARgskRapTBeFfEQyWFbwmYsHfnu-8',
  authDomain: 'dsny-bingo.firebaseapp.com',
  databaseURL: 'https://dsny-bingo.firebaseio.com',
  projectId: 'dsny-bingo',
  storageBucket: 'dsny-bingo.appspot.com',
  messagingSenderId: '200961931056'
}

firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()

export default firebase
