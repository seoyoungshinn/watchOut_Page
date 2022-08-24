function changeRouteScore(){
    var score_value = document.getElementById('a1');
    var value = score_value.options[score_value.selectedIndex].value;

    if(value < 6){ 
        $('#weightQ').css('visibility','visible');
    }
    else if(value >= 6){
        $('#weightQ').css('visibility','hidden');
    }
}

function checkDanger(history){
    //danger ==true 인경우
    var number = 4;
    var crossNum = history.hasCrossWalk;
    var questionDiv = document.getElementById('weightQ');
    questionDiv.appendChild(makeQuestionDiv("횡단보도",crossNum,number));
    questionDiv.appendChild(makeAnswerDiv(number));
    number++;
    if(history.hasDanger == true){
        var dangerAarr = Array.from(history.hasDangerA.toString()); //dangerA = 엘베-육교-지하보도-계단
        var dangerBarr = Array.from(history.hasDangerB.toString()); //dangerB = 교량-터널-고가도로-대형시설통로
        if(dangerAarr != null) {
            for(var i = dangerAarr.length-1 ; i >= 0 ; i--){
                if(dangerAarr[i] != "0"){
                    questionDiv.appendChild(makeQuestionDiv("a"+i,dangerAarr[i],number));
                    questionDiv.appendChild(makeAnswerDiv(number));
                    number++;
                }
            }  
        }
        if(dangerBarr != null) {
            for(var i = dangerBarr.length-1 ; i >= 0 ; i--){
                if(dangerBarr[i] != "0"){
                    questionDiv.appendChild(makeQuestionDiv("b"+i,dangerBarr[i],number));
                    questionDiv.appendChild(makeAnswerDiv(number));
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
    span.textContent = "이용하신 경로에는 ("+dangerName+")이 있었습니다. 향후 ("+dangerName+")이 최소화된 길을 안내받으시려면 '최소화'를 선택해주세요";

    col_lg_8Div.appendChild(label);
    col_lg_8Div.appendChild(span);

    return col_lg_8Div;
}

function makeAnswerDiv(index){
    let col_md_4Div = document.createElement('div');
    col_md_4Div.className = 'col-md-4'

    let label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = "A"+index;

    let select = document.createElement('select');
    select.className = "form-select";
    select.setAttribute("id", "a"+index);
    
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

function routeName(history) {
    var id = document.getElementById('routename');
    var aname = history.arrivedName;
    var dname = history.dpName;
    id.innerHTML = dname+"->"+aname;
}