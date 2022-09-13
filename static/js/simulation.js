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

        lat_arr = value.lat;
        lon_arr = value.lon;

        console.log(lat_arr);
        console.log(lon_arr);

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
    var timer1 = setInterval(pushMsg,1000);
    var i = 0;
    var y = 0;
    var turn_i = 0;
    var cross_i = 0;
    var elevator_i = 0;
    var overpass_i = 0;
    var underpass_i = 0;
    var MsgArr = ["목적지를 입력했습니다.","목적지:동성중학교","길 안내를 시작합니다."];



    function pushMsg(){
        document.getElementById("sentence").innerHTML = MsgArr[y] + '</span><br/>';
        console.log(MsgArr[y]);
        if(y == 2){
            stopTimer(timer1);
        }
        y++;
    }

    var timer2 = setInterval(pushPoint,500);

    function pushPoint(){
        addCurrentMarker(lat_arr[i],lon_arr[i]);

        if(i == lat_arr.length){
            stopTimer(timer2);
        }
        else if(i == parseInt(turn_arr[turn_i])) {
            document.getElementById("sentence").innerHTML = "분기점을 만났습니다" + '</span><br/>';
            console.log("분기점을 만났습니다");
            turn_i ++;
        }
        else if(i == parseInt(cross_arr[cross_i])) {
            document.getElementById("sentence").innerHTML = "횡단보도를 만났습니다" + '</span><br/>';
            console.log("분기점을 만났습니다");
            cross_i ++;
        }
        else if(i == parseInt(elevator_arr[elevator_i])) {
            document.getElementById("sentence").innerHTML = "엘레베이터를 만났습니다" + '</span><br/>';
            console.log("분기점을 만났습니다");
            elevator_i ++;
        }
        else if(i == parseInt(overpass_arr[overpass_i])) {
            document.getElementById("sentence").innerHTML = "육교를 만났습니다" + '</span><br/>';
            console.log("분기점을 만났습니다");
            overpass_i ++;
        }
        else if(i == parseInt(underpass_arr[underpass_i])) {
            document.getElementById("sentence").innerHTML = "지하보도를 만났습니다" + '</span><br/>';
            console.log("분기점을 만났습니다");
            underpass_i ++;
        }

        i++;
    }

    function stopTimer(timer){
        clearInterval(timer);
    }
}
