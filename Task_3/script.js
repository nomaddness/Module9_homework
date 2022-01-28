const btnResult = document.querySelector('.btn'); //получаем кнопку
const resultNode = document.querySelector('.content'); //получаем контейнер для контента

// Запрос
function useRequest(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (cb) {
        cb(result);
      }
    }
  };
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
};

// Добавляем контент из запроса в html
function displayResult(apiData) {
  let cards = '';
    
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
   resultNode.innerHTML = cards;
};

// Проверки в инпуте и добавление данных из запроса, согласно условию от 1 до 10
btnResult.addEventListener('click',() => {
  const value = Number(document.querySelector('input').value);
  if (isNaN(value)) {
    alert("Введено не число!");
    return;
  };
  if (value < 1 || value > 10) {
    alert("Число вне диапазона от 1 до 10 !");
    return;
  };

  const url = `https://picsum.photos/v2/list?limit=${value}`;
  useRequest(url, displayResult); 
});