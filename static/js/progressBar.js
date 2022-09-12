function changePriorityScore(input){
    var value = input.value;
    if(value >-1 && value<101){
      updateProgressBar("."+input.id,input.value);
    }
    else{
      alert("0~100사이 값만 입력해주세요");
      input.value = 0;
      updateProgressBar("."+input.id,0);
    }
}

function updateProgressBar(tagName , input_value) {
    let progress = document.querySelector(tagName);
    let interval = 1;
    let updatesPerSecond = 1000 / 60;
    let state = 0;
    let max = input_value;

        function animator () {
            state = state + interval;
            progress.value = state;
            if ( progress.value + interval < max){
                setTimeout(animator, updatesPerSecond);
            } else { 
                progress.value = max;
                }
            }
        setTimeout(() => {
            animator();
                }, updatesPerSecond);
    }   

function apply(){
    var cross = Number(document.getElementById("cross").value);
    var withCar = Number(document.getElementById("withCar").value);
    var noCar = Number(document.getElementById("noCar").value);
    var turn = Number(document.getElementById("turn").value);

    setDangerWeightToFirestore(cross, withCar, noCar, turn);
}

function sortPriority(crossWalk,withCar,noCar,turnPoint){
     var arr = [crossWalk,withCar,noCar,turnPoint];
     arr.sort((a, b) => a - b);
     arr.reverse();
     
     for(var i = 0 ; i < arr.length ; i++){
        var stringDiv = document.createElement('div');
        var str;
        switch(arr[i]){
            case crossWalk:
                str = "횡단보도"
                break;

            case withCar:
                str = "차도 비분리시설"
                break;

            case noCar:
                str = "차도 분리시설"
                break;

            case turnPoint:
                str = "분기점"
                break;
        }
        stringDiv.innerHTML = i+1 + "&nbsp;&nbsp;&nbsp;" + str+"&nbsp;("+arr[i]+")";
        console.log(i+1 + "&nbsp;&nbsp;&nbsp;" + str+"&nbsp;("+arr[i]+")");
        var div = document.getElementById("priority");
        div.appendChild(stringDiv);
     }
}

function drawTableWeightBar(road){
    console.log(road);
    var value = road/2 * 100;
    updateProgressBar(".currentTag",value);
}