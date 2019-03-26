import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);
const db = firebase.database();

export { firebase, db as default };

// db.ref().set({
//   'user': {
//     name: "ciro",
//     car: "none",
//     money: "100$",
//     life: {
//       drugs: "only cheap ones",
//       women: "only fat girls",
//       father: "free",
//       illness: []
//     }
//   }
// })


// db.ref('user/life/illness').once('value')
//   .then(snapshot => snapshot.val())
//   .then(val => console.log(val))

// db.ref('user/life/illness')
//   .on("value", (snapshot) => {
//     const illness = [];
//     snapshot.forEach((child) => {
//       const body = child.val();
//       const id = child.key;
//       illness.push({
//         id,
//         ...body
//       })
//     })
//     console.log(illness)
//   })

// db.ref('user/life').update({
//   father: 'free man'
// })

// db.ref('user/life/drugs')
//   .remove()
//   .then(console.log("done"))


// db.ref('user').once('value')
//   .then(snapshot => snapshot.val())
//   .then(val => console.log(val))

// db.ref('user/life').on('value', (snapshot) => {
//   console.log(snapshot.val())
// })