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

function showYoungShimHouse(){
        var docRef = db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("Favorites").doc("영심이네");
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
    db.collection("PersonalData").doc("kstL3GdcSqbnZcNsFjm669zUFih2").collection("Favorites").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    });
}

function fromFavorites(){
    
}
