const picturesContainerElement = document.querySelector('.pictures'); //ищем куда складывать фото
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture'); //ищем шаблон

/**
 * Функция по отрисовки миниатюр
 * @param {Object} drawThumbnails - массив объектов
 */
const createThumbnail = (drawThumbnails) => {
  const pictureListFragment = document.createDocumentFragment();
  drawThumbnails.forEach((thumbnail) => { //перебираем эл массива отрисованных миниатюр
    const pictureElement = pictureTemplateElement.cloneNode(true); //клонирование элемента со всеми вложенностями

    const [url, description, likes, comments] = [thumbnail.url, thumbnail.description, thumbnail.likes, thumbnail.comments];
    pictureElement.querySelector('.picture__img').src = url; //добавляем фото
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments;
    picturesContainerElement.appendChild(pictureElement); //вставляем на страницу
  });
  picturesContainerElement.appendChild(pictureListFragment);
};

export {createThumbnail};
