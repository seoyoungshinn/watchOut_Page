function changeRouteScore(){
    var score_value = document.getElementById('a1');
    var value = score_value.options[score_value.selectedIndex].value;
    console.log("함수들어옴" + value);
    if(value < 6){ 
        $('#weightQ').css('visibility','visible');
        console.log("6보다 작다");
    }
    else if(value >= 6){
        console.log("6보다 크다");
        $('#weightQ').css('visibility','hidden');
    }
}

function selectAllValuesAndReload(){

}

function checkDanger(data) {
    var id = document.getElementById('danger');
    //data.danger = null  <-얘가 null이면 하면안됨
    var i = 0;

    //받았다고 치고 
    //횡단보도 = crossWalk , dangerA = 엘베-육교-지하보도-계단, dangerB = 교량-터널-고가도로-대형시설통로
    if(data.crossWalk != null){
        i++;
        questDanger(i,crossWalk,data.crossWalk)
    }
    if(data.dangerA != null){
        var d = data.dangerA;
        if(d/1000 != 0) {
            i++;
            questDanger(i,elevator,d/1000);
        }
        else {
            
        }
    }

}
function questDanger(i,danger,num) {

}