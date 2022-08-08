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

//Favorites
class Favorites {
    constructor (nickName, address, frequency,lat,lon ) {
        this.nickName = nickName;
        this.address = address;
        this.frequency = frequency;
        this.lat = lat;
        this.lon = lon;
    }
    toString() {
        return this.nickName + ', ' + this.address + ', ' + this.frequency;
    }
}

// Firestore data converter
var favConverter = {
    toFirestore: function(fav) {
        return {
            address: fav.name,
           frequency: fav.frequency,
            lat: fav.lat,
            lon:fav.lon
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Favorites(data.id,data.address, data.frequency, data.lat,data.lon);
    }
};



//login페이지에서 uid 받아오기
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
    var UID = getParameterByName('uid'); 
    console.log(UID)


//해당 uid의 파이어스토어에 연결
function showDB(){
        var docRef = db.collection("PersonalData").doc(UID).collection("Favorites").doc("영심이네");
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("영심이네:", doc.data());
                console.log("주소" + doc.data().address);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        }); 
}

function showAllFavorites(){
    var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("Favorites");
    
    docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    });
}

 function fromFavorites(){
    var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("Favorites");
   docRef.withConverter(favConverter).get().then((doc) => {
    if (doc.exists){
      var fav = doc.data();
      console.log(fav.toString());
    } else {
      console.log("No such document!");
    }}).catch((error) => {
      console.log("Error getting document:", error);
    });

 }
