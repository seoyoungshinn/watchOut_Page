
function showFavoritesOnWeb(id,data){
    let favNameDiv = document.createElement('div');
            favNameDiv.textContent = id;
            favNameDiv.setAttribute(
                'style',
                'color:darkslategrey; font-size: 1.5rem !important; flex: 0 0 auto;width: 66.66666667%;'
              );

            let favFrequencySpan = document.createElement('span');
            favFrequencySpan.textContent = data.frequency + "회";
            favFrequencySpan.setAttribute(
                'style',
                'font-size: 1.0rem; color:#adb5bd; float:right;'
            )

            let favaddressDiv = document.createElement('div');
            favaddressDiv.textContent = data.address;
            favaddressDiv.setAttribute(
                'style',
                'color:#6c757d'
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

function showHistoryOnWeb(history){
    let backgroundDiv = document.createElement('div');
    backgroundDiv.setAttribute(
        'style',
        'padding: 1rem; border-radius: 0.3rem !important; background-color: blanchedalmond; margin:10px;',
      );

    let firstDiv = document.createElement('div');
    let dateSpan = document.createElement('span');
    dateSpan.textContent = history.departureTime.toLocaleDateString();
    dateSpan.setAttribute(
        'style',
        'display:inline-block; width:90px;'
    );
    let departureTimeSpan = document.createElement('span');
    departureTimeSpan.textContent = history.departureTime.getHours()+":"+history.departureTime.getMinutes()+":"+history.departureTime.getSeconds();
    departureTimeSpan.setAttribute(
        'style',
        'display:inline-block; width:60px;'
    );
    let departureNameSpan = document.createElement('span');
    departureNameSpan.textContent ="E: "+ history.dpName;
    departureNameSpan.setAttribute(
        'style',
        'padding: 5px; color:darkslategrey;font-size:13px;font-weight:bold;'
    );

    firstDiv.appendChild(dateSpan);
    firstDiv.appendChild(departureTimeSpan);
    firstDiv.appendChild(departureNameSpan);

    let secondDiv = document.createElement('div');
    let healthSpan = document.createElement('span');
    healthSpan.textContent = history.stepNum+" "+ history.heartRateAverage;
    healthSpan.setAttribute(
        'style',
        'display:inline-block; color:#dc3545; width:90px;'
    );
   
    let arrivedTimeSpan = document.createElement('span');
    arrivedTimeSpan.textContent = history.arrivedTime.getHours()+":"+history.arrivedTime.getMinutes()+":"+history.arrivedTime.getSeconds();
    arrivedTimeSpan.setAttribute(
        'style',
        'display:inline-block; width:60px;'
    );
    let arrivedNameSpan = document.createElement('span');
    arrivedNameSpan.textContent ="S: "+ history.arrivedName;
    arrivedNameSpan.setAttribute(
        'style',
        'padding: 5px; color:darkslategrey; font-size:13px; font-weight:bold;'
    );
    secondDiv.appendChild(healthSpan);
    secondDiv.appendChild(arrivedTimeSpan);
    secondDiv.appendChild(arrivedNameSpan);

    backgroundDiv.appendChild(firstDiv);
    backgroundDiv.appendChild(secondDiv);

    let listDiv = document.getElementById('historyList');
    listDiv.appendChild(backgroundDiv);
}