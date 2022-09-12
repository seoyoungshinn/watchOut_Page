var fourScore;
var latArr;
var lonArr;
var openWin;

var fourScore;

function saveMsg(id,str){
    var save = document.getElementById(id);
    save.innerHTML = str;
}

function win_open(url,name) {
    openWin = window.open(url,name,"fullscreen=yes");
};

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


//////////////////////////////////////////

function saveMapData(arr_lat, arr_lon) {
    latArr = arr_lat;
    lonArr = arr_lon;
}

function saveTableData(scoreArr) {
    fourScore = scoreArr;
}

function showFourScore() {
    drawTypeTable();
    var split = fourScore.split("!");
    for (var i = 0; i < split.length; i++) {
        var safty = split[i].split(",");
        drawDataTables(i, safty); //4개 표
    }
}

function showFourMap() { //이건 어디서쓰는거야?..
    drawFourMap(latArr, lonArr);
}