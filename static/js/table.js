 
 //테이블그리는 함수
 function drawTypeTable(){ //대가리

    let table = document.createElement('table');
    table.setAttribute(
        'style',
        'border-collapse:collapse;width:700px;'
    );
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('saftyTables').appendChild(table);
    
    let row_2 = document.createElement('tr');
    row_2.setAttribute(
        'style',
        'background-color:white;color:#333;font-family:Arial, sans-serif;font-size:15px;overflow:hidden;padding:10px 5px;word-break:normal;'
    );
    let row_2_data_1 = document.createElement('th');
    
    row_2_data_1.setAttribute(
        'style',
        'text-align:center;vertical-align:top; width:78px;height:30px;'
    );
    row_2.appendChild(row_2_data_1);

    let row_2_data_2 = document.createElement('th');
    row_2_data_2.innerHTML = "도로 점수";
    row_2_data_2.setAttribute(
        'style',
        'text-align:center;vertical-align:center;width:200px;height:30px;'
    );
    let row_2_data_3 = document.createElement('th');
    row_2_data_3.innerHTML = "위험 점수";
    row_2_data_3.setAttribute(
        'style',
        'text-align:center;vertical-align:center;width:200px;height:30px;'
    );
    let row_2_data_4 = document.createElement('th');
    row_2_data_4.innerHTML = "총 점수";
    row_2_data_4.setAttribute(
        'style',
        'text-align:center;vertical-align:center;width:200px;height:30px;'
    );

    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2.appendChild(row_2_data_4);

    thead.appendChild(row_2);
}

function drawDataTables(index,flag,saftyparams){ //값 부분
    var color = "#8896AE";
    var fontweight = "normal";
    if(flag == true){
        color = '#B7C5E4';
        fontweight = "bold";
    }

    var saftyparamsArr = saftyparams.split(",");

    let table = document.createElement('table');
    table.setAttribute(
        'style',
        'border-collapse:collapse;border-spacing:0;width:700px;'
    );
    let thead = document.createElement('thead');

    table.appendChild(thead);

    document.getElementById('saftyTables').appendChild(table);
    
    let row_1 = document.createElement('tr');
    row_1.setAttribute(
        'style',
        'background-color:#fff;font-family:Arial, sans-serif;font-size:15px;overflow:hidden;padding:10px 5px;word-break:normal;font-style:bold;'
    );

    let heading_1 = document.createElement('td');
    heading_1.innerHTML = "경로"+(index+1);
    heading_1.rowSpan = 2;
    heading_1.style.backgroundColor = color;
    heading_1.style.borderColor = "inherit";
    heading_1.style.textAlign = "center";
    heading_1.style.verticalAlign = "center";
    heading_1.style.width = "100px;"
    heading_1.style.height = "60px";
    heading_1.style.fontWeight = fontweight;

    row_1.append(heading_1);


    
    for(var i = 0 ; i < 3 ; i++){
        let row_1_data =  document.createElement('td');
        row_1_data.setAttribute(
            'style',
            'text-align:center;color:#333;vertical-align:center;width:200px;'
        );
        row_1.style.backgroundColor = color;
        row_1.style.fontWeight = fontweight;
        row_1_data.innerHTML = saftyparamsArr[i];
        row_1.appendChild(row_1_data);
    }
   
    let row_2 = document.createElement('tr');
    row_2.setAttribute(
        'style',
        'background-color:#fff;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;'
    );

    let row_2_data = document.createElement('td');

    var str = "";
    for(var i = 3 ; i < saftyparamsArr.length;i++){
        str += saftyparamsArr[i];
    }

    row_2_data.innerHTML = str;
    row_2_data.setAttribute(
        'style',
        'text-align:center;vertical-align:center;'
    );
    row_2_data.style.backgroundColor = color;
    row_2_data.style.fontWeight = fontweight;
    row_2_data.colSpan = 3;
    row_2.appendChild(row_2_data); //특이사항 있으면 넣기

    thead.appendChild(row_1);
    thead.appendChild(row_2);

}
