
// function changeRouteScore(){
//     var score_value = document.getElementById('answer1');
//     var value = score_value.options[score_value.selectedIndex].value;

//     if(value < 6){ 
//         $('#weightQ').css('visibility','visible');
//     }
//     else if(value >= 6){
//         $('#weightQ').css('visibility','hidden');
//     }
// }

function checkDangerAndShowQuestion(history){
    //danger ==true 인경우
    var number = 3;
    var crossNum = history.hasCrossWalk;
    if(crossNum != 0){
        makeQuestionDiv("횡단보도",crossNum,number);
        number++;
    }
    if(history.hasDanger == true){
        if(history.hasDangerA != null) { //dangerA = 엘베-육교-지하보도-계단(차도분리)
            var dangerAarr = Array.from(history.hasDangerA.toString());
            for(var i = dangerAarr.length-1 ; i >= 0 ; i--){
                if(dangerAarr[i] != "0"){
                    makeQuestionDiv("a"+i,dangerAarr[i],number);
                    number++;
                }
            }  
        }
        if(history.hasDangerB != null) { //dangerB = 교량-터널-고가도로-대형시설통로(차도비분리)
            var dangerBarr = Array.from(history.hasDangerB);
            for(var i = dangerBarr.length-1 ; i >= 0 ; i--){
                if(dangerBarr[i] != "0"){
                    makeQuestionDiv("b"+i,dangerBarr[i],number);
                    number++;
                }
            }  
        }
    }
    endQuestion(number);  
    //danger == false인 경우
        //->아무것도x(
}

function makeQuestionDiv(name,num,index){

    let ui = document.getElementById('slidelist');
    let li = document.createElement('li');
    let div1 = document.createElement('div');
    div1.setAttribute(
        'style',
        'padding: 15px 10px;height: 100%; text-align:center;'
    )
    let div2 = document.createElement('div');
    div2.setAttribute(
        'style',
        'color:#333489; font-size:40px; font-weight: bold;'
    );
    div2.innerHTML = "평가하기";
    let spanQ = document.createElement('span');
    spanQ.setAttribute(
        'style',
        'height:50px;font-size:18px;color:black;margin-top:80px;margin-left:20px;float:left;width:800px;'
    )
    spanQ.innerHTML = "Q"+index+". ";
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
    spanQ.innerHTML += "이용하신 경로에는 "+dangerName+" "+num+"개가 있었습니다. <br>향후 "+dangerName+"이 최소화된 길을 안내받으시려면 '최소화'를 선택해주세요";
    let labelleft = document.createElement('label');
    labelleft.className="left";
    labelleft.htmlFor="slide"+(index-1);
    let answer = document.createElement('div');
    answer.className = "answers"
    answer.setAttribute(
        'style',
        'margin-top:35px;margin-right:120px;width:120px;float:right;'
    )
    let input1 = document.createElement('input');
    input1.type = "radio";
    input1.name = "anss"+index;
    input1.setAttribute(
        'style',
        'display: none;'
    )
    input1.id = "select"+(index*2+8);
    let label1 = document.createElement('label');
    label1.htmlFor="select"+(index*2+8);
    label1.textContent="유지";
    label1.setAttribute(
        'style',
        'cursor: pointer;font-size: 18px;border: 2px solid #333489;background-color: #E0EBFF;color: #333489;float: left;width: 120px;margin-top: 20px; padding:10px;border-radius: 0.5rem; font-weight:bold;'
    )

    answer.appendChild(input1);
    answer.appendChild(label1);

    let input2 = document.createElement('input');
    input2.type = "radio";
    input2.name = "anss"+index;
    input2.setAttribute(
        'style',
        'display: none;'
    )
    input2.id = "select"+(index*2+9);
    let label2 = document.createElement('label');
    label2.htmlFor="select"+(index*2+9);
    label2.textContent="최소화";
    label2.setAttribute(
        'style',
        'cursor: pointer;font-size: 18px;border: 2px solid #333489;background-color: #E0EBFF;color: #333489;float: left;width: 120px;margin-top: 20px; padding:10px;border-radius: 0.5rem; font-weight:bold;'
    )
    answer.appendChild(input2);
    answer.appendChild(label2);

    label1.onclick = function(){
        label1.style.backgroundColor = "#646496";
        label1.style.color = "#fff";
        label2.style.backgroundColor = "#E0EBFF";
        label2.style.color = "#333489";
    }
    label2.onclick = function(){
        label2.style.backgroundColor = "#646496";
        label2.style.color = "#fff";
        label1.style.backgroundColor = "#E0EBFF";
        label1.style.color = "#333489";
    }

    let labelright = document.createElement('label');
    labelright.className="right";
    labelright.htmlFor="slide"+(index+1);
    div1.appendChild(div2);
    div1.appendChild(spanQ);
    div1.appendChild(labelleft);
    div1.appendChild(answer);
    div1.appendChild(labelright);
    li.appendChild(div1);
    ui.appendChild(li);

}

function endQuestion(num){

    let ui = document.getElementById('slidelist');
    let li = document.createElement('li');
    let div1 = document.createElement('div');
    div1.className = "select";
    div1.style.textAlign = "center";
    let div2 = document.createElement('div');
    div2.setAttribute(
        'style',
        'color:#333489; font-size:40px; font-weight: bold; margin-top:150px;'
    );
    div2.innerHTML = "평가하기 끝!";
    let labelleft = document.createElement('label');
    labelleft.className="left";
    labelleft.htmlFor="slide"+(num-1);
    let btn = document.createElement('button');
    btn.id="update";
    btn.innerHTML = "완료";
    btn.onclick = function() {
        getAllDatas();
    }
    btn.className = "btn";
    div1.appendChild(div2);
    div1.appendChild(labelleft);
    div1.appendChild(btn);
    li.appendChild(div1);
    ui.appendChild(li);


}

// function makeAnswerDiv(name,index){
//     let col_md_4Div = document.createElement('div');
//     col_md_4Div.className = 'col-md-4'

//     let label = document.createElement('label');
//     label.className = 'form-label';
//     label.textContent = "A"+index;

//     let select = document.createElement('select');
//     select.className = "form-select";
//     select.setAttribute("id", name);
    
//     let option_keep = document.createElement('option');
//     option_keep.value = "keep";
//     option_keep.innerHTML = "유지";
//     let option_min = document.createElement('option');
//     option_min.value = "min";
//     option_min.innerHTML = "최소화";

//     select.appendChild(option_keep);
//     select.appendChild(option_min);

//     col_md_4Div.appendChild(label);
//     col_md_4Div.appendChild(select);

//     return col_md_4Div;
// }

function showRouteName(history) {
    var id = document.getElementById('routename');
    var aname = history.arrivedName;
    var dname = history.dpName;
    id.innerHTML = dname+"->"+aname;
}

function getAllDatas(){
    var turnType = 0, crossWalk = 0 , dangerA = 0 , dangerB = 0;

    for (i = 2; i<10; i++){
        let anss = "anss"+i;
        if(document.querySelector('input[name="'+anss+'"]')){
            let data = document.querySelector('input[name="'+anss+'"]:checked').id;
                switch (data) {
                    case 'select11':
                        turnType = -5;
                        break;
                    case 'select13':
                        turnType = 5;
                        break;
                    case 'select15':
                        crossWalk = -5;
                        break;
                    case 'select17':
                    case 'select19':
                    case 'select21':
                    case 'select23':
                        dangerA += -5;
                        break;
                    case 'select25':
                    case 'select27':
                    case 'select29':
                    case 'select31':
                        dangerB += -5;
                        break;
                    dafault:
                        break;
                }
        }
    }
    console.log(turnType,crossWalk,dangerA,dangerB);
    addDangerWeightToFirestore(turnType,crossWalk,dangerA,dangerB);
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
