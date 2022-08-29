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
        expCrossWalk,expStraightRoad,expNoCar,expWithCar,expTurnPoint,hasDanger,hasDangerA,hasDangerB,hasCrossWalk) {
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
        this.hasDanger = hasDanger;
        this.hasDangerA = hasDangerA;
        this.hasDangerB = hasDangerB;
        this.hasCrossWalk = hasCrossWalk;
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
            data.expCrossWalk,data.expStraightRoad,data.expNoCar,data.expWithCar,data.expTurnPoint,
            data.hasDanger,data.hasDangerA,data.hasDangerB,data.hasCrossWalk);
    }
};

function getHistoryObjectFromFirestoreAndShow(command){
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
        var id = document.getElementById('a1');
        if(command == "preference0"){
            showRouteName(HistoryArr[0]);
            checkDangerAndShowQuestion(HistoryArr[0]);
        }
        else if(command == "preference1"){
            showRouteName(HistoryArr[1]);
            checkDangerAndShowQuestion(HistoryArr[1]);
        }
        else if(command == "preference2"){
            showRouteName(HistoryArr[2]);
            checkDangerAndShowQuestion(HistoryArr[2]);
        }
        return HistoryArr;
    })
    .then((HistoryArr)=>{
        if(command == "history"){
            for(var i = 0 ; i < 3 ; i++){ 
                showHistoryOnWeb(i,HistoryArr[i]);
                showForFeedback(i+1,HistoryArr[i]);
            }
            drawBarChartOnWeb(HistoryArr);
            drawDoughnutChartOnWeb(HistoryArr);
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

/*-----------가중치-----------*/ 
function getWeightAndDrawTableFromFirestore(){
    db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2")
  .get()
  .then((doc) => {
      var weight = doc.data();
      drawWeightTable(weight.tableWeight,weight.algorithmWeight_crossWalk,weight.algorithmWeight_facilityCar,
        weight.algorithmWeight_facilityNoCar,weight.algorithmWeight_turnPoint);
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function addTurnPointAndTableWeightToFireStore(turn,table){
    var weightRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2");

    weightRef.update({
        algorithmWeight_turnPoint : firebase.firestore.FieldValue.increment(turn),
        tableWeight: firebase.firestore.FieldValue.increment(table)
    })
    .then(() => {
        console.log("addturnWeight success");
    })
    .catch((error) => {
        console.error("Error adding turnWeight document: ", error);
    });
    
}
function addDangerWeightToFirestore(c,a,b){
    var weightRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2");

    weightRef.update({
        algorithmWeight_crossWalk: firebase.firestore.FieldValue.increment(c),
        algorithmWeight_facilityCar: firebase.firestore.FieldValue.increment(a),
        algorithmWeight_facilityNoCar: firebase.firestore.FieldValue.increment(b) 
    })
    .then(() => {
        console.log("addDangerWeight success");
    })
    .catch((error) => {
        console.error("Error adding dangerWeight document: ", error);
    });
}

function setDangerWeightToFirestore(n1, n2, n3, n4){
    var weightRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2");
    
    weightRef.update({
        algorithmWeight_crossWalk: n1,
        algorithmWeight_facilityCar: n2,
        algorithmWeight_facilityNoCar: n3,
        algorithmWeight_turnPoint : n4,
    })
    .then(() => {
        console.log("set Weight success");
    })
    .catch((error) => {
        console.error("Error setting weight document: ", error);
    });
}


/* ------------------RealTimeDatabase-------------------- */
//json으로 저장된 dong아래 lat이랑 lon배열 가져옴
function getAllDataFromRealTimeDatabase() {
    const dbRef = firebase.database().ref('dong');
    dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val().lat); //lat배열
            console.log(snapshot.val().lon); //lon배열
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
  }
