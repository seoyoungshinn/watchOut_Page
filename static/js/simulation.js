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
var des = "";
var danger_msg="";

function getAllDataFromRealTimeDatabaseEnglish(num){
    const dbRef = firebase.database().ref(num.toString());
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            var value = snapshot.val();
            showdesAndTime(value);
            drawResMap(value.lat,value.lon); //tmap.js내 지도 그리는 함수 
            des = value.end;
        } else {
            console.log("No data available");
        }

        lat_arr = value.lat;
        lon_arr = value.lon;

        danger_msg+="<br>This route contains ";
        if(value.turn[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            turn_arr = value.turn;
            var msg = ""
            if(turn_arr.length != 1){
                msg = "s"
            }
            danger_msg+=turn_arr.length+ " junction"+msg;
        }else{
            turn_arr = 0;
        }
       
        if(value.cross[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            cross_arr = value.cross;
            var msg = ""
            if(cross_arr.length != 1){
                msg = "s"
            }
            danger_msg+=" and " + cross_arr.length+ " traffic light"+msg ;
        }else{
            cross_arr = 0;
        }
        

        if(value.elevator[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            elevator_arr = value.elevator;
            danger_msg+=" 엘레베이터 ("+elevator_arr.length+"회)";
        }else{
            elevator_arr = 0;
        }

        if(value.overpass[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            overpass_arr = value.overpass;
            danger_msg+=" 육교 ("+overpass_arr.length+"회)";
        }else{
            overpass_arr = 0;
        }
        
        if(value.underpass[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            underpass_arr = value.underpass;
            danger_msg+=" 지하보도 ("+underpass_arr.length+"회)";
        }else{
            underpass_arr = 0;
        }
        showInfos(value);

    })
    .then(()=>{
            $('#startBtn').css('visibility','visible');
    }).catch((error) => {
        console.error(error);
    });
}

function getAllDataFromRealTimeDatabase(num) {
    const dbRef = firebase.database().ref(num.toString());
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            var value = snapshot.val();
            showdesAndTime(value);
            drawResMap(value.lat,value.lon); //tmap.js내 지도 그리는 함수 
            des = value.end;
        } else {
            console.log("No data available");
        }

        lat_arr = value.lat;
        lon_arr = value.lon;

        if(value.turn[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            turn_arr = value.turn;
            danger_msg+=" 분기점 ("+turn_arr.length+"회)";
        }else{
            turn_arr = 0;
        }
       
        if(value.cross[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            cross_arr = value.cross;
            danger_msg+=" 횡단보도 ("+cross_arr.length+"회)";
        }else{
            cross_arr = 0;
        }
        

        if(value.elevator[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            elevator_arr = value.elevator;
            danger_msg+=" 엘레베이터 ("+elevator_arr.length+"회)";
        }else{
            elevator_arr = 0;
        }

        if(value.overpass[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            overpass_arr = value.overpass;
            danger_msg+=" 육교 ("+overpass_arr.length+"회)";
        }else{
            overpass_arr = 0;
        }
        
        if(value.underpass[0] != "n"){ //turnpoint없으면 첫번째 값이 n임
            underpass_arr = value.underpass;
            danger_msg+=" 지하보도 ("+underpass_arr.length+"회)";
        }else{
            underpass_arr = 0;
        }

        danger_msg+="가 포함된 경로입니다.";
        showInfos(value);

    })
    .then(()=>{
            $('#startBtn').css('visibility','visible');
    }).catch((error) => {
        console.error(error);
    });
}

function showdesAndTime(value) {
    var id = document.getElementById('simultime');
    var startTime = value.start_time;
    var endTime = value.end_time;
    id.textContent = startTime+" ~ "+endTime+" History";

    var id2 = document.getElementById('simulname');
    var startName = value.start;
    var endName = value.end;
    id2.textContent =startName+" -> "+endName;
}

function showInfos(value){
    var id = document.getElementById('resinfo');
    id.innerHTML += "Route Score : "+value.score+" <br><br>";
    id.innerHTML += "Route Length : "+value.length+"m <br>";
    id.innerHTML += danger_msg+"<br><br>";
    id.innerHTML += "Maximum Heart Rate : 108 <br>";
    id.innerHTML += "Average Heart Rate : 80";

}

function startSimulation(){
    //시뮬레이션시작
    var timer1 = setInterval(pushMsg,1000);
    var timer2;
    var i = 0;
    var y = 0;
    var turn_i = 0;
    var cross_i = 0;
    var elevator_i = 0;
    var overpass_i = 0;
    var underpass_i = 0;
    var MsgArr = ["목적지를 입력했습니다.","목적지 : "+des,"길 안내를 시작합니다."];

    var sen = document.getElementById("sentence");


    function pushMsg(){
        sen.innerHTML = MsgArr[y] + '</span>';
        if(y == 2){
            stopTimer(timer1);
            timer2 = setInterval(pushPoint,500);
        }
        y++;
    }


    function pushPoint(){
        addCurrentMarker(lat_arr[i],lon_arr[i]);

        if(i == lat_arr.length){
            sen.innerHTML = "목적지에 도착했습니다.";
            stopTimer(timer2);
        }
        else if(i == parseInt(turn_arr[turn_i])) {
            sen.innerHTML ="분기점을 만났습니다." + '</span><br/>';
            turn_i ++;
        }
        else if(i == parseInt(cross_arr[cross_i])) {
            sen.innerHTML = "횡단보도를 만났습니다." + '</span><br/>';
            cross_i ++;
        }
        else if(i == parseInt(elevator_arr[elevator_i])) {
            sen.innerHTML = "엘레베이터를 만났습니다." + '</span><br/>';
            elevator_i ++;
        }
        else if(i == parseInt(overpass_arr[overpass_i])) {
            sen.innerHTML = "육교를 만났습니다." + '</span><br/>';
            overpass_i ++;
        }
        else if(i == parseInt(underpass_arr[underpass_i])) {
            sen.innerHTML = "지하보도를 만났습니다." + '</span><br/>';
            underpass_i ++;
        }
        else{
            sen.innerHTML = "Pedestrians are on the move" + '</span><br/>';
            underpass_i ++;
        }

        i++;
    }

    function stopTimer(timer){
        clearInterval(timer);
    }
}
