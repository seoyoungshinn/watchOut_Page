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

//빈번 높은 순으로 즐겨찾기 5개 웹이 띄움
function showFavoritesFromFirebase(){
    var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("Favorites");
    
    docRef.orderBy("frequency", "desc").limit(5).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let favNameDiv = document.createElement('div');
            favNameDiv.textContent = doc.id;
            favNameDiv.setAttribute(
                'style',
                'color:darkslategrey; font-size: 1.5rem !important; flex: 0 0 auto;width: 66.66666667%;'
              );

            let favFrequencySpan = document.createElement('span');
            favFrequencySpan.textContent = doc.data().frequency + "회";
            favFrequencySpan.setAttribute(
                'style',
                'font-size: 1.0rem; color:#adb5bd; float:right;'
            )

            let favaddressDiv = document.createElement('div');
            favaddressDiv.textContent = doc.data().address;
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
        });
    });
}

function makeHistoryObject(){
    HistoryArr = [];

    db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("History")
    .withConverter(historyConverter)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           var history = doc.data();
           history.setName(doc.id);
        var a =  HistoryArr.push(history);
           console.log(a);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function showHistoryFromFirebase(){
    db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("History")
    .limit(3)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           showHistory(doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function showHistory(history){
    let backgroundDiv = document.createElement('div');
    backgroundDiv.setAttribute(
        'style',
        'padding: 10px; background-color: blanchedalmond; margin-bottom: 10px;',
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
    let startNameSpan = document.createElement('span');
    startNameSpan.textContent = history.spName;
    startNameSpan.setAttribute(
        'style',
        'padding: 5px; color:darkslategrey;'
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
    let departureNameSpan = document.createElement('span');
    departureNameSpan.textContent = history.dpName;
    departureNameSpan.setAttribute(
        'style',
        'padding: 5px; color:darkslategrey;'
    );

    secondDiv.appendChild(healthSpan);
    secondDiv.appendChild(departureTimeSpan);
    secondDiv.appendChild(departureNameSpan);

    backgroundDiv.appendChild(firstDiv);
    backgroundDiv.appendChild(secondDiv);

    let listDiv = document.getElementById('historyList');
    listDiv.appendChild(backgroundDiv);
}


//연습용
 function fromFavorites(){
    var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("Favorites");
   docRef.withConverter(favConverter).get().then((doc) => {
    if (doc.exists){
      var fav = doc.data();
      fav.setName(doc.id);
      console.log(fav.toString());
    } else {
      console.log("No such document!");
    }}).catch((error) => {
      console.log("Error getting document:", error);
    });
 }
