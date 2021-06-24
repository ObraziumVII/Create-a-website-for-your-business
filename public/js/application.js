const inputElement = document.querySelector('#phone'); // ищем наш единственный input
inputElement.addEventListener('DOMContentLoaded', () => {
  const maskOptions = { // создаем объект параметров
    mask: '+{7}(000)000-00-00', // задаем единственный параметр mask
  };
  IMask(inputElement, maskOptions); // запускаем плагин с переданными параметрами
});
