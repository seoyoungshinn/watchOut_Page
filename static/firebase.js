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

//login페이지에서 uid 받아오기
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
    var UID = getParameterByName('uid'); 
    console.log(UID)


//해당 uid의 파이어스토어에 연결
function showDB(){
        var docRef = db.collection("PersonalData").doc(UID).collection("Favorites").doc("영심이네");

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        }); 
}
