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
function getFavoritesFromFirestoreAndShow(){
    var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("Favorites");
    
    docRef.orderBy("frequency", "desc").limit(5).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            showFavoritesOnWeb(doc.id , doc.data());
        });
    });
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

function getHistoryObjectFromFirestoreAndShow(){
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

/*-----------가중치-----------*/ 

class Weight {
    constructor (algorithmWeight_crossWalk,algorithmWeight_facilityCar,algorithmWeight_facilityNoCar,algorithmWeight_turnPoint
        ,score,tableWeight) {
        this.algorithmWeight_crossWalk =algorithmWeight_crossWalk;
        this.algorithmWeight_facilityCar = algorithmWeight_facilityCar;
        this.algorithmWeight_facilityNoCar = algorithmWeight_facilityNoCar;
        this.algorithmWeight_turnPoint = algorithmWeight_turnPoint;
        this.score = score;
        this.tableWeight = tableWeight;
    }
    toString(){
        return this.score + ', ' + this.tableWeight ;
    }
}

// Firestore data converter
var weightConverter = {
    toFirestore: function() {
        return {};
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Weight (data.algorithmWeight_crossWalk,data.algorithmWeight_facilityCar,
            data.algorithmWeight_facilityNoCar,data.algorithmWeight_turnPoint,data.score,data.tableWeight);
    }
};

function getWeightObjectFromFirestore(){
    console.log("getWeightObject");
    db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2")
  .withConverter(weightConverter)
  .get()
  .then((doc) => {
      var weight = doc.data();
      console.log(weight.toString());
    })
    .then((HistoryArr)=>{
        for(var i = 0 ; i < 3 ; i++){ 
            showHistoryOnWeb(HistoryArr[i]);
        }
        drawBarChartOnWeb(HistoryArr);
        drawDoughnutChartOnWeb(HistoryArr);
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

 function getWeightfromFirestoreAndDrawTable(){
    var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2");
   docRef.get().then((doc) => {
        drawWeightTable(doc.data());
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
 }
