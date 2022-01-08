//////////////////////////////////////////////////////////////////////////////////
// 処理

// カレンダー追加
function add_calendar(wrapper, year, month) {
    // 現在カレンダーが追加されている場合は一旦削除する
    wrapper.textContent = null;
 
    // カレンダーに表示する内容を取得
    let headData = generate_calendar_header(wrapper, year, month);
    let bodyData = generate_month_calendar(year, month);
 
    // カレンダーの要素を追加
    wrapper.appendChild(headData);
    wrapper.appendChild(bodyData);
}
 
// カレンダーヘッダ生成
function generate_calendar_header(wrapper, year, month) {
    // 前月と翌月を取得
    let nextMonth = new Date(year, (month - 1));
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    let prevMonth = new Date(year, (month - 1));
    prevMonth.setMonth(prevMonth.getMonth() - 1);
 
    // ヘッダー要素
    let cHeader = document.createElement('div');
    cHeader.className = 'calendar-header';
 
    // 見出しの追加
    let cTitle = document.createElement('div');
    cTitle.className = 'calendar-header-title';
    let cTitleText = document.createTextNode(year + '年' + month + '月');
    cTitle.appendChild(cTitleText);
    cHeader.appendChild(cTitle);
 
    // 前月ボタンの追加
    let cPrev = document.createElement('button');
    cPrev.className = 'btn btn-light btn-lg calendar-prev';
    let cPrevText = document.createTextNode('prev');
    cPrev.appendChild(cPrevText);
    // 前月ボタンをクリックした時のイベント設定
    cPrev.addEventListener('click', function() {
        add_calendar(wrapper, prevMonth.getFullYear(), (prevMonth.getMonth() + 1));
    }, false);
    cHeader.appendChild(cPrev);
 
    // 翌月ボタンの追加
    let cNext = document.createElement('button');
    cNext.className = 'btn btn-light btn-lg calendar-next';
    let cNextText = document.createTextNode('next');
    cNext.appendChild(cNextText);
    // 翌月ボタンをクリックした時のイベント設定
    cNext.addEventListener('click', function() {
        add_calendar(wrapper, nextMonth.getFullYear(), (nextMonth.getMonth() + 1));
    }, false);
    cHeader.appendChild(cNext);
 
    return cHeader;
}

// 月別カレンダー生成
function generate_month_calendar(year, month) {
    let weekdayData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // カレンダーの情報を取得
    let calendarData = get_month_calendar(year, month);
 
    let i = calendarData[0]['weekday']; // 初日の曜日を取得
    // カレンダー上の初日より前を埋める
    while(i > 0) {
        i--;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }
    let i = calendarData[calendarData.length - 1]['weekday']; // 末日の曜日を取得
    // カレンダー上の末日より後を埋める
    while(i < 6) {
        i++;
        calendarData.push({
            day: '',
            weekday: i
        });
    }
 
    // カレンダーの要素を生成
    let cTable = document.createElement('table');
    cTable.className = 'table table-striped calendar-table';
 
    let insertData = '';
    // 曜日部分の生成
    insertData += '<thead>';
    insertData += '<tr>';
    for (let i = 0; i < weekdayData.length; i++) {
        insertData += GetWeekId(i);
        insertData += weekdayData[i];
        insertData += '</th>';
    }
    insertData += '</tr>';
    insertData += '</thead>';
 
    // 日付部分の生成
    insertData += '<tbody>';
    for (let i = 0; i < calendarData.length; i++) {
        let week = calendarData[i]['weekday'];
        if(week <= 0) {
            insertData += '<tr>';
        }

        insertData += GetWeekId(week);
        insertData += calendarData[i]['day'];
        insertData += '</td>';

        if(week >= 6) {
            insertData += '</tr>';
        }        
    }
    insertData += '</tbody>';
 
    cTable.innerHTML = insertData;
    return cTable;
}

// カレンダー取得
function get_month_calendar(year, month) {
    let firstDate = new Date(year, (month - 1), 1); // 指定した年月の初日の情報
    let lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate(); // 指定した年月の末日
    let weekday = firstDate.getDay(); // 指定した年月の初日の曜日
 
    let calendarData = []; // カレンダーの情報を格納
    let weekdayCount = weekday; // 曜日のカウント用
    for (let i = 0; i < lastDay; i++) {
        calendarData[i] = {
            day: i + 1,
            weekday: weekdayCount
        }

        // 曜日のカウントが6(土曜日)まできたら0(日曜日)に戻す
        if(weekdayCount >= 6) {
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
function GetWeekId(num){
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