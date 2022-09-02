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
function getAllDataFromRealTimeDatabase(des) {
    const dbRef = firebase.database().ref(des);
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val().elevator);

            drawResMap(snapshot.val().lat,snapshot.val().lon); //tmap.js내 지도 그리는 함수 
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function showSimulName(history) {
    var id = document.getElementById('');
    var atime = history.departureTime;
    var dtime = history.arrivedTime;
    id.innerHTML = dtime+" ~ "+atime+"의 History";

    var id2 = document.getElementById('routename');
    var aname = history.arrivedName;
    var dname = history.dpName;
    id2.innerHTML = dname+" -> "+aname;
}
