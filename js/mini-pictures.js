//import {openUserBigFoto} from './modal_big_pictures';

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


const pictureContainerElement = document.querySelector('.pictures'); //ищем куда складывать фото
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture'); //ищем шаблон
const pictureListFragment = document.createDocumentFragment();

/**
 * Функция по отрисовки миниатюр
 * @param {Object} drawThumbnails - массив объектов
 */
const createThumbnail = (drawThumbnails) => {
  drawThumbnails.forEach(({url, description, likes, comments}) => { //перебираем эл массива отрисованных миниатюр
    const pictureElement = pictureTemplateElement.cloneNode(true); //клонирование элемента со всеми вложенностями

    //const {url, description, likes, comments} = thumbnail; //деструктуризация объекта
    pictureElement.querySelector('.picture__img').src = url; //добавляем фото
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureContainerElement.append(pictureElement); //вставляем на страницу

    pictureElement.addEventListener('click', () => { //создаем замыкание
      openUserBigFoto({url, description, likes, comments});
    });

  });
  pictureContainerElement.append(pictureListFragment);
};

export {createThumbnail};
