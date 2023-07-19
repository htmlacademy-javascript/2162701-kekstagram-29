const bigFotoElement = document.querySelector('.big-picture'); //модальное окно

//функция для чистоты кода
const isEscapeKey = (evt) => evt.key === 'Escape';
const isModalTarget = (evt) => evt.target === bigFotoElement;

export { isEscapeKey, isModalTarget };
