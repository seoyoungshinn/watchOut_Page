//MQTT관련 변수
var mqtt;
var reconnectTimeout = 2000;
var host = "15.165.174.55"
var port = 9001;
var isConnected = false;

//심박수
var exHeartRate = 0;
var nowHeartRate = 0;

var fourScore;

/*------------------MQTT--------------------*/
function onConnect() {
    console.log("접속 완료");
    document.getElementById("state").innerHTML = '접속 완료';
    isConnected = true;

    subscribe("selectedRouteInfor")
    //subscribe("route");
    subscribe("preference")
    subscribe("now");
    subscribe("saftyScore");
    subscribe("des");
    subscribe("topic");
    subscribe("route_res");
    //subscribe("mid");

}

function onFailure(message) {
    document.getElementById("state").innerHTML = '접속 실패';
    console.log("접속 실패");
    setTimeout(mqttConnection, reconnectTimeout);
}

function onConnectionLost(responseObject) {
    console.log("접속 끊김");
    document.getElementById("state").innerHTML = '접속 끊김';
    if (responseObject.errorCode !== 0) {
        console.log("접속 끊긴 이유:" + responseObject.errorMessage);
    }
}

function onMessageArrived(msg) {
    switch (msg.destinationName) {
        
        case "selectedRouteInfor":
            saveMsg("selectedRouteInfor",msg.payloadString);
            break;

        //4가지경로 점수테이블
        case "saftyScore":
            saveMsg("saftyScore",msg.payloadString);
            break;

        case "preference": 
            //도로상태,위험시설,분기점,횡단보도,차도비분리,차도분리
            saveMsg("preference",msg.payloadString);
            break;

        case "des":
            document.getElementById("des").innerHTML = msg.payloadString + '</span>';
            break;

        //출력되는 메시지
        case "topic":
            document.getElementById("topic").innerHTML += msg.payloadString + '</span><br/>';
            break;

        //4가지 경로
        case "route":
            if (msg.payloadString == "restart") {
                console.log("restart");

                $('#fourMap').css('display', 'block');
                $('#resMap').css('display', 'block');

                var fMap = document.getElementById("fourMap");
                var rMap = document.getElementById("resMap");
                var sTables = document.getElementById("saftyTables");
                var btn = document.getElementById("btn");
                var heart = document.getElementById("heartDiv");

                fMap.innerHTML = '';
                rMap.innerHTML = '';
                sTables.innerHTML = '';
                heart.innerHTML = '';
                btn.innerHTML = '';

                break;
            }
            else if (msg.payloadString == "out") {
                var fMap = document.getElementById("fourMap");
                var rMap = document.getElementById("resMap");
                var sTables = document.getElementById("saftyTables");
                var btn = document.getElementById("btn");
                var heart = document.getElementById("heartDiv");

                fMap.innerHTML = '';
                rMap.innerHTML = '';
                sTables.innerHTML = '';
                heart.innerHTML = '';
                btn.innerHTML = ''; 

                document.getElementById("topic").innerHTML += "경로를 이탈하여 목적지를 재검색합니다" + '</span><br/>';
                break;
            }

            var arr_lat = [];
            var arr_lon = [];
            var split = msg.payloadString.split("!");

            for (var i = 0; i < split.length; i++) {
                var box = split[i].split("/")
                arr_lat[i] = box[0];
                arr_lon[i] = box[1];
            }

            saveMapData(arr_lat, arr_lon);
            document.getElementById("btn").innerHTML += '<div class="map_act_btn_wrap clear_box" style="position: absolute;z-index: 1;padding-left: 10px;"><button onclick="MapType(\'ROAD\')">ROAD</button><button onclick="MapType(\'HYBRID\')">HYBRID</button></div>';
            break;


        //알고리즘으로 고른 경로

        case "route_res":
            var lat_res = [];
            var lon_res = [];

            var split = [];
            split = msg.payloadString.split('/');

            lat_res = split[0].split(',');
            lon_res = split[1].split(',');

            drawResMap(lat_res, lon_res);
            addStartEndMarker(lat_res, lon_res);
            document.getElementById("topic").innerHTML += "알고리즘으로 선택된 길과 현재위치를 볼려면 라디오 버튼을 클릭하세요" + '</span><br/>';
            break;

        case "now":
            console.log(msg.payloadString);
            var arr_now = msg.payloadString.split(',');
            //현재위치 갱신
            addCurrentMarker(arr_now[0], arr_now[1]);

            //심박수 갱신
            nowHeartRate = arr_now[2];
            if (nowHeartRate != exHeartRate) {
                exHeartRate = nowHeartRate;
                addHeartRate(nowHeartRate);
            }
            break;

        case "mid":
            var lat_res = [];
            var lon_res = [];

            var split = [];
            split = msg.payloadString.split('/');

            lat_res = split[0].split(',');
            lon_res = split[1].split(',');

            getMid(lat_res,lon_res);

            break;

    }
}

var topicSave;
function subscribe(topic) {
    if (mqtt == null) return;
    if (isConnected != true) {
        topicSave = topic;
        window.setTimeout("subscribe(topicSave)", 500);
        return
    }

    mqtt.subscribe(topic);
}


function mqttConnection() {

    mqtt = new Paho.MQTT.Client(host, port, "javascript_client");

    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure
    };

    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnectionLost = onConnectionLost;

    mqtt.connect(options);
}
