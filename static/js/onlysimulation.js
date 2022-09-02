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
var lat_arr,lon_arr,turn_arr,cross_arr,elevator_arr,overpass_arr,underpass_arr;

function getAllDataFromRealTimeDatabase(num) {
    const dbRef = firebase.database().ref(num.toString());
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            var value = snapshot.val();
            showdesAndTime(value);
            drawResMap(value.lat,value.lon); //tmap.js내 지도 그리는 함수 
        } else {
            console.log("No data available");
        }

        if(value.turn[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            turn_arr = value.turn;
        }else{
            console.log("분기점이 없는 길임");
            turn_arr = 0;
        }
       
        if(value.cross[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            cross_arr = value.cross;
        }else{
            console.log("횡단보도가 없는 길임");
            cross_arr = 0;
        }
        

        if(value.elevator[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            elevator_arr = value.elevator;
        }else{
            console.log("엘베가 없는 길임");
            elevator_arr = 0;
        }

        if(value.overpass[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            overpass_arr = value.overpass;
        }else{
            console.log("육교가 없는 길임");
            overpass_arr = 0;
        }
        
        if(value.underpass[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            underpass_arr = value.underpass;
        }else{
            console.log("지하보도가 없는 길임");
            underpass_arr = 0;
        }

        return value;
    })
    .then((value)=>{
            $('#startBtn').css('visibility','visible');
    }).catch((error) => {
        console.error(error);
    });
}

function showdesAndTime(value) {
    var id = document.getElementById('simultime');
    var startTime = value.start_time;
    var endTime = value.end_time;
    id.textContent = startTime+" ~ "+endTime+"의 History";

    var id2 = document.getElementById('simulname');
    var startName = value.start;
    var endName = value.end;
    id2.textContent =startName+" -> "+endName;
}

function startSimulation(){
    //시뮬레이션시작
    console.log(turn_arr);
}
