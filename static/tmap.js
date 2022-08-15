        //MQTT관련 변수
        var mqtt; 
		var reconnectTimeout = 2000;
		var host = "15.165.174.55"
		var port = 9001;
		var isConnected = false;

        //Tmap지도 관련 변수
        var index = 0;
        var fourMap,resMap;
        var markers = []; 
        var exHeartRate = 0;
        var nowHeartRate = 0;
        var color = ["#00FFFF","#FF1493", "#2F4F4F", "#ADFF2F"];

        /*------------------MQTT--------------------*/ 
		function onConnect(){
			console.log("접속 완료");
            document.getElementById("state").innerHTML = '접속 완료';
			isConnected = true;

            subscribe("des");
			subscribe("topic");
            subscribe("vibe");
            subscribe("route");
            subscribe("route_res");
            subscribe("now");
            subscribe("saftyScore");
                      
		}
		
		function onFailure(message){
            document.getElementById("state").innerHTML = '접속 실패';
			console.log("접속 실패");
			setTimeout( mqttConnection,reconnectTimeout);
		}
        
        function onConnectionLost(responseObject) { 
			console.log("접속 끊김");
            document.getElementById("state").innerHTML = '접속 끊김';
			if (responseObject.errorCode !== 0) {
				console.log("접속 끊긴 이유:" + responseObject.errorMessage);
			}
		}

		function onMessageArrived(msg){
            switch(msg.destinationName){

                //4가지경로 점수테이블
                case "saftyScore":
                    drawTypeTable();
                    var split = msg.payloadString.split("!");
                    //var safty = []; 
                    for(var i = 0 ; i<split.length ; i++){
                        var safty = split[i].split(",");
                        drawDataTables(i,safty); //4개 표
                    }
                    break;

                case "ectData":
                    document.getElementById("ect").innerHTML += msg.payloadString;
                    break;

                case "des":            
                    document.getElementById("topic").innerHTML += '목적지: ' + msg.payloadString + '</span><br/>';
                break;

                //출력되는 메시지
                case "topic":  
                    document.getElementById("topic").innerHTML += msg.payloadString + '</span><br/>';
                break;

                //4가지 경로
                case "route":
                    if(msg.payloadString == "restart"){
                        console.log("restart");
                        $('input:radio[name=myname]').prop('checked',false);

                        $('#fourMap').css('display','block');
				        $('#resMap').css('display','block');

                       var fMap =  document.getElementById("fourMap");
                       var rMap =  document.getElementById("resMap");
                       var sTables =  document.getElementById("saftyTables");
                       fMap.innerHTML = '';
                       rMap.innerHTML = '';
                       sTables.innerHTML = '';

                        break;
                    }
                    else if (msg.payloadString == "out"){
                        var fMap =  document.getElementById("fourMap");
                       var rMap =  document.getElementById("resMap");
                       var sTables =  document.getElementById("saftyTables");
                       fMap.innerHTML = '';
                       rMap.innerHTML = '';
                       sTables.innerHTML = '';

                        document.getElementById("topic").innerHTML += "경로를 이탈하여 목적지를 재검색합니다" + '</span><br/>';
                        break;
                    }

                    console.log(msg.payloadString);
                    var arr_lat = [];
                    var arr_lon = [];
                    var split = msg.payloadString.split("!"); 

                    for(var i = 0 ; i < split.length ; i++){
                        var box = split[i].split("/")
                        arr_lat[i] = box[0];
                        arr_lon[i] = box[1];
                    }
                   fourMap =  drawFourMap(arr_lat,arr_lon);
                   document.getElementById("both").checked= true;
                   document.getElementById("btn").innerHTML +='<div class="map_act_btn_wrap clear_box" style="position: absolute;z-index: 1;padding-left: 10px;"><button onclick="MapType(\'ROAD\')">ROAD</button><button onclick="MapType(\'HYBRID\')">HYBRID</button></div>';
                    break;
                    

                //알고리즘으로 고른 경로
                
                case "route_res":
                    var lat_res = [];
                    var lon_res = [];

                    console.log(msg.payloadString);
                    var split =[];
                    split = msg.payloadString.split('/');

                    lat_res = split[0].split(',');
                    lon_res = split[1].split(',');
                   
                    resMap = drawResMap(lat_res,lon_res);
                    addStartEndMarker(lat_res,lon_res,resMap);
                    document.getElementById("topic").innerHTML += "알고리즘으로 선택된 길과 현재위치를 볼려면 라디오 버튼을 클릭하세요" + '</span><br/>';
                    break;
               
                case "now":  
                var arr_now = msg.payloadString.split(','); 
                //현재위치 갱신
                addCurrentMarker(resMap,arr_now[0],arr_now[1]);

                //심박수 갱신
                nowHeartRate = arr_now[2];
                if(nowHeartRate != exHeartRate){
                    exHeartRate = nowHeartRate;
                    addHeartRate(nowHeartRate);
                }
                break;

            }
    }
		
		var topicSave;
		function subscribe(topic) {
		    if(mqtt == null) return;
		    if(isConnected != true) {
		        topicSave = topic;
		        window.setTimeout("subscribe(topicSave)", 500);
		        return
		    }

		    mqtt.subscribe(topic); 
		}

		
		function mqttConnection(){
			
			mqtt = new Paho.MQTT.Client(host,port,"javascript_client");
			
			var options = {
					timeout:3,
					onSuccess:onConnect, 
					onFailure:onFailure
			};
			
			mqtt.onMessageArrived =  onMessageArrived;
			mqtt.onConnectionLost = onConnectionLost;
			
			mqtt.connect(options);
		}
        


    /*------------Tmap 지도------------*/ 

        //경로 4가지 그리는 지도
        function drawFourMap(arr_lat,arr_lon){  
            var lat1 = arr_lat[0].split(",");
            var lon1 = arr_lon[0].split(",");      
            
            var i = Math.floor((lat1.length/2)); 
            var latitude =  lat1[i];
            var longitude = lon1[i];

           var map = new Tmapv2.Map("fourMap",  
            {
                center: new Tmapv2.LatLng(latitude,longitude),
                width: "890px", //크기바꾸는곳
                height: "500px",
                zoom: 14
            });
            
            for(var j = 0 ; j < arr_lat.length ; j++ ){
                var line_lat = [];
                var line_lon = [];

                line_lat = arr_lat[j].split(",");
                line_lon = arr_lon[j].split(",");

                var ar_line = [];
                
                for (var k = 0; k < line_lat.length; k++) {
				    var startPt = new Tmapv2.LatLng(line_lat[k],line_lon[k]);
				    ar_line.push(startPt);
			    }
                var polyline = new Tmapv2.Polyline({
                path: ar_line, 
                strokeColor: color[j],
                strokeWeight: 5,
                map: map
                });
            }

            return map;

        } 

        //최종경로 + 현재 위치 찍는 지도
        function drawResMap(lat,lon){        

            var i = Math.floor((lat.length/2)); 
            var latitude =  lat[i];
            var longitude = lon[i];

            var map = new Tmapv2.Map("resMap",  
            {
                center: new Tmapv2.LatLng(latitude,longitude),
                width: "890px",  //크기바꾸는 곳
                height: "500px",
                zoom: 15,
                draggable: true
            });

            var ar_line = [];
            for (var j = 0; j < lat.length; j++) {
				var startPt = new Tmapv2.LatLng(lat[j],lon[j]);
				ar_line.push(startPt);
			}
            var polyline = new Tmapv2.Polyline({
            path: ar_line, 
            strokeColor: "#DC143C",
            strokeWeight: 5,
            map: map
            });

            return map;
        } 

    //출발,도착 지점 마커 
	function addStartEndMarker(lat,lon,resMap) {

        var positions = [
        {
             title: 'Start', 
             lonlat: new Tmapv2.LatLng(lat[0],lon[0]),
             imgURL : 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png'
         },
         {
             title: 'End', 
             lonlat: new Tmapv2.LatLng(lat[lat.length-1],lon[lon.length-1]),
            imgURL : 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png'
         }
        ];

        for (var i = 0; i< positions.length; i++){
            var lonlat = positions[i].lonlat;
            var title = positions[i].title;
            var imgURL = positions[i].imgURL;

            marker = new Tmapv2.Marker({
                position : lonlat, 
                map : resMap,
                icon : imgURL,
                title : title,
                animation: Tmapv2.MarkerOptions.ANIMATE_BALLOON, 
                animationLength: 800, 
            });
        }    
          
	}

    //현재위치 마커
    function addCurrentMarker(resMap,lat,lon){
        removeMarkers();
       
        marker = new Tmapv2.Marker({
            position :  new Tmapv2.LatLng(lat,lon), 
            map : resMap, 
            title : "I'm here", 
            animation:Tmapv2.MarkerOptions.ANIMATE_BOUNCE, 
            animationLength: 800, 
        });

        markers.push(marker);
    }

    function removeMarkers() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
	    markers = [];
    }

    //지도타입 변경 함수
    function MapType(type){
        if("HYBRID" == type){
            fourMap.setMapType(Tmapv2.Map.MapType.HYBRID);
            resMap.setMapType(Tmapv2.Map.MapType.HYBRID);
        }else if("ROAD" == type){
            fourMap.setMapType(Tmapv2.Map.MapType.ROAD);
            resMap.setMapType(Tmapv2.Map.MapType.ROAD);
        }
    }


    //심박수 갱신
    function addHeartRate(heartRate){
        document.getElementById("heartDiv").innerHTML = "심박수: "+ heartRate;
    }

    //테이블그리는 함수
    function drawTypeTable(){ //대가리

        let table = document.createElement('table');
        table.setAttribute(
            'style',
            'background-color:#fff;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal; '
        );
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById('saftyTables').appendChild(table);
        
        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = "type";
        row_2.appendChild(row_2_data_1);

        let row_2_data_2 = document.createElement('td');
        row_2_data_2.innerHTML = "분기점 개수";
        let row_2_data_3 = document.createElement('td');
        row_2_data_3.innerHTML = "횡단보도 개수";
        let row_2_data_4 = document.createElement('td');
        row_2_data_4.innerHTML = "도로타입 점수";
        let row_2_data_5 = document.createElement('td');
        row_2_data_5.innerHTML = "위험시설 점수";
        let row_2_data_6 = document.createElement('td');
        row_2_data_6.innerHTML = "총 점수";

        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        row_2.appendChild(row_2_data_5);
        row_2.appendChild(row_2_data_6);

        tbody.appendChild(row_2);

    }
    function drawDataTables(index,saftyparams){ //값 부분

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById('saftyTables').appendChild(table);
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = index+1+"번";
        heading_1.style.color = color[index];
        row_1.append(heading_1);

        // for(var i = 0 ; i < saftyparams.length ; i ++){
        //     saftyparams[i] = saftyparams[i].substring(saftyparams[i].indexOf("=")+1); //숫자만
        // }

        for(var i = 0 ; i < saftyparams.length ; i++){
            let row_1_data =  document.createElement('th');
            row_1_data.innerHTML = saftyparams[i];
            row_1.appendChild(row_1_data);
        }
        thead.appendChild(row_1);

        let row_2 = document.createElement('tr');
        let row_2_name = document.createElement('td');
        row_2_name.innerHTML = "특이사항";
        row_2.appendChild(row_2_name);
        let row_2_data = document.createElement('td');
        row_2_data.style.columnSpan = 5;
        row_2_data.id = 'ect';
        row_2.appendChild(row_2_data); //특이사항 있으면 넣기

        tbody.appendChild(row_2);

    }

    function drawTurnTables(index,saftyparams){
       
        //TurnTypeTables
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById('saftyTables').appendChild(table);
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = index+1+"번";
        heading_1.style.color = color[index];
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "분기점";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "엘베";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "횡단보도";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "교량";
        let heading_6 = document.createElement('th');
        heading_6.innerHTML = "터널";
        let heading_7 = document.createElement('th');
        heading_7.innerHTML = "고가도로";
        let heading_8 = document.createElement('th');
        heading_8.innerHTML = "육교";
        let heading_9 = document.createElement('th');
        heading_9.innerHTML = "지하보도";
        let heading_10 = document.createElement('th');
        heading_10.innerHTML = "계단";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);
        row_1.appendChild(heading_6);
        row_1.appendChild(heading_7);
        row_1.appendChild(heading_8);
        row_1.appendChild(heading_9);
        row_1.appendChild(heading_10);
        thead.appendChild(row_1);
        
        for(var i = 0 ; i < saftyparams.length ; i ++){
            saftyparams[i] = saftyparams[i].substring(saftyparams[i].indexOf("=")+1); //숫자만
        }

        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = "개수";
        row_2.appendChild(row_2_data_1);

        for(var i = 1 ; i < 10 ; i++){
            let row_2_data =  document.createElement('td');
            row_2_data.innerHTML = saftyparams[i];
            row_2.appendChild(row_2_data);
        }
        tbody.appendChild(row_2);

    }

    function drawRoadTables(index,saftyparams){
       
        //TurnTypeTables
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);


        document.getElementById('saftyTables').appendChild(table);
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = index+1+"번";
        heading_1.style.color = color[index];
        // let heading_2 = document.createElement('th');
        // heading_2.innerHTML = "횡단보도";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "차도인도 분리";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "차도+인도";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "보행자도로";
        let heading_6 = document.createElement('th');
        heading_6.innerHTML = "쾌적X 도로";
        let heading_7 = document.createElement('th');
        heading_7.innerHTML = "최종 점수";

        row_1.appendChild(heading_1);
        // row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);
        row_1.appendChild(heading_6);
        row_1.appendChild(heading_7);

        thead.appendChild(row_1);
        
        for(var i = 0 ; i < saftyparams.length ; i ++){
            saftyparams[i] = saftyparams[i].substring(saftyparams[i].indexOf("=")+1); //숫자만
        }

        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = "미터";
        row_2.appendChild(row_2_data_1);

        for(var i = 11 ; i < 15 ; i++){ //횡단보도거리~25번
            let row_2_data =  document.createElement('td');
            row_2_data.innerHTML = saftyparams[i];
            row_2.appendChild(row_2_data);
        }
        let row_2_score = document.createElement('td');
        row_2_score.innerHTML = saftyparams[0]; //점수
        row_2.appendChild(row_2_score);
        tbody.appendChild(row_2);

    }
   

    function setDisplay(){
        if($('input:radio[id=fM]').is(':checked')){
            $('#fourMap').css('display','block');
            $('#resMap').css('display','none');

        }else if ($('input:radio[id=rM]').is(':checked')) {
             $('#resMap').css('display','block');
             $('#fourMap').css('display','none');
        }
        else if ($('input:radio[id=both]').is(':checked')) {
             $('#fourMap').css('display','block');
             $('#resMap').css('display','block');
        }
    }
     