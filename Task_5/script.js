const btnResult = document.querySelector('.btn'); //получаем кнопку
const resultNode = document.querySelector('.content'); //получаем контейнер для контента

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      console.log('resultJSON', xhr.response); // Принятый JSON-объект
      const result = JSON.parse(xhr.response); // JS-объект 
      console.log("resultJS", result);
      localStorage.setItem('resultJSON', JSON.stringify(result)); // Сохранение принятого JSON-объекта в localStorage
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function () {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
};

// Функция обработки полученного результата
// apiData - объект с результатом запроса

function displayResult(apiData) {
  let content = '';

  apiData.forEach(item => {
    // Формируется контент  
    const contentBlock = ` 
      <div class="content__item">
        <div class="content__item-title"> <h2>${item.author}</h2> </div>
        <img class="content__item-img" src="${item.download_url}"/>
      </div>`;
      content = content + contentBlock; 
  });
  resultNode.innerHTML = content; 
}
// Проверки в инпуте и добавление данных из запроса
btnResult.addEventListener('click',() => {
  const page = Number(document.querySelector('.input1').value);
  const limit = Number(document.querySelector('.input2').value);
  let errPage, errLimit; //переменные для определения типа ошибок
  
  if (isNaN(page)) errPage = 1;
  else if (page < 1 || page > 10) errPage = 1;
  else if ((page ^ 0) !== page) errPage = 2;

  if (isNaN(limit)) errLimit = 1;
  else if (limit < 1 || limit > 10) errLimit = 1;
  else if ((limit ^ 0) !== limit) errLimit = 2;

  if (errPage === 1 && errLimit === 1) {
    alert("Номер страницы и лимит вне диапазона от 1 до 10!");
    return;
  }

  if (errPage === 1) {
    alert("Номер страницы вне диапазона от 1 до 10!");
    return;
  }

  if (errPage === 2) {
    alert("Число в поле <Номер страницы> не является целым !");
    return;
  }

  if (errLimit === 1) {
    alert("Лимит вне диапазона от 1 до 10!");
    return;
  }

  if (errLimit === 2) {
    alert("Число в поле <Лимит> не является целым !");
    return;
  }
  
  let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

  let urlRequest = localStorage.getItem('urlRequest'); // Читаем из localStorage ранее сохранённый адрес запроса
  if (urlRequest === url) { // Если адрес из localStorage совпадает с текущим, то запрос XMLHttpRequest не делаем. 
    console.log('urlStorage', urlRequest);
    let resultJSON = localStorage.getItem('resultJSON'); // Читаем из localStorage JSON-строку
    console.log('result_JSON_Storage', resultJSON);
    let result = JSON.parse(resultJSON);                 // Преобразуем JSON-строку в JS-объект
    console.log('result_JS_Storage', result);
    displayResult(result);                               // Передаём JS-объект в ф-ю для прорисовки
  }
  else { // Если запрос происходит по новому адресу, не совпадающему с тем, к-й был сохранён в localStorage
    console.log('urlNew', url);
    localStorage.setItem('urlRequest', url);
    // Вызываем ф-ю, выполняющую XMLHttpRequest - запрос
    useRequest(url, displayResult);
  }
});