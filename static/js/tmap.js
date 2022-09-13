//Tmap지도 관련 변수
var index = 0;
var resMap;
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
                width: "400px", //크기바꾸는곳
                height: "250px",
                zoom: 15
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

           resMap = map;

        } 

        //최종경로 + 현재 위치 찍는 지도
        function drawResMap(lat,lon){        

            var i = Math.floor((lat.length/2)); 
            var latitude =  lat[i];
            var longitude = lon[i];

            var map = new Tmapv2.Map("resMap",  
            {
                center: new Tmapv2.LatLng(latitude,longitude),
                width: "780px",  //크기바꾸는 곳
                height: "400px",
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
           resMap.setMapType(Tmapv2.Map.MapType.HYBRID);
        }else if("ROAD" == type){
            resMap.setMapType(Tmapv2.Map.MapType.ROAD); 
        }
    }


    //심박수 갱신
    function addHeartRate(heartRate){
        document.getElementById("heartDiv").innerHTML = heartRate;
    }

   