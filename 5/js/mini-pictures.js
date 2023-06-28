import {getPhotoPostedByUser} from './data.js';

const picturesContainer = document.querySelector('.pictures'); //ищем куда складывать фото
const picture = document.querySelector('#picture').content.querySelector('.picture'); //ищем шаблон

const drawThumbnails = getPhotoPostedByUser(); //отрисовываем миниатюры
const pictureListFragment = document.createDocumentFragment();

/**
 * Функция по отрисовки миниатюр
 */
const createThumbnail = () => {
  drawThumbnails.forEach((key) => { //перебираем эл массива отрисованных миниатюр
    const pictureElement = picture.cloneNode(true); //клонирование элемента со всеми вложенностями
    const img = pictureElement.querySelector('.picture__img'); //добавляем фото
    img.src = key.url;
    img.alt = key.description;
    pictureElement.querySelector('.picture__likes').textContent = key.likes;
    pictureElement.querySelector('.picture__comments').textContent = key.comments;
    picturesContainer.appendChild(pictureElement); //вставляем на страницу
    picturesContainer.appendChild(pictureListFragment);
  });
};

export {createThumbnail};
