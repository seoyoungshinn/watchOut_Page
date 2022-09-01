/*firebase설정키*/
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

  /*firestore에서 db가져옴*/
firebase.initializeApp(firebaseConfig);

/* ------------------RealTimeDatabase-------------------- */
//json으로 저장된 dong아래 lat이랑 lon배열 가져옴
function getAllDataFromRealTimeDatabase() {
    const dbRef = firebase.database().ref('dong');
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val().lat[2]); //lat배열
            console.log(snapshot.val().lon); //lon배열
            console.log(snapshot.val().start);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
  }