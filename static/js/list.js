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

function showForSimulation(index, history){
    var dateTagName = "date" + index; //날짜
    
    var dateDiv = document.getElementById(dateTagName);
    dateDiv.textContent = history.departureTime.toLocaleDateString();

    var desTagName = "des" + index;
    var desDiv = document.getElementById(desTagName);
    desDiv.textContent = history.dpName + " -> " + history.arrivedName;

    recentHistoryArr.push(history.name);
}