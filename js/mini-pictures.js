const picturesContainerElement = document.querySelector('.pictures'); //ищем куда складывать фото
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture'); //ищем шаблон

/**
 * Функция по отрисовки миниатюр
 * @param {array} отрисованные миниатюры
 */
const createThumbnail = (drawThumbnails) => {
  const pictureListFragment = document.createDocumentFragment();
  drawThumbnails.forEach((thumbnail) => { //перебираем эл массива отрисованных миниатюр
    const pictureElement = pictureTemplateElement.cloneNode(true); //клонирование элемента со всеми вложенностями

    pictureElement.querySelector('.picture__img').src = thumbnail.url; //добавляем фото
    pictureElement.querySelector('.picture__img').alt = thumbnail.description;
    pictureElement.querySelector('.picture__likes').textContent = thumbnail.likes;
    pictureElement.querySelector('.picture__comments').textContent = thumbnail.comments;
    picturesContainerElement.appendChild(pictureElement); //вставляем на страницу
  });
  picturesContainerElement.appendChild(pictureListFragment);
};

export {createThumbnail};
