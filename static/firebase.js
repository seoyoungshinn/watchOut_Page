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

//History 객체
class History {
    constructor (arrivedTime, departureTime,dpName,spName,heartRateAverage,stepNum) {
        //this.arrivedDate = arrivedTime.substring(0,11);
        this.arrivedTime = arrivedTime
        this.departureTime =departureTime
        this.dpName =dpName;
        this.spName = spName;
        this.heartRateAverage = heartRateAverage;
        this.stepNum = stepNum
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
        return new History(data.arrivedTime, data.departureTime, data.dpName,data.spName,data.heartRateAverage,data.stepNum);
    }
};

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
        console.log("ddd");
        return HistoryArr;
    })
    .then((HistoryArr)=>{
        for(var i = 0 ; i < 3 ; i++){ 
            showHistoryOnWeb(HistoryArr[i]);
        }
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
    dateSpan.textContent = history.arrivedTime.substring(11,0);
    dateSpan.setAttribute(
        'style',
        'display:inline-block; width:90px;'
    );
    let arrivedTimeSpan = document.createElement('span');
    arrivedTimeSpan.textContent = history.arrivedTime.substring(11);
    arrivedTimeSpan.style.fontSize = "13px";
    let startNameSpan = document.createElement('span');
    startNameSpan.textContent ="S: "+ history.spName;
    startNameSpan.setAttribute(
        'style',
        'padding: 5px; color:darkslategrey; font-size:13px;'
    );

    firstDiv.appendChild(dateSpan);
    firstDiv.appendChild(arrivedTimeSpan);
    firstDiv.appendChild(startNameSpan);

    let secondDiv = document.createElement('div');
    let healthSpan = document.createElement('span');
    healthSpan.textContent = history.stepNum+" "+ history.heartRateAverage;
    healthSpan.setAttribute(
        'style',
        'display:inline-block; color:#dc3545; width:90px;'
    );
    let departureTimeSpan = document.createElement('span');
    departureTimeSpan.textContent = history.departureTime.substring(11);
    departureTimeSpan.style.fontSize = "13px";
    let departureNameSpan = document.createElement('span');
    departureNameSpan.textContent ="E: "+ history.dpName;
    departureNameSpan.setAttribute(
        'style',
        'padding: 5px; color:darkslategrey;font-size:13px;'
    );

    secondDiv.appendChild(healthSpan);
    secondDiv.appendChild(departureTimeSpan);
    secondDiv.appendChild(departureNameSpan);

    backgroundDiv.appendChild(firstDiv);
    backgroundDiv.appendChild(secondDiv);

    let listDiv = document.getElementById('historyList');
    listDiv.appendChild(backgroundDiv);
}
/*-----------차트(소요시간차이 , 경로이탈부분비율)-----------*/ 
function showTimeChartFromFirebase(){
    db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("History")
    .limit(5)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           drawStickChart();
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function drawTimeChart(){
    new Chart(document.getElementById("showBar"), {
        type: 'bar',
        data: {
          labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [
            {
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: [2478,5267,734,784,433]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
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
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.setAttribute(
            'style',
            'padding: 1rem; border-radius: 0.3rem !important; background-color: blanchedalmond; margin-left: 10px; margin-right:10px;'
        );

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById('saftyTables').appendChild(table);

        let row_1 = document.createElement('tr');

        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "weight";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = data.crossWalk;
        let heading_3 = document.createElement('th');
        heading_3.innerHTML =data.ft_car;
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = data.ft_noCar;
        let heading_5 = document.createElement('th');
        heading_5.innerHTML =data.score;
        let heading_6 = document.createElement('th');
        heading_6.innerHTML = data.tableWeight;

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);
        row_1.appendChild(heading_6);
        thead.appendChild(row_1);

        let row_2 = document.createElement('tr');

        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = "type";
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


        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        row_2.appendChild(row_2_data_5);
        row_2.appendChild(row_2_data_6);

        tbody.appendChild(row_2);
}
