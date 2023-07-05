import {openUserBigFoto} from './modal-big-pictures.js';

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
