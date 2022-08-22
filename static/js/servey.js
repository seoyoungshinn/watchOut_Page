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
    if(history.hasDanger == true){
        var dangerAarr = Array.from(history.hasDangerA); //dangerA = 엘베-육교-지하보도-계단
        var dangerBarr = Array.from(history.hasDangerB); //dangerB = 교량-터널-고가도로-대형시설통로
        
        var questionDiv = document.getElementById('weightQ');
       for(var i = 0 ; i < dangerAarr.length ; i++){
            if(dangerAarr[i] != "0"){
                console.log(dangerAarr[i]);
                questionDiv.appendChild(makeQuestionDiv(i));
                questionDiv.appendChild(makeAnswerDiv(i));
            } 
            if(dangerBarr[i] != "0"){
                console.log(dangerBarr[i]);
       }
   }  
    }
    
    //danger == false인 경우
        //->아무것도x
}

// <!-- <div class="col-lg-8">
//  <label class="form-label">Q4</label>
//  <span class="question">이용하신 경로에는 (시설물)이 있었습니다. 향후 (시설물)이 최소화된 길을 안내받으시려면 “최소화”를 선택해주세요.</span>
// </div>
function makeQuestionDiv(index){
    let col_lg_8Div = document.createElement('div');
    col_lg_8Div.className = 'col-lg-8'

    let label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = "A"+index;

    let span = document.createElement('span');
    span.className = 'question';
    span.textContent = "질문";

    col_lg_8Div.appendChild(label);
    col_lg_8Div.appendChild(span);

    return col_lg_8Div;
}

// <div class="col-md-4">
//  <label class="form-label">A4</label>
//  <select class="form-select" id="a4">
//      <option value="keep">유지</option>
//      <option value="minmize">최소화</option>
//  </select>
// </div>
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
    let option_min = document.createElement('option');
    option_min.value = "min";

    select.appendChild(option_keep);
    select.appendChild(option_min);

    col_md_4Div.appendChild(label);
    col_md_4Div.appendChild(select);

    return col_md_4Div;
}

function checkDanger1(data) {
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