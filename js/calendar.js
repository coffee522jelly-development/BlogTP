//////////////////////////////////////////////////////////////////////////////////
// 処理

// カレンダー追加
function addCalendar(wrapper, year, month) {
    wrapper.textContent = null;

    const headData = generateCalendarHeader(wrapper, year, month);
    const bodyData = generateMonthCalendar(year, month);

    wrapper.appendChild(headData);
    wrapper.appendChild(bodyData);
}
 
// カレンダーヘッダ生成
function generateCalendarHeader(wrapper, year, month) {
    let nextMonth = new Date(year, (month - 1));
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    let prevMonth = new Date(year, (month - 1));
    prevMonth.setMonth(prevMonth.getMonth() - 1);
 
    let cHeader = document.createElement('div');
    cHeader.className = 'calendar-header';
 
    let cTitle = document.createElement('div');
    cTitle.className = 'calendar-header-title';
    let cTitleText = document.createTextNode(year + '年' + month + '月');
    cTitle.appendChild(cTitleText);
    cHeader.appendChild(cTitle);
 
    let cPrev = document.createElement('button');
    cPrev.className = 'btn btn-light btn-lg calendar-prev';
    let cPrevText = document.createTextNode('prev');
    cPrev.appendChild(cPrevText);

    cPrev.addEventListener('click', function() {
        addCalendar(wrapper, prevMonth.getFullYear(), (prevMonth.getMonth() + 1));
    }, false);
    cHeader.appendChild(cPrev);
 
    let cNext = document.createElement('button');
    cNext.className = 'btn btn-light btn-lg calendar-next';
    let cNextText = document.createTextNode('next');
    cNext.appendChild(cNextText);

    cNext.addEventListener('click', function() {
        addCalendar(wrapper, nextMonth.getFullYear(), (nextMonth.getMonth() + 1));
    }, false);
    cHeader.appendChild(cNext);
 
    return cHeader;
}

// 月別カレンダー生成
function generateMonthCalendar(year, month) {
    const weekdayData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendarData = getMonthCalendar(year, month);
 
    let i = calendarData[0]['weekday']; // 初日の曜日を取得
    while(i > 0) {
        i--;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }
    let j = calendarData[calendarData.length - 1]['weekday']; // 末日の曜日を取得
    while(j  < 6) {
        j++;
        calendarData.push({
            day: '',
            weekday: j 
        });
    }
 
    let cTable = document.createElement('table');
    cTable.className = 'table table-striped calendar-table';
 
    let insertData = '';
    insertData += '<thead>';
    insertData += '<tr>';
    for (let i = 0; i < weekdayData.length; i++) {
        insertData += getWeekId(i);
        insertData += weekdayData[i];
        insertData += '</th>';
    }
    insertData += '</tr>';
    insertData += '</thead>';
 
    insertData += '<tbody>';
    for (let i = 0; i < calendarData.length; i++) {
        let week = calendarData[i]['weekday'];
        if (week <= 0) {
            insertData += '<tr>';
        }

        insertData += getWeekId(week);
        insertData += calendarData[i]['day'];
        insertData += '</td>';

        if (week >= 6) {
            insertData += '</tr>';
        }        
    }
    insertData += '</tbody>';
 
    cTable.innerHTML = insertData;
    return cTable;
}

// カレンダー取得
function getMonthCalendar(year, month) {
    const firstDate = new Date(year, (month - 1), 1);
    const lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate();
    const weekday = firstDate.getDay();
 
    let calendarData = [];
    let weekdayCount = weekday;
    for (let i = 0; i < lastDay; i++) {
        calendarData[i] = {
            day: i + 1,
            weekday: weekdayCount
        }

        if (weekdayCount >= 6) {
            weekdayCount = 0;
        } else {
            weekdayCount++;
        }
    }
    return calendarData;
}

//////////////////////////////////////////////////////////////////////////////////
// 表示・フォーマッタ

// 曜日設定
function getWeekId(num){
    let Data = '';
    switch (num) {
        case 0:
            Data += '<td class="sun">';
            break;
        case 6:
            Data += '<td class="sat">';
            break;
        default:
            Data += '<td>';
            break;
    }
    return Data;
}