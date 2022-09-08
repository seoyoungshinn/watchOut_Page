var fourScore;
var latArr;
var lonArr;

var endname;
var routescore;
var routelength;
var routetime;
var etc;
var openWin;

var fourScore = getScore();

function win_open(url,name) {
    openWin = window.open(url,name,"fullscreen=yes");
    var showAlert = setTimeout(function() {
        if(url=="/routeinfo"){
            showResInfo();
        }
    }, 1000);
};

function parsingInfo(routeInfo) {
    var routeArr = routeInfo.split("!");
    console.log(routeArr);
    endname = routeArr[0];
    routescore = routeArr[1];
    routelength = routeArr[2];
    routetime = routeArr[3];
    etc = routeArr[4];
}
function showResInfo() {
    openWin.document.getElementById("endname").innerHTML = endname;
    openWin.document.getElementById("routescore").innerHTML = routescore;
    openWin.document.getElementById("routelength").innerHTML = routelength;
    openWin.document.getElementById("routetime").innerHTML = routetime;
    openWin.document.getElementById("etc").innerHTML = etc;
};

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

function showFourMap() {
    drawFourMap(arr_lat, arr_lon);
}