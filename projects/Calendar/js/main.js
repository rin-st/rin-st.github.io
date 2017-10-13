window.onload = function(){
  var week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
  var fullYear = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
  var fullYearYa = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
  var calendarContainer = document.getElementsByClassName('calendar-container')[0]

  var eventNames = document.getElementsByClassName('event-name');
  var eventDates = document.getElementsByClassName('event-date');
  var eventPeoples = document.getElementsByClassName('event-peoples');
  var eventDescriptions = document.getElementsByClassName('event-description');
  var evTasks = document.getElementsByClassName('task');

  var spanWeeks = document.getElementsByClassName('span-week');
  var spanNumbers = document.getElementsByClassName('spanNumber');
  var cMonth = document.getElementsByClassName('c-month')[0];
  var curDate = new Date();
  var curMonth = curDate.getMonth(); //получаем индекс текущего месяца
  var curYear = curDate.getFullYear(); //индекс дня недели текущего месяца
  var firstDayOfMonth;
  var firstDayOfMonthIndex;

  var eventsBegin = new Date(1960, 1, 1); //начало действия событий
  var eventsEnd = new Date(2060,1,1); //конец действия событий
  //количество дней в заданном интервале
  var eventsAmount = Math.ceil((eventsEnd.getTime() - eventsBegin.getTime())/(1000 * 3600 * 24))//30000; //количество дней, которые будем отслеживать
  console.log(eventsAmount);

  var eventsBeginYear = eventsBegin.getFullYear();
  var eventsBeginMonth = eventsBegin.getMonth();

  var eventsInfo = []; //массив информации о событиях
  var activeEvents = []; //массив заполненных элементов
  //делаем доступными для записи ближайшие eventsAmount дней
  for (var i = 0; i < eventsAmount; i++){

  var eventNext = new Date(eventsBeginYear, eventsBeginMonth, 1 + i);
  //сразу заполняем даты, т.к. они понятны
    eventsInfo[i]={ name: "",
                    evDate: eventNext.getDate() + " " + fullYearYa[eventNext.getMonth()] + " " + eventNext.getFullYear(),
                    peoples: "",
                    description: ""};
  }

    console.log(eventsInfo[2]);

  function fillMonth(){
    //определение первого дня месяца (день недели)
    firstDayOfMonth = new Date (curYear, curMonth, 1);
    firstDayOfMonthIndex = firstDayOfMonth.getDay();
    //счёт начинается с воскресенья, переведем к нашему счёту
    if (firstDayOfMonthIndex===0) firstDayOfMonthIndex = 7;
    firstDayOfMonthIndex--;
    console.log(firstDayOfMonth, firstDayOfMonthIndex);

    //приводим к корректной форме, если произошло переполнение по месяцам
    curMonth = firstDayOfMonth.getMonth();
    curYear = firstDayOfMonth.getFullYear();

    //заполняем месяц и год над таблицей, затем таблицу
    cMonth.innerHTML = fullYear[curMonth] + " " + curYear;

    for (var i = 0; i < 42; i++){
      spanWeeks[i].innerHTML = week[i % 7] + ', ';
      if (i > 6) spanWeeks[i].className += " week-day" ;
      var nextDay = new Date(curYear, curMonth, i + 1 - firstDayOfMonthIndex);

      //обозначаем те дни, которые не будем показывать в мобильной версии
      days[i].className = "day";
      if (nextDay.getMonth() !== curMonth) days[i].className = "day not-current";

      //находим сегодняшний день и выделяем серым
      if (Math.ceil((nextDay.getTime()-curDate.getTime())/1000/3600/24)===0){
        days[i].style.backgroundColor = "#f4f4f4";
        days[i].style.fontWeight = "bold";
      }

      var nextDayIndex = nextDay.getDate();
      spanNumbers[i].innerHTML += nextDayIndex;

      var evInd = getNumberOfEvent(i);
      if (evInd > -1){
        evTasks[i].innerHTML = eventsInfo[evInd].name;
      }
      else evTasks[i].innerHTML = "";
    }
  }

  function clearMonth(){
    for (var i = 0; i < 42; i++) spanNumbers[i].innerHTML = "";
  }

  function nextMonth(){
    clearMonth();
    clearResults();
    curMonth++;
    fillMonth();
  }
  function todayDate(){
    clearMonth();
    clearResults();
    curMonth = curDate.getMonth();
    curYear = curDate.getFullYear();
    fillMonth();
  }
  function previousMonth(){
    clearMonth();
    clearResults();
    curMonth--;
    fillMonth();
  }

  var arrows = document.getElementsByClassName('arrow');
  arrows[0].onclick = previousMonth;
  arrows[1].onclick = nextMonth;

  var today = document.getElementsByClassName('today')[0];
  today.onclick = todayDate;

  //-----------заполняем таблицу---------------
  for (var i = 0; i < 42; i++){
    var div = document.createElement('div');
    div.className = "day";

    var divNum = document.createElement('div');
    divNum.className = "number";

    var spanWeek = document.createElement('span'); ///
    spanWeek.className = "span-week";

    var span = document.createElement('span');
    span.className = "spanNumber";
//---------------всплывающая форма ----------------
    var eventForm = document.createElement('form');
    eventForm.className = "event-form";
    if (i<21) eventForm.className += " top-"
    else eventForm.className += " bottom-";

    if (i % 7 < 4) eventForm.className += "left"
    else eventForm.className += "right";

    var eventName = document.createElement('input');
    eventName.className = "event-name";
    eventName.type = "text";
    eventName.placeholder = "Событие";
    eventForm.appendChild(eventName);

    var eventDate = document.createElement('input');
    eventDate.className = "event-date";
    eventDate.type = "text";
    eventDate.placeholder = "День, месяц, год";
    eventForm.appendChild(eventDate);

    var eventPeople = document.createElement('input');
    eventPeople.className = "event-peoples";
    eventPeople.type = "text";
    eventPeople.placeholder = "Имена участников";
    eventForm.appendChild(eventPeople);

    var eventDescription = document.createElement('textarea');
    eventDescription.className = "event-description";
    eventDescription.placeholder = "Описание";
    eventForm.appendChild(eventDescription);

    var eventConfirm = document.createElement('input');
    eventConfirm.className = "event-confirm";
    eventConfirm.type = "button";
    eventConfirm.value = "Готово";
    eventForm.appendChild(eventConfirm);

    var eventDelete = document.createElement('input');
    eventDelete.className = "event-delete";
    eventDelete.type = "button";
    eventDelete.value = "Удалить";
    eventForm.appendChild(eventDelete);

    var xForm = document.createElement('div');
    xForm.className = "x-form";
    xForm.innerHTML = "&#10006;";
    eventForm.appendChild(xForm);

//-------------завершение всплывающей формы ---------------------
    var divTask = document.createElement('div');
    divTask.className = "task";

    divNum.appendChild(spanWeek); ///
    divNum.appendChild(span);
    divNum.appendChild(eventForm);//9
    div.appendChild(divNum);
    div.appendChild(divTask);
    calendarContainer.appendChild(div);

  //  eventDates[i].value = eventsInfo[i].evDate;
}
  //завершение заполнения

//###################################################################
//работа с массивом событий

//функция для программного заполнения события в n-ый день
  function evInfo(num, name, peoples, description){
    eventsInfo[num].name = name;

    if (peoples){
      eventsInfo[num].peoples = peoples;
    }

    if (description){
    eventsInfo[num].description = description;
    }

    activeEvents.push(num);
  }


  evInfo(6+21060, "Футбол", "Сергей, Алексей", "Отдых");
  evInfo(10+21060, "Рецепт болоньезе", "Шеф-повар");
  evInfo(12+21060, "Митинг", "Митя, Петя");
  evInfo(14+21060, "Забрать штаны", "Владимир", "Химчистка");
  evInfo(15+21060, "Митинг", "Митя, Петя");
  evInfo(16+21060, "Футбол", "Сергей, Алексей", "Отдых");
  evInfo(20+21060, "Рецепт болоньезе", "Шеф-повар");
  evInfo(22+21060, "Митинг", "Митя, Петя");
  evInfo(28+21060, "Свозить болонку к ветеринару после обеда");
  evInfo(30+21060, "Рецепт болоньезе", "Шеф-повар");
  evInfo(34+21060, "Забрать штаны", "Владимир", "Химчистка");
  evInfo(42+21060, "Встреча", "Дмитрий, Анна", "Друзья");
  evInfo(49+21060, "Футбол", "Сергей, Алексей", "Отдых");
  evInfo(52+21060, "Встреча", "Дмитрий, Анна", "Друзья");
  evInfo(57+21060, "Встреча", "Дмитрий, Анна", "Друзья");
  evInfo(58+21060, "Свозить болонку к ветеринару после обеда");
  evInfo(64+21060, "Забрать штаны", "Владимир", "Химчистка");
  evInfo(66+21060, "Футбол", "Сергей, Алексей", "Отдых");
  evInfo(75+21060, "Митинг", "Митя, Петя");
  evInfo(83+21060, "Забрать штаны", "Владимир", "Химчистка");
  evInfo(84+21060, "Футбол", "Сергей, Алексей", "Отдых");
  evInfo(90+21060, "Встреча", "Дмитрий, Анна", "Друзья");
  evInfo(98+21060, "Свозить болонку к ветеринару после обеда");
  evInfo(106+21060, "Рецепт болоньезе", "Шеф-повар");
  evInfo(216+21060, "Футбол", "Сергей, Алексей", "Отдых");
  evInfo(836+21060, "Свозить болонку к ветеринару после обеда");

console.log(eventsInfo[6]);
  //################################################################################
//функция для нахождения порядкового номера в массиве событий
function getNumberOfEvent(j){
  var eDay = new Date(curYear, curMonth, j + 1 - firstDayOfMonthIndex);
  var timeDiff = eDay.getTime() - eventsBegin.getTime();
  var evInd = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return evInd;
}
//функция для открытия вспомогательного окна
var lastIn;
$('.day').click(function(){
    $('.event-form').css('display','none');
    $(this).find('.number').find('.event-form').css('display','block');
    var j = $(this).index();//порядковый номер на странице
    console.log('hi ', j);
    var evInd = getNumberOfEvent(j);
    if (evInd !== lastIn){
      if (evInd>-1){
        $(this).find('.event-name').val(eventsInfo[evInd].name);
        $(this).find('.event-date').val(eventsInfo[evInd].evDate);
        $(this).find('.event-peoples').val(eventsInfo[evInd].peoples);
        $(this).find('.event-description').val(eventsInfo[evInd].description);
      }
      else{
        $(this).find('.event-name').val("");
        $(this).find('.event-date').val("");
        $(this).find('.event-peoples').val("");
        $(this).find('.event-description').val("");
      }
      lastIn = evInd;
    }
});
//если был в массиве заполненных дат, удаляем из него
function checkActive(num){
  for(var k = 0; k< activeEvents.length; k++){
    if (activeEvents[k] === num) {
      activeEvents = activeEvents.slice(0,k).concat(activeEvents.slice(k+1, activeEvents.length));
      console.log(activeEvents)
      break;
    }
  }
}
//функция для добавления события, кнопка готово
  $('.event-confirm').click(function(){
    $('.event-form').css('display','none');
    var j = $(this).parent().parent().parent().index();//порядковый номер на странице
    var evInd = getNumberOfEvent(j);

    if (evInd>-1){
      eventsInfo[evInd].name = $(this).parent().find('.event-name').val();
      evTasks[j].innerHTML = $(this).parent().find('.event-name').val();
      eventsInfo[evInd].peoples = $(this).parent().find('.event-peoples').val();
      eventsInfo[evInd].description = $(this).parent().find('.event-description').val();
      if (eventsInfo[evInd].name!==""){
         checkActive(evInd);
         activeEvents.push(evInd);
       }
    }
    event.stopPropagation();
  });

  //функция для удаления события, кнопка удалить
    $('.event-delete').click(function(){
      var j = $(this).parent().parent().parent().index();
      console.log(j);
      var evInd = getNumberOfEvent(j);
      if (evInd> -1){
        evTasks[j].innerHTML = "";
        eventsInfo[evInd].name = "";
        eventsInfo[evInd].peoples = "";
        eventsInfo[evInd].description = "";
        $(this).parent().find('.event-name').val("");
        $(this).parent().find('.event-peoples').val("");
        $(this).parent().find('.event-description').val("");
        checkActive(evInd);
      }
      event.stopPropagation();
    });

//закрытие формы крестиком
    $('.x-form').click(function(){
      $('.event-form').css('display','none');
      event.stopPropagation();
    })

//работа с поисковой строкой
var searchArea = document.getElementsByClassName('search-area')[0];
var resultsArea = document.getElementsByClassName('results-area')[0];
var resultsAreaContainer = document.getElementsByClassName('results-area-container')[0];
var resultContainers = document.getElementsByClassName('result-container');
var days = document.getElementsByClassName('day');

//очистка поисковых результатов, очистка цветовых элементов календаря
 function clearResults(){
   while (resultContainers.length > 0) resultsArea.removeChild(resultContainers[0]);

   resultsArea.style.display = "none";
   resultsAreaContainer.style.display = "none";
   for (var i = 0; i< 42; i++){
     days[i].style.backgroundColor = "#fff";
     days[i].style.border = "1px solid #ebebeb";
     days[i].style.fontWeight = "normal";
   }
  }

  //функция выводит результаты поисковой строки.
    function newRes(number){
      var resTitle = document.createElement('div');
      resTitle.className = "result-title";
      resTitle.innerHTML = eventsInfo[number].name;

      var resDate = document.createElement('div');
      resDate.className = "result-date";
      resDate.innerHTML = eventsInfo[number].evDate;

      var res = document.createElement('div');
      res.className = "result";
      res.appendChild(resTitle);
      res.appendChild(resDate);

      var resCon = document.createElement('div');
      resCon.className = "result-container";
      resCon.appendChild(res);
      resultsArea.appendChild(resCon);
    }

  $('.x-button').click(function(){
    searchArea.value = "";
    clearResults();
  })

  searchArea.oninput = function(){
    clearResults();
    var currentSearch = searchArea.value.toLowerCase();
    if (currentSearch !== "") {
      for (var i = 0; i < activeEvents.length; i++){
      var showEl = false;

      if (eventsInfo[activeEvents[i]].name!==""){
          for (var j in eventsInfo[activeEvents[i]]){
            if ( eventsInfo[activeEvents[i]][j].toLowerCase().indexOf(currentSearch)>-1) showEl = true;
          }
          if (showEl) {
            //выводим блоки в поиске
            resultsAreaContainer.style.display = "block";
            resultsArea.style.display = "block";

            newRes(activeEvents[i]);

            for (var k = 0; k < 42; k++){
              var kInd = getNumberOfEvent(k);
              if (activeEvents[i]===kInd) days[k].style.backgroundColor = "#c1e3ff";
            }

            //console.log(eventsInfo[i].name);
          }
        }
      }
      console.log(activeEvents);
    }
//выделяет другим цветом нужные события при нажатии на выпадающее меню поиска
///
    $('.result-container').click(function(){
      for (var j = 0; j< activeEvents.length; j++){
        if ($(this).find('.result').find('.result-date').text() === eventsInfo[activeEvents[j]].evDate){
          //если нашли, то нашли по номеру элемента в массиве eventsInfo
          for (var i = 0; i < 42; i++){
            var jInd = getNumberOfEvent(i);
            console.log(jInd);
            if (activeEvents[j]===jInd){
              days[i].style.backgroundColor = "#e5f1fa";
              days[i].style.border = "2px solid #88beeb";
              console.log($(this).find('.result').find('.result-date').text(), eventsInfo[j].evDate)
            }
          }
        }
      }
    });
  }

  fillMonth();
}
