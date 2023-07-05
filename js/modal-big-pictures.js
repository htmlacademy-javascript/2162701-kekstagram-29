import {isEscapeKey} from './util.js';
import {isModalTarget} from './util.js';
import {createCommentForm} from './comments.js';

const bigFotoElement = document.querySelector('.big-picture'); //модальное окно
const bigFotoCloseElement = document.querySelector('.big-picture__cancel'); //кнопка закрыть

//функция для закрытия модального окна с помощью клавиатуры
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserBigFoto();
  }
};

//функция для закрытия модального окна при клике по документу
const onDocumentTargetClick = (evt) => {
  if (isModalTarget(evt)) {
    evt.preventDefault();
    closeUserBigFoto();
  }
};

/**
 * функция по открытию модального окна
 * @param {object} деструктуризация параметров обьекта данных
 */
const openUserBigFoto = ({url, likes, description, comments}) => {
  bigFotoElement.classList.remove('hidden'); // 1. Показать окно
  document.body.style.overflow = 'hidden';//2. отключаем скрол под подложкой или document.body.classList.add('overflow-hidden');
  document.addEventListener('keydown', onDocumentKeydown); // 3. Добавить обработчики для закрытия на клавишу
  document.addEventListener('click', onDocumentTargetClick); // 4. Добавить обработчики для закрытия на клик вне модального окна

  bigFotoElement.querySelector('.big-picture__img img').src = url; //Адрес изображения
  bigFotoElement.querySelector('.likes-count').textContent = likes; //количество лайков
  bigFotoElement.querySelector('.social__caption').textContent = description; //описание фото
  bigFotoElement.querySelector('.comments-count').textContent = comments.length; //Количество комментариев
  createCommentForm(comments);
};

/**
 * функция по закрытию модального окна
 */
function closeUserBigFoto () {
  bigFotoElement.classList.add('hidden'); // 1. Скрыть окно
  document.body.style.overflow = '';// 2. включить скрол или document.body.classList.remove('overflow-hidden');
  document.removeEventListener('keydown', onDocumentKeydown); //3. удалить обработчик событий при нажатии на клавишу
  document.removeEventListener('click', onDocumentTargetClick); //4. удалить обработчик событий при клике вне модального окна
}

bigFotoCloseElement.addEventListener('click', () => {
  closeUserBigFoto();
});

export {openUserBigFoto};
