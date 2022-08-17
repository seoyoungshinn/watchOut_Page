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
const db = firebase.firestore();
var HistoryArr;

//login페이지에서 uid 받아오기
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
    var UID = getParameterByName('uid'); 
    console.log(UID)

/*-----------즐겨찾기-----------*/ 
function getFavoritesFromFirestore(){
    var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("Favorites");
    
    docRef.orderBy("frequency", "desc").limit(5).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            showFavoritesOnWeb(doc.id , doc.data());
        });
    });
}

function showFavoritesOnWeb(id,data){
    let favNameDiv = document.createElement('div');
            favNameDiv.textContent = id;
            favNameDiv.setAttribute(
                'style',
                'color:darkslategrey; font-size: 1.5rem !important; flex: 0 0 auto;width: 66.66666667%;'
              );

            let favFrequencySpan = document.createElement('span');
            favFrequencySpan.textContent = data.frequency + "회";
            favFrequencySpan.setAttribute(
                'style',
                'font-size: 1.0rem; color:#adb5bd; float:right;'
            )

            let favaddressDiv = document.createElement('div');
            favaddressDiv.textContent = data.address;
            favaddressDiv.setAttribute(
                'style',
                'color:#6c757d'
            );

            let p =  document.createElement('p');
            // p.setAttribute(
            //     'style',
            //     'background-color: #ced4da;'
            // )

            let listDiv = document.getElementById('favoritesList');
            
            favNameDiv.appendChild(favFrequencySpan);
            p.appendChild(favNameDiv);
            p.appendChild(favaddressDiv);
            listDiv.appendChild(p);
}
/*-----------기록-----------*/ 
//History 객체
class History {
    constructor (arrivedTime, departureTime,arrivedName,dpName,heartRateAverage,stepNum,expectedTime,
        expCrossWalk,expStraightRoad,expNoCar,expWithCar,expTurnPoint) {
        this.arrivedTime =new Date(arrivedTime);
        this.departureTime = new Date(departureTime);
        this.arrivedName = arrivedName;
        this.dpName =dpName;
        this.heartRateAverage = heartRateAverage;
        this.stepNum = stepNum;
        this.expectedTime = expectedTime;
        this.expCrossWalk = expCrossWalk;
        this.expStraightRoad = expStraightRoad;
        this.expNoCar = expNoCar;
        this.expWithCar = expWithCar;
        this.expTurnPoint = expTurnPoint;
    }

    setName(name){
        this.name = name;
    }
}

// Firestore data converter
var historyConverter = {
    toFirestore: function() {
        return {};
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new History(
            data.arrivedTime, data.departureTime,data.arrivedName,data.dpName,
            data.heartRateAverage,data.stepNum,data.expectedTime,
            data.expCrossWalk,data.expStraightRoad,data.expNoCar,data.expWithCar,data.expTurnPoint);
    }
};

function getHistoryObjectFromFirestore(){
    db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("History")
    .withConverter(historyConverter)
    .get()
    .then((querySnapshot) => { //History객체 생성
        var HistoryArr = [];
        querySnapshot.forEach((doc) => {
        var history = doc.data();
        history.setName(doc.id);
        HistoryArr.push(history);
        });
        return HistoryArr;
    })
    .then((HistoryArr)=>{
        // for(var i = 0 ; i < HistoryArr.length ; i++){
        //     console.log(HistoryArr[i]);
        // }
        for(var i = 0 ; i < 3 ; i++){ 
            showHistoryOnWeb(HistoryArr[i]);
        }
        drawBarChartOnWeb(HistoryArr);
        drawDoughnutChartOnWeb(HistoryArr);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function showHistoryOnWeb(history){
    let backgroundDiv = document.createElement('div');
    backgroundDiv.setAttribute(
        'style',
        'padding: 1rem; border-radius: 0.3rem !important; background-color: blanchedalmond; margin:10px;',
      );

    let firstDiv = document.createElement('div');
    let dateSpan = document.createElement('span');
    dateSpan.textContent = history.departureTime.toLocaleDateString();
    dateSpan.setAttribute(
        'style',
        'display:inline-block; width:90px;'
    );
    let departureTimeSpan = document.createElement('span');
    departureTimeSpan.textContent = history.departureTime.getHours()+":"+history.departureTime.getMinutes()+":"+history.departureTime.getSeconds();
    departureTimeSpan.setAttribute(
        'style',
        'display:inline-block; width:60px;'
    );
    let departureNameSpan = document.createElement('span');
    departureNameSpan.textContent ="E: "+ history.dpName;
    departureNameSpan.setAttribute(
        'style',
        'padding: 5px; color:darkslategrey;font-size:13px;font-weight:bold;'
    );

    firstDiv.appendChild(dateSpan);
    firstDiv.appendChild(departureTimeSpan);
    firstDiv.appendChild(departureNameSpan);

    let secondDiv = document.createElement('div');
    let healthSpan = document.createElement('span');
    healthSpan.textContent = history.stepNum+" "+ history.heartRateAverage;
    healthSpan.setAttribute(
        'style',
        'display:inline-block; color:#dc3545; width:90px;'
    );
   
    let arrivedTimeSpan = document.createElement('span');
    arrivedTimeSpan.textContent = history.arrivedTime.getHours()+":"+history.arrivedTime.getMinutes()+":"+history.arrivedTime.getSeconds();
    arrivedTimeSpan.setAttribute(
        'style',
        'display:inline-block; width:60px;'
    );
    let arrivedNameSpan = document.createElement('span');
    arrivedNameSpan.textContent ="S: "+ history.arrivedName;
    arrivedNameSpan.setAttribute(
        'style',
        'padding: 5px; color:darkslategrey; font-size:13px; font-weight:bold;'
    );
    secondDiv.appendChild(healthSpan);
    secondDiv.appendChild(arrivedTimeSpan);
    secondDiv.appendChild(arrivedNameSpan);

    backgroundDiv.appendChild(firstDiv);
    backgroundDiv.appendChild(secondDiv);

    let listDiv = document.getElementById('historyList');
    listDiv.appendChild(backgroundDiv);
}
/*-----------차트(소요시간차이 , 경로이탈부분비율)-----------*/ 
function drawBarChartOnWeb(historyArr){
    var colors = ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"];
    var labelsArr = [];
    var dataArr = [];
    for(var i = 0 ; i < 5; i++){
        var arrivedLabel = historyArr[i].arrivedTime.getMonth() + "월 "+historyArr[i].arrivedTime.getDate() + "일";
        labelsArr.push(arrivedLabel);

        var elapsedTime = historyArr[i].arrivedTime - historyArr[i].departureTime; //실제소요시간(ms)
        var timeData = elapsedTime/1000 - historyArr[i].expectedTime ; //예상소요시간과차이(s)
        dataArr.push(timeData);
    }
    new Chart(document.getElementById("showBar"), {
        type: 'bar',
        data: {
          labels: labelsArr,
          datasets: [
            {
            label: "예상시간-소요시간(seconds)",
            backgroundColor: colors,
            data: dataArr
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: '예상 소요 시간과 실제 소요 시간의 차이 (최근 5가지)'
          }
        }
      });
}

function drawDoughnutChartOnWeb(historyArr){
    var labels = ["횡단보도" , "직진길", "분기점", "위험요소A","위험요소B"];
    var crossWalk = 0;
    var straightRoad = 0;
    var noCar = 0;
    var withCar = 0;
    var turnPoint = 0;

    for(var i = 0 ; i < 5; i++){
        crossWalk += historyArr[i].expCrossWalk;
        straightRoad += historyArr[i].expStraightRoad;
        noCar += historyArr[i].expNoCar;
        withCar += historyArr[i].expWithCar;
        turnPoint += historyArr[i].expTurnPoint;
    }
    console.log("walk: " + crossWalk);
    console.log("st: " + straightRoad);
    console.log("no: " + noCar);
    console.log("with: " + withCar);
    console.log("tP: " + turnPoint);


    new Chart(document.getElementById("showPie"), {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
              {
                label: "dd (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [crossWalk,straightRoad,noCar,withCar,turnPoint]
              }
          ]
        },
        options: {
          title: {
            display: true,
            text: '경로이탈한 위치의 타입 비율'
          }
        }
    });
}

/*-----------가중치 테이블-----------*/ 
 function getWeightfromFirebase(){
    var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2");
   docRef.get().then((doc) => {
        drawWeightTable(doc.data());
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
 }

 function drawWeightTable(data){ 

    let table = document.createElement('table');
    table.setAttribute(
        'style',
        'border-collapse:collapse;border-color:#ccc;border-spacing:0;'
    );
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.setAttribute(
            'style',
            'border-collapse:collapse; border-color:#ccc; border-spacing:0;'
        );

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById('weightTable').appendChild(table);

        let row_1 = document.createElement('tr');
        
        row_1.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Weight";
        heading_1.setAttribute(
            'style',
            'background-color:#f0f0f0;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = data.tableWeight;
        heading_2.setAttribute(
            'style',
            'background-color:#f0f0f0;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);

        thead.appendChild(row_1);

        let row_2 = document.createElement('tr');

        row_2.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let name_2 = document.createElement('td');
        name_2.innerHTML = "TurnPoint"
        name_2.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let data_2 = document.createElement('td');
        data_2.innerHTML = data.algorithmWeight_turnPoint;
        data_2.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_2.appendChild(name_2);
        row_2.appendChild(data_2);
        
        tbody.appendChild(row_2);

        let row_3 = document.createElement('tr');
        row_3.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let name_3 = document.createElement('td');
        name_3.innerHTML = "CrossWalk";
        name_3.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let data_3 = document.createElement('td');
        data_3.innerHTML = data.algorithmWeight_crossWalk;
        data_3.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_3.appendChild(name_3);
        row_3.appendChild(data_3);
        
        tbody.appendChild(row_3);

        let row_4 = document.createElement('tr');
        row_4.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let name_4 = document.createElement('td');
        name_4.innerHTML = "DangerA";
        name_4.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let data_4 = document.createElement('td');
        data_4.innerHTML = data.algorithmWeight_facilityNoCar;
        data_4.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_4.appendChild(name_4);
        row_4.appendChild(data_4);
        
        tbody.appendChild(row_4);

        let row_5 = document.createElement('tr');
        row_5.setAttribute(
            'style',
            'text-align:center;vertical-align:top;'
        );

        let name_5 = document.createElement('td');
        name_5.innerHTML = "DangerB";
        name_5.setAttribute(
            'style',
            'background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );
        let data_5 = document.createElement('td');
        data_5.innerHTML = data.algorithmWeight_facilityCar;
        data_5.setAttribute(
            'style',
            'background-color:#f9f9f9;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
        );

        row_5.appendChild(name_5);
        row_5.appendChild(data_5);
        
        tbody.appendChild(row_5);
}
