//Tmap지도 관련 변수
var index = 0;
var fourMap, resMap;
var markers = [];
var color = ["#00FFFF", "#FF1493", "#2F4F4F", "#ADFF2F"];
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

            fourMap = map;

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

            resMap = map;
        } 

    //출발,도착 지점 마커 
	function addStartEndMarker(lat,lon) {

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
    function addCurrentMarker(lat,lon){
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
            'border-collapse:collapse;border-color:#ccc;border-spacing:0;'
        );
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById('saftyTables').appendChild(table);
        
        let row_2 = document.createElement('tr');
        row_2.setAttribute(
            'style',
            'background-color:#f0f0f0;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:10px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let row_2_data_1 = document.createElement('th');
        row_2_data_1.innerHTML = "Type";
        row_2_data_1.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top; width:8ch; font-size:10px;'
        );
        row_2.appendChild(row_2_data_1);

        let row_2_data_2 = document.createElement('th');
        row_2_data_2.innerHTML = "분기점 개수";
        row_2_data_2.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top; width:10ch; font-size:10px;'
        );
        let row_2_data_3 = document.createElement('th');
        row_2_data_3.innerHTML = "횡단보도 개수";
        row_2_data_3.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top; width:10ch;'
        );
        let row_2_data_4 = document.createElement('th');
        row_2_data_4.innerHTML = "도로타입 점수";
        row_2_data_4.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top; width:10ch;'
        );
        let row_2_data_5 = document.createElement('th');
        row_2_data_5.innerHTML = "위험시설 점수";
        row_2_data_5.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top; width:10ch;'
        );
        let row_2_data_6 = document.createElement('th');
        row_2_data_6.innerHTML = "총 점수";
        row_2_data_6.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top; width:10ch;'
        );

        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        row_2.appendChild(row_2_data_5);
        row_2.appendChild(row_2_data_6);

        thead.appendChild(row_2);

    }
    function drawDataTables(index,saftyparams){ //값 부분

        let table = document.createElement('table');
        table.setAttribute(
            'style',
            'border-collapse:collapse;border-color:#ccc;border-spacing:0;'
        );
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById('saftyTables').appendChild(table);
        let row_1 = document.createElement('tr');
        row_1.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = index+1+"번";
        heading_1.style.color = color[index];
        heading_1.style.backgroundColor = "#f9f9f9";
        heading_1.style.borderColor = "inherit";
        heading_1.style.textAlign = "center";
        heading_1.style.verticalAlign = "top";
        heading_1.style.width = "8ch;"
        // heading_1.setAttribute(
        //     'style',
        //     'background-color:#f9f9f9;border-color:inherit;text-align:center;vertical-align:top;'
        // );
        row_1.append(heading_1);


        for(var i = 0 ; i < 5 ; i++){
            let row_1_data =  document.createElement('th');
            row_1_data.innerHTML = saftyparams[i];
            row_1_data.setAttribute(
                'style',
                'background-color:#f9f9f9;border-color:inherit;text-align:center;color:#333;vertical-align:top;width:10ch;'
            );
            row_1.appendChild(row_1_data);
        }
        thead.appendChild(row_1);


        let row_2 = document.createElement('tr');
        row_2.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let row_2_name = document.createElement('td');
        row_2_name.innerHTML = "특이사항";
        row_2_name.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top;'
        );
        row_2.appendChild(row_2_name);
        let row_2_data = document.createElement('td');
        console.log("aa: "+ saftyparams.length);
        if (saftyparams.length == 6){
            row_2_data.innerHTML = saftyparams[5];
        }
        else {
            row_2_data.innerHTML = "";
        }
        row_2_data.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top;'
        );
        row_2_data.colSpan = 5;
        row_2.appendChild(row_2_data); //특이사항 있으면 넣기

        tbody.appendChild(row_2);

    }



    function drawTables(){ //연습

        let table = document.createElement('table');
        table.style.backgroundColor = '#fff';
        table.setAttribute(
            'style',
            'border-collapse:collapse;border-color:#ccc;border-spacing:0;',
        );
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById('doTables').appendChild(table);
        
        let row_0 = document.createElement('tr');
        row_0.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top;'
        );

        let row_0_data_1 = document.createElement('th');
        row_0_data_1.innerHTML = "type";
        row_0_data_1.setAttribute(
            'style',
            'background-color:#f0f0f0;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;',
        );
        row_0.appendChild(row_0_data_1);

        let row_0_data_2 = document.createElement('th');
        row_0_data_2.innerHTML = "333";
        row_0_data_2.setAttribute(
            'style',
            'background-color:#f0f0f0;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;',
        );
        row_0.appendChild(row_0_data_2);

        thead.appendChild(row_0);

        let row_1 = document.createElement('tr');

        row_1.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:inherit;text-align:center;vertical-align:top;'
        );

        let heading_1 = document.createElement('td');
        heading_1.innerHTML = 1+"번";
        heading_1.style.color = color[0];
        heading_1.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        row_1.append(heading_1);

        let heading_2 = document.createElement('td');
        heading_2.innerHTML = "4개";
        heading_2.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        row_1.append(heading_2);

        tbody.appendChild(row_1);

        let row_2 = document.createElement('tr');

        row_2.setAttribute(
            'style',
            'border-color:inherit;text-align:center;vertical-align:top;'
        );

        let row_2_name = document.createElement('td');
        row_2_name.innerHTML = "특이사항";
        row_2_name.style.fontSize = '15px';
        row_2_name.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        row_2.appendChild(row_2_name);

        let row_2_data = document.createElement('td');
        row_2_data.innerHTML = "랄랄라라";
        row_2_data.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        row_2.appendChild(row_2_data);

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
     
    function a(){
        getWeightfromFirebase();
    }