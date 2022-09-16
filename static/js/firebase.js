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
    var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2");

/*-----------즐겨찾기-----------*/ 
function getFavoritesFromFirestoreAndShow(){
    

    docRef.collection("Favorites").orderBy("frequency", "desc").limit(5).get()
    .then((querySnapshot) => {
        var favorites = [];
        querySnapshot.forEach((doc) => {
            showFavoritesOnWeb(doc.id , doc.data());
        });
    });

    docRef.collection("Favorites").limit(4).get()
    .then((querySnapshot) => {
        var favorites = [];
        querySnapshot.forEach((doc) => {
            var fav =[];
            fav.push(doc.id);
            fav.push(doc.data().frequency);
            favorites.push(fav);
        });
        return favorites;
    })
    .then((favorites) => {
        drawFavoriteBarChartOnWeb(favorites);
    });
    
}

/*-----------기록-----------*/ 
//History 객체
class History {
    constructor (arrivedTime, departureTime,arrivedName,dpName,heartRateAverage,heartRateMax,stepNum,expectedTime,
        expCrossWalk,expStraightRoad,expNoCar,expWithCar,expTurnPoint,hasDanger,hasDangerA,hasDangerB,hasCrossWalk,
        score,totalDistance) {
        this.arrivedTime =new Date(arrivedTime);
        this.departureTime = new Date(departureTime);
        this.arrivedName = arrivedName;
        this.dpName =dpName;
        this.heartRateAverage = heartRateAverage;
        this.heartRateMax = heartRateMax;
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
        this.score = score;
        this.totalDistance = totalDistance;
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
            data.heartRateAverage,data.heartRateMax,data.stepNum,data.expectedTime,
            data.expCrossWalk,data.expStraightRoad,data.expNoCar,data.expWithCar,data.expTurnPoint,
            data.hasDanger,data.hasDangerA,data.hasDangerB,data.hasCrossWalk,
            data.score,data.totalDistance);
    }
};

function getHistoryObjectForHistory(){
    docRef.collection("History")
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
            showHistoryOnWeb(i,HistoryArr[i]);
            showForFeedback(i+1,HistoryArr[i]);
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function getHistoryObjectForAnalysis(){
    docRef.collection("History")
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
        drawHistoryBarChartOnWeb(HistoryArr);
        drawHistoryDoughnutChartOnWeb(HistoryArr);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function getHistoryObjectForAssess(command){
    docRef.collection("History")
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
        if(command == 0){
            checkDangerAndShowQuestion(HistoryArr[0]);
        }
        else if(command == 1){
            checkDangerAndShowQuestion(HistoryArr[1]);
        }
        else if(command == 2){
            checkDangerAndShowQuestion(HistoryArr[2]);
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function getHistoryObjectForInfo(num){
    docRef.collection("History")
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
        if(num == 0){
            showInfoOnHI(HistoryArr[0]);
        }
        else if(num == 1){
            showInfoOnHI(HistoryArr[1]);
        }
        else if(num == 2){
            showInfoOnHI(HistoryArr[2]);
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

/*-----------가중치-----------*/ 
function getWeightAndDrawTableFromFirestore(){
    docRef.get()
    .then((doc) => {
      var weight = doc.data();
      drawWeightTable(weight.tableWeight,weight.algorithmWeight_crossWalk,weight.algorithmWeight_facilityCar,
        weight.algorithmWeight_facilityNoCar,weight.algorithmWeight_turnPoint);
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function addTurnPointAndTableWeightToFireStore(turn,table_danger,table_road){
    docRef.update({
        algorithmWeight_turnPoint : firebase.firestore.FieldValue.increment(turn),
        tableWeight_danger: firebase.firestore.FieldValue.increment(table_danger),
        tableWeight_road: firebase.firestore.FieldValue.increment(table_road),
    })
    .then(() => {
        alert("평가하기가 완료되었습니다 감사합니다");
    })
    .catch((error) => {
        console.error("Error adding turnWeight document: ", error);
    });
    
}


function addDangerWeightToFirestore(turn,cross,dangerA,dangerB){ //assess
    docRef.update({
        algorithmWeight_turnPoint:firebase.firestore.FieldValue.increment(turn),
        algorithmWeight_crossWalk:firebase.firestore.FieldValue.increment(cross),
        algorithmWeight_facilityCar: firebase.firestore.FieldValue.increment(dangerA),
        algorithmWeight_facilityNoCar: firebase.firestore.FieldValue.increment(dangerB) 
    })
    .then(() => {
        alert("평가하기가 완료되었습니다 감사합니다");
        location.href = '/history';
    })
    .catch((error) => {
        console.error("Error adding dangerWeight document: ", error);
    });
}

function getWeightFromFirebaseForSettings(){
    docRef.get()
    .then((doc) => {
      var weight = doc.data();
      sortPriority(weight.algorithmWeight_turnPoint,weight.algorithmWeight_crossWalk,
        weight.algorithmWeight_facilityNoCar,weight.algorithmWeight_facilityCar);
        drawTableWeightBar(weight.tableWeight_road);
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function setDangerWeightToFirestore(n0,n1, n2, n3, n4){
    var road = n0/100;
    var danger = Math.round((1 - road) * 10) / 10;
    
    docRef.update({
        tableWeight_road : Math.abs(road),
        tableWeight_danger :Math.abs(danger),
        algorithmWeight_turnPoint : n1,
        algorithmWeight_crossWalk: n2,
        algorithmWeight_facilityNoCar: n3, //차도분리
        algorithmWeight_facilityCar: n4, //차도비분리
    })
    .then(() => {
        alert("설정이 완료되었습니다");
        console.log("set Weight success");
    })
    .catch((error) => {
        alert("실패");
        console.error("Error setting weight document: ", error);
    });
}

