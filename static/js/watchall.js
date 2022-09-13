var openWin;

var preferArr;
var saftyArr

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

function parsingPreference(preference){
    preferArr = preference.split(",");
}

function parsingSaftyScore(saftyScore){
    saftyArr = saftyScore.split("!"); //4개로 나눠짐
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

function showAll(){ //태그들이 생성된 후에 그려줘야하는 함수
    var preferenceDivMsg = window.opener.document.getElementById( "preference" ).textContent;
    var saftyScoreDivMsg = window.opener.document.getElementById( "saftyScore" ).textContent;

    if(preferenceDivMsg == "empty"){
        document.getElementById("progress_box").innerHTML = "워치에서 온 선호도정보가 없습니다"; //확인해봐야해
    }
    else{
        parsingPreference(preferenceDivMsg);
    }

    if(saftyScoreDivMsg == "empty"){
        document.getElementById("saftyTable").innerHTML = "워치에서 온 표정보가 없습니다"; //확인해봐야해
    }
    else{
        parsingSaftyScore(saftyScoreDivMsg);
    }

    sortPriority(preferArr[3],preferArr[5],preferArr[4],preferArr[2]); //progressBar.js
    updateProgressBar(".currentTag",preferArr[0]*100);
    drawTypeTable(); //테이블함수들 바꾸삼
}


