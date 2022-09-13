var openWin;

function saveMsg(id,str){
    var save = document.getElementById(id);
    save.innerHTML = str;
}

function win_open(url,name) {
    openWin = window.open(url,name,"fullscreen=yes");
};

///////////////////////////routeInfo.html
function parsingInfoAndShow(routeInfo) {
    var str ="";
    var routeArr = routeInfo.split(",");
    document.getElementById("endname").innerHTML = routeArr[0];
    document.getElementById("routescore").innerHTML = routeArr[1];
    document.getElementById("routelength").innerHTML = routeArr[2];
    document.getElementById("routetime").innerHTML= routeArr[3];
    for(var i = 4 ; i < routeArr.length ; i++){
        str += routeArr[i];
    }
    document.getElementById("etc").innerHTML = str;
}

function showResInfo() {
    openWin.document.getElementById("endname").innerHTML =endname;
    openWin.document.getElementById("routescore").innerHTML = routescore;
    openWin.document.getElementById("routelength").innerHTML = routelength;
    openWin.document.getElementById("routetime").innerHTML = routetime;
    openWin.document.getElementById("etc").innerHTML = etc;
};


//////////////////////////////////////////viewfour.html

function showAll(){ //태그들이 생성된 후에 그려줘야하는 함수
        var preferenceDivMsg = window.opener.document.getElementById( "preference" ).textContent;
        var saftyScoreDivMsg = window.opener.document.getElementById( "saftyScore" ).textContent;
        var index = window.opener.document.getElementById("route_num").textContent;
        var route = window.opener.document.getElementById( "route" ).textContent;

        if(preferenceDivMsg == "empty"){
            document.getElementById("progress_box").innerHTML = "워치에서 온 선호도정보가 없습니다"; //확인해봐야해
        }
        else{
            var preferArr = parsingPreference(preferenceDivMsg);
            sortPriority(preferArr[3],preferArr[5],preferArr[4],preferArr[2]); //progressBar.js
            updateProgressBar(".currentTag",preferArr[0]*100); 
        }

        if(saftyScoreDivMsg == "empty"){
            document.getElementById("saftyTables").innerHTML = "워치에서 온 표정보가 없습니다"; //확인해봐야해
        }
        else{
            var saftyArr = parsingSaftyScore(saftyScoreDivMsg);
            
            drawTypeTable(); 
            for (var i = 0; i < saftyArr.length; i++) {
                if(i == index){
                    drawDataTables(i,true,saftyArr[i]);
                }
                drawDataTables(i,false,saftyArr[i]); //4개 표
            }
        }

        if(route == "empty"){
            document.getElementById("fourmap").innerHTML = "워치에서 온 표정보가 없습니다"; //확인해봐야해
        }
        else{
             parsingRoute(route);
        }
    }


    function parsingPreference(preference){
        var arr = preference.split(",");
        return arr;
    }
    
    function parsingSaftyScore(saftyScore){
        var arr = saftyScore.split("!"); //4개로 나눠짐
        return arr;
    }

    function parsingRoute(route){
        var arr_lat = [];
        var arr_lon = [];
        var split = route.split("!");

        for (var i = 0; i < split.length; i++) {
            var box = split[i].split("/")
            arr_lat[i] = box[0];
            arr_lon[i] = box[1];
        }

        drawFourMap(arr_lat, arr_lon);
        $('#btn').css('display', 'block');
    }

