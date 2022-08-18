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