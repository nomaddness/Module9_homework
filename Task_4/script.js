const btnResult = document.querySelector('.btn'); //получаем кнопку
const resultNode = document.querySelector('.content'); //получаем контейнер для контента

// Проверки в инпуте и добавление данных из запроса
btnResult.addEventListener('click',() => {
  const value1 = Number(document.querySelector('.input1').value);
  const value2 = Number(document.querySelector('.input2').value);

  if ((isNaN(value1)) || (isNaN(value2))) {
    alert("Введено не число");
    return;
  };
  if (value1 < 100 || value1 > 300) {
    alert("Одно из чисел вне диапазона от 100 до 300");
    return;
  };
  if (value2 < 100 || value2 > 300) {
    alert("Одно из чисел вне диапазона от 100 до 300");
    return;
  };

  const url = `https://picsum.photos/${value1}/${value2}`;
  fetch(url)
    .then((response) => {
      const image = `<img src="${url}" width ="${value1}"  height ="${value2}" class="card-image"/>`;
      resultNode.innerHTML = image;
    })
    .catch(() => { console.log('error') });

});