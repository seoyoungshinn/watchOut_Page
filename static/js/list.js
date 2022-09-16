var recentHistoryArr = []; //선호도조사로 넘길 변수

function showFavoritesOnWeb(id,data){
    let favNameDiv = document.createElement('div');
            favNameDiv.textContent = id;
            favNameDiv.setAttribute(
                'style',
                'color:white; font-size: 1.5rem !important;  flex: 0 0 auto; padding-left:2rem; padding-right:2rem;'
              );

            let favFrequencySpan = document.createElement('span');
            favFrequencySpan.textContent = data.frequency + "회";
            favFrequencySpan.setAttribute(
                'style',
                'font-size:1.2rem; color:#adb5bd; float:right;'
            )

            let favaddressDiv = document.createElement('div');
            favaddressDiv.textContent = data.address;
            favaddressDiv.setAttribute(
                'style',
                'color:#dee2e6; padding-left:2rem;padding-right:2rem;'
            );

            let p =  document.createElement('p');
            // p.setAttribute(
            //     'style',
            //     'background-color: #ced4da;'
            // )

            let listDiv = document.getElementById('favoritesList');
            
            favNameDiv.appendChild(favFrequencySpan);
            p.appendChild(favNameDiv);
            p.appendChild(favaddressDiv);
            listDiv.appendChild(p);
}

function showHistoryOnWeb(num,history){
    let leftDiv = document.createElement('div');
    leftDiv.setAttribute(
        'style',
        'float:left;width:150px;height:100px;font-size:20px;color:white;text-align:center;'
    );
    let a1 = document.createElement('a');
    a1.setAttribute(
        'style',
        'font-weight: bold; font-size: 24px;'
    );
    a1.innerHTML = history.departureTime.toLocaleDateString();
    let a2 = document.createElement('a');
    a2.innerHTML = '&#128062';
    let a3 = document.createElement('a');
    a3.innerHTML = " "+history.stepNum +'<br>';
    let a4 = document.createElement('a');
    a4.innerHTML = '&#128151';
    let a5 = document.createElement('a');
    a5.setAttribute(
        'style',
        'color:#FF2600;'
    );
    a5.innerHTML = " "+history.heartRateMax+" ";
    let a6 = document.createElement('a');
    a6.innerHTML = "/ "+ history.heartRateAverage;
    leftDiv.appendChild(a1);
    leftDiv.appendChild(a2);
    leftDiv.appendChild(a3);
    leftDiv.appendChild(a4);
    leftDiv.appendChild(a5);
    leftDiv.appendChild(a6);

    let centerDiv = document.createElement('div');
    centerDiv.setAttribute(
        'style',
        'font-size: 20px; color:white; float:left; margin-left: 55px; height:100px; width:450px; padding-top:20px;  text-align: left;'
    );
    centerDiv.innerHTML = "S &nbsp; "+history.departureTime.getHours()+" : "+history.departureTime.getMinutes()+"&nbsp; "+history.dpName+"<br>"+"E &nbsp; "+history.arrivedTime.getHours()+" : "+history.arrivedTime.getMinutes()+"&nbsp; "+history.arrivedName;
    

    let listDiv = document.getElementById('historyList'+num);
    listDiv.appendChild(leftDiv);
    listDiv.appendChild(centerDiv);
}

function showForFeedback(index, history){
    var dateTagName = "date" + index; //날짜
    
    var dateDiv = document.getElementById(dateTagName);
    dateDiv.textContent = history.departureTime.toLocaleDateString();

    var desTagName = "des" + index;
    var desDiv = document.getElementById(desTagName);
    desDiv.textContent = history.dpName + " -> " + history.arrivedName;

    recentHistoryArr.push(history.name);
}

function showInfoOnHI(info){
    var sname = document.getElementById('startnameinfo');
    var ename = document.getElementById('endnameinfo');
    var rscore = document.getElementById('routescoreinfo');
    var rlen = document.getElementById('routelengthinfo');
    var rtime = document.getElementById('routetimeinfo');
    var ltime = document.getElementById('realtimeinfo');
    var etc = document.getElementById('etcinfo');

    sname.innerHTML = info.dpName;
    ename.innerHTML = info.arrivedName;
    rscore.innerHTML = "";
    rlen.innerHTML = "";
    rtime.innerHTML = info.expectedTime;
    ltime.innerHTML = "";
    etc.innerHTML = getEtc(info);

}
function getEtc(info){
    var etcMsg;
    if (info.hasCrossWalk != 0){
        etcMsg += " 횡단보도 ("+info.hasCrossWalk.toString()+"회)";
    }
    if(history.hasDanger == true){
        if(history.hasDangerA != null) { //dangerA = 엘베-육교-지하보도-계단(차도분리)
            var dangerAarr = Array.from(history.hasDangerA.toString());
            for(var i = 0; i < dangerAarr.length ; i++){
                if(dangerAarr[i] != "0"){
                    var dangerName;
                    switch(i){
                        case 0:
                            dangerName = "엘레베이터";
                            break;
                        case 1:
                            dangerName = "육교";
                            break;
                        case 2:
                            dangerName = "지하보도";
                            break;
                        case 3:
                            dangerName = "계단";
                            break;
                    }
                    etcMsg += " "+dangerName+" ("+dangerAarr[i]+"회)";
                }
            }  
        }
        if(history.hasDangerB != null) { //dangerB = 교량-터널-고가도로-대형시설통로(차도비분리)
            var dangerBarr = Array.from(history.hasDangerB);
            for(var i = 0; i < dangerBarr.length ; i++){
                if(dangerBarr[i] != "0"){
                    var dangerName;
                    switch(i){
                        case 0:
                            dangerName = "교량";
                            break;
                        case 1:
                            dangerName = "터널";
                            break;
                        case 2:
                            dangerName = "고가도로";
                            break;
                        case 3:
                            dangerName = "대형시설통로";
                            break;
                    }
                    etcMsg += " "+dangerName+" ("+dangerBarr[i]+"회)";
                }
            }  
        }
    }
    etcMsg += "가 포함된 경로입니다.";
    return etcMsg;
}