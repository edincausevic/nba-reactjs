import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyADKRbbk_CbqyJnkYEQsrNFE7h1K6XKIvA",
  authDomain: "nba-full-64823.firebaseapp.com",
  databaseURL: "https://nba-full-64823.firebaseio.com",
  projectId: "nba-full-64823",
  storageBucket: "nba-full-64823.appspot.com",
  messagingSenderId: "481420767179"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
  const data = [];
  snapshot.forEach((childSnapshot) => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    })
  })
  return data;
}

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseVideos,
  firebaseTeams,
  firebaseLooper
}