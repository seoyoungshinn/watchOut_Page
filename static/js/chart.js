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