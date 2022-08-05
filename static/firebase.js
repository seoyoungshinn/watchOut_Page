// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
// 	  const firebaseConfig = {
// 		apiKey: "AIzaSyAdfT9fZDJFN4II45NITCqBGpguzVrls5U",
// 		authDomain: "watchout-5da32.firebaseapp.com",
// 		databaseURL: "https://watchout-5da32-default-rtdb.firebaseio.com",
// 		projectId: "watchout-5da32",
// 		storageBucket: "watchout-5da32.appspot.com",
// 		messagingSenderId: "559553548409",
// 		appId: "1:559553548409:web:647b935251b767e69c84a8",
// 		measurementId: "G-YTFRDPWZGD"
// 	  };
	
// 	  // Initialize Firebase
// 	  const app = initializeApp(firebaseConfig);

//  const db = firebase.firestore();
//  db.collection('Favorites').get().then((결과)=>{
//     console.log(결과);
// })


const firebaseConfig = {
    apiKey: "AIzaSyAdfT9fZDJFN4II45NITCqBGpguzVrls5U",
    authDomain: "watchout-5da32.firebaseapp.com",
    databaseURL: "https://watchout-5da32-default-rtdb.firebaseio.com",
    projectId: "watchout-5da32",
    storageBucket: "watchout-5da32.appspot.com",
    messagingSenderId: "559553548409",
    appId: "1:559553548409:web:647b935251b767e69c84a8",
    measurementId: "G-YTFRDPWZGD"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function showDB(){
    db.collection('Favorites').get().then((결과)=>{
        console.log(결과);
        })
}
