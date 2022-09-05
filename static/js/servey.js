
function changeRouteScore(){
    var score_value = document.getElementById('answer1');
    var value = score_value.options[score_value.selectedIndex].value;

    if(value < 6){ 
        $('#weightQ').css('visibility','visible');
    }
    else if(value >= 6){
        $('#weightQ').css('visibility','hidden');
    }
}

function checkDangerAndShowQuestion(history){
    //danger ==true 인경우
    var number = 4;
    var crossNum = history.hasCrossWalk;
    var questionDiv = document.getElementById('weightQ');
    questionDiv.appendChild(makeQuestionDiv("횡단보도",crossNum,number));
    questionDiv.appendChild(makeAnswerDiv("c0",number));
    number++;
    if(history.hasDanger == true){
        var dangerAarr = Array.from(history.hasDangerA.toString()); //dangerA = 엘베-육교-지하보도-계단
        var dangerBarr = Array.from(history.hasDangerB.toString()); //dangerB = 교량-터널-고가도로-대형시설통로
        if(dangerAarr != null) {
            for(var i = dangerAarr.length-1 ; i >= 0 ; i--){
                if(dangerAarr[i] != "0"){
                    questionDiv.appendChild(makeQuestionDiv("a"+i,dangerAarr[i],number));
                    questionDiv.appendChild(makeAnswerDiv("a"+i,number));
                    number++;
                }
            }  
        }
        if(dangerBarr != null) {
            for(var i = dangerBarr.length-1 ; i >= 0 ; i--){
                if(dangerBarr[i] != "0"){
                    questionDiv.appendChild(makeQuestionDiv("b"+i,dangerBarr[i],number));
                    questionDiv.appendChild(makeAnswerDiv("b"+i,number));
                    number++;
                }
            }  
        }
    }
    
    //danger == false인 경우
        //->아무것도x
}

function makeQuestionDiv(name,num,index){
    let col_lg_8Div = document.createElement('div');
    col_lg_8Div.className = 'col-lg-8'

    let label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = "Q"+index;

    let span = document.createElement('span');
    span.className = 'question';
    var dangerName = name;
    switch(name) {
        case 'a0':
            dangerName = '엘레베이터';
            break;
        case 'a1':
            dangerName = '육교';
            break;
        case 'a2':
            dangerName = '지하보도';
            break;
        case 'a3':
            dangerName = '계단';
            break;
        case 'b0':
            dangerName = '교량';
            break;
        case 'b1':
            dangerName = '터널';
            break;
        case 'b2':
            dangerName = '고가도로';
            break;
        case 'b3':
            dangerName = '대형시설물 이동통로';
            break;
    }
    span.textContent = "이용하신 경로에는 "+dangerName+"이 있었습니다. 향후 "+dangerName+"이 최소화된 길을 안내받으시려면 '최소화'를 선택해주세요";

    col_lg_8Div.appendChild(label);
    col_lg_8Div.appendChild(span);

    return col_lg_8Div;
}

function makeAnswerDiv(name,index){
    let col_md_4Div = document.createElement('div');
    col_md_4Div.className = 'col-md-4'

    let label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = "A"+index;

    let select = document.createElement('select');
    select.className = "form-select";
    select.setAttribute("id", name);
    
    let option_keep = document.createElement('option');
    option_keep.value = "keep";
    option_keep.innerHTML = "유지";
    let option_min = document.createElement('option');
    option_min.value = "min";
    option_min.innerHTML = "최소화";

    select.appendChild(option_keep);
    select.appendChild(option_min);

    col_md_4Div.appendChild(label);
    col_md_4Div.appendChild(select);

    return col_md_4Div;
}

function showRouteName(history) {
    var id = document.getElementById('routename');
    var aname = history.arrivedName;
    var dname = history.dpName;
    id.innerHTML = dname+"->"+aname;
}


//preference.html에서 버튼 클릭 시 불리는 함수
function getAllValues(){
    var tableWeight = 0, turnType = 0, crossWalk = 0 , dangerA = 0 , dangerB = 0;

    //tableweight
    var answer2 = document.getElementById('answer2'); 
    if(answer2.options[answer2.selectedIndex].value == "road" ){
        tableWeight = -0.1;
    }
    else if(answer2.options[answer2.selectedIndex].value == "danger"){
        tableWeight = 0.1;
    }

    //turntype
    var answer3 = document.getElementById('answer3'); 
    if(answer3.options[answer3.selectedIndex].value == "stright"){
        turnType = -5;
    }
    else if(answer3.options[answer3.selectedIndex].value == "short"){
        turnType = 5;
    }

    //신호등
    var answer_crosWalk = document.getElementById('c0');
    if(answer_crosWalk != null &&
        answer_crosWalk.options[answer_crosWalk.selectedIndex].value == "min"){
            crossWalk = -5;
    }

    //위험요소A,B
    var i = 0;
    while(i<4){
        var a = document.getElementById("a"+i);
        var b = document.getElementById("b"+i)

        if(a != null &&
            a.options[a.selectedIndex].value == "min"){
            dangerA += -5;
        }
        if(b != null &&
            b.options[b.selectedIndex].value == "min"){
            dangerB += -5;
        }
        i++;
    }

    addTurnPointAndTableWeightToFireStore(turnType,tableWeight);
    addDangerWeightToFirestore(crossWalk,dangerA,dangerB);
}

//feedback.html
function changeWeightPriority(){
    var answer2 = document.getElementById('a2');
    var tableWeight = 0 , turnType = 0;
    //
        tableWeight_danger = 1;
        tableWeight_road = 1;
    //
    var turn_value , cross_value, danA_value , danB_value;

    //유지면 냅두고
    if(answer2.options[answer2.selectedIndex].value == "road" ){ //아니면 바꿈
        tableWeight = -0.1;
    }
    else if(answer2.options[answer2.selectedIndex].value == "danger"){ //박
        tableWeight = 0.1;
    }

    var answer3 = document.getElementById('a3');
    if(answer3.options[answer3.selectedIndex].value == "stright"){
        turnType = -5;
    }
    else if(answer3.options[answer3.selectedIndex].value == "short"){
        turnType = 5;
    }

    for(var i = 1 ; i < 5 ; i++){
        var ranking =  document.getElementById('r' + i);
        switch(ranking.options[ranking.selectedIndex].value){
            case "turn":
                turn_value = i * -10;
                break;

            case "cross":
                cross_value = i * -10;
                break;

            case "danA":
                danA_value = i * -10;
                break;

            case "danB":
                danB_value = i * -10;
                break;
        }
      }

    addTurnPointAndTableWeightToFireStore(turnType,tableWeight_danger,tableWeight_road);
    setDangerWeightToFirestore(cross_value,danA_value,danB_value,turn_value);
}


var valueList = [];

//중복제거함수
function findOverlap(num) {
    var id = document.getElementById("r"+num);
    var v = id.options[id.selectedIndex].value;
    var v2 = null;
    if (valueList[num-1] != null) {
        v2 = valueList[num-1];
    }
    valueList[num-1] = v;
    for (i = 1; i<5; i++) {
      if (i!=num) {
        var id2 = document.getElementById("r"+i);
        for (j = 1; j<5; j++) {
          if(id2.options[j].value == v){
            id2.options[j].disabled = true;
          }
          else if (id2.options[j].value == v2){
            id2.options[j].disabled = false;
          }
        }
      }
    }
}

//choose고르면 빨간 경고 보이는 함수
function showWarning(index){
    var selectedId = document.getElementById("r"+index);
    var warningId = document.getElementById("f"+index);
    if(selectedId.options[selectedId.selectedIndex].value == "empty"){
        warningId.style.display = "block";
    } 
    else{
        warningId.style.display = "none";
    }
}
