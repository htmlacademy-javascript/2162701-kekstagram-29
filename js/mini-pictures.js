//import {getPhotoPostedByUser} from './data.js';
import {drawThumbnails} from './main.js';

const picturesContainer = document.querySelector('.pictures'); //ищем куда складывать фото
const picture = document.querySelector('#picture').content.querySelector('.picture'); //ищем шаблон

//const drawThumbnails = getPhotoPostedByUser(); //отрисовываем миниатюры
const pictureListFragment = document.createDocumentFragment();

/**
 * Функция по отрисовки миниатюр
 * @param {array} отрисованные миниатюры
 */
const createThumbnail = () => {
  drawThumbnails.forEach((thumbnail) => { //перебираем эл массива отрисованных миниатюр
    const pictureElement = picture.cloneNode(true); //клонирование элемента со всеми вложенностями
    const img = pictureElement.querySelector('.picture__img'); //добавляем фото
    img.src = thumbnail.url;
    img.alt = thumbnail.description;
    pictureElement.querySelector('.picture__likes').textContent = thumbnail.likes;
    pictureElement.querySelector('.picture__comments').textContent = thumbnail.comments;
    picturesContainer.appendChild(pictureElement); //вставляем на страницу
    picturesContainer.appendChild(pictureListFragment);
  });
};

export {createThumbnail};
