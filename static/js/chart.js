/*-----------차트(소요시간차이 , 경로이탈부분비율)-----------*/


function drawHistoryBarChartOnWeb(historyArr){
    var colors = ["#5286b8", "#94b9da","#002c64","#5b9ad1","#00070e"];
    var labelsArr = [];
    var dataArr = [];
    for(var i = 0 ; i < 5; i++){
        var arrivedLabel = historyArr[i].arrivedTime.getMonth()+1 + "월 "+historyArr[i].arrivedTime.getDate() + "일";
        labelsArr.push(arrivedLabel);

        var elapsedTime = historyArr[i].arrivedTime - historyArr[i].departureTime; //실제소요시간(ms)
        var timeData = elapsedTime/1000 - historyArr[i].expectedTime ; //예상소요시간과차이(s)
        dataArr.push(timeData);
    }
    Chart.defaults.global.defaultFontColor = "#eee";
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
            text: '예상 소요 시간과 실제 소요 시간의 차이 (최근 5가지)',
            fontColor: 'black'
          }
        }
      });
}

function drawHistoryPieChartOnWeb(historyArr){
    var labels = ["횡단보도" , "직진길", "분기점", "차도 분리 요소","차도 비분리 요소"];
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

    new Chart(document.getElementById("showPie"), {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
              {
                label: "dd (millions)",
                backgroundColor: ["#D91A1A", "#5F6F94","#5B8C2A","#078C8C","#F257AC"],
                data: [crossWalk,straightRoad,noCar,withCar,turnPoint]
              }
          ]
        },
        options: {
          legend: {
            labels: {
              fontColor: "black",
              fontSize: 15
            }
          },
          title: {
            display: true,
            text: '경로이탈한 위치의 타입 비율',
            fontSize: 20,
            fontColor: 'black',
          }
        }
    });
}

function drawFavoriteBarChartOnWeb(favorites_arr){
  var colors = ["#1A374D","#406882", "#6998AB","#B1D0E0"];
  var labelsArr = [];
  var dataArr = [];

  for(var i = 0 ; i < favorites_arr.length ; i++){
    var fav = favorites_arr[i];
    labelsArr.push(fav[0]); //즐겨찾기명
    dataArr.push(fav[1]); //횟수
  }

  Chart.defaults.global.defaultFontColor = "black";
   new Chart(document.getElementById("favoritesChart"), {
      type: 'bar',
      data: {
        labels: labelsArr, //밑에뜨는 이름
        datasets: [
          {
          label: "frequency", //마우스올리면 뜨는 값
          backgroundColor: colors,
          data: dataArr //데이터값
          }
        ]
      },
      options: {
        responsive: false
      }
    });
}