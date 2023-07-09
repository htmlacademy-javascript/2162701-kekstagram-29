//Функции для моков
/**
 * Функция для создания случайного числа в диапозоне от min до max
 * @param {number} min - нижняя граница диапозона
 * @param {number} max - верхняя граница диапозона
 * @return {number} - возвращает случайное число в диапозоне от min до max
 */
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

/**
 * Функция для генерации случайного элемента массива
 * @param {array} elements - массив данных для генерации
 * @return {string} - возвращает элемент массива elements
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

/**
 * Функция для генерации порядкого номера
 * @return {number} - возвращает порядковый номер
 */
const getIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};
const bigFotoElement = document.querySelector('.big-picture'); //модальное окно
//функция для чистоты кода
const isEscapeKey = (evt) => evt.key === 'Escape';
const isModalTarget = (evt) => evt.target === bigFotoElement;

//функции для моков
export {getRandomInteger};
export {getRandomArrayElement};
export {getIdGenerator};
//функция для чистоты кода
export {isEscapeKey};
export {isModalTarget};
