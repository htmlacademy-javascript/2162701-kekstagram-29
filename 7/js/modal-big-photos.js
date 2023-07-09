import { isEscapeKey, isModalTarget } from './util.js';

const bigFotoElement = document.querySelector('.big-picture'); //модальное окно
const commentsList = bigFotoElement.querySelector('.social__comments'); //список коментов
const commentItem = commentsList.querySelector('.social__comment'); //один комент
const commentsCount = bigFotoElement.querySelector('.social__comment-count'); //5 коментариев
const commentsTotalCount = bigFotoElement.querySelector('.comments-count'); //из всего ком
const btnDownloadMore = bigFotoElement.querySelector('.comments-loader'); //кнопка загрузить еще
const bigFotoCloseElement = bigFotoElement.querySelector('.big-picture__cancel'); //кнопка закрыть
let numberComments;

/**
 * функция для закрытия модального окна с помощью клавиатуры
 * @param {object} evt объект собития
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserBigFoto();
  }
};

/**
 * функция для закрытия модального окна при клике по документу
 * @param {*} evt объект собития
 */
const onDocumentTargetClick = (evt) => {
  if (isModalTarget(evt)) {
    evt.preventDefault();
    closeUserBigFoto();
  }
};

/**
 * функция по открытию модального окна
 */
const openUserBigPhoto = () => {
  bigFotoElement.classList.remove('hidden'); // 1. Показать окно
  document.body.classList.add('modal-open');//2. отключаем скрол под подложкой
  document.addEventListener('keydown', onDocumentKeydown); // 3. Добавить обработчики для закрытия на клавишу
  document.addEventListener('click', onDocumentTargetClick); // 4. Добавить обработчики для закрытия на клик вне модального окна
};

/**
 * функция по закрытию модального окна
 */
function closeUserBigFoto () {
  bigFotoElement.classList.add('hidden'); // 1. Скрыть окно
  document.body.classList.remove('modal-open');// 2. включить скрол
  document.removeEventListener('keydown', onDocumentKeydown); //3. удалить обработчик событий при нажатии на клавишу
  document.removeEventListener('click', onDocumentTargetClick); //4. удалить обработчик событий при клике вне модального окна
}

bigFotoCloseElement.addEventListener('click', () => {
  closeUserBigFoto();
});

/**
 * Функция по отрисовки одного комментария
 * @param {object} деструктуризация параметров обьекта данных
 * @returns возращаем шаблон одного коментария
 */
const renderComment = ({avatar, name, message}) => {
  const comment = commentItem.cloneNode(true);
  const picture = comment.querySelector('.social__picture');
  picture.src = avatar;
  picture.alt = name;
  comment.querySelector('.social__text').textContent = message;
  comment.classList.add('hidden'); //скрываем каждый комментарий
  return comment;
};

/**
 * функция по установлению общего количества комментариев
 * @param {Array} массив коментариев
 */
const setCommentsCount = (data) => {
  commentsTotalCount.textContent = data.length;
};

// обработчик события "Загрузить ещё"
function onShowMoreButtonClick (event) {
  event.preventDefault();
  numberComments += 5;
}

/**
 * функция по удалянию класса hidden
 * @param {Array} comments массив с комментариями
 */
function removeClassHidden (comments) {
  let commentsAmount = 0; //начальное количество коментариев

  for (let i = 0; i < comments.length; i++) {
    if (i < numberComments) {
      comments[i].classList.remove('hidden');
      commentsAmount++;
    }
  }
  commentsCount.innerHTML = `${commentsAmount} из <span class="comments-count">${comments.length}</span> комментариев`;

  if (commentsAmount === comments.length) { //скрываем кнопку показать еще
    btnDownloadMore.classList.add('hidden');

    btnDownloadMore.removeEventListener('click', (event) => {
      onShowMoreButtonClick(event);
      removeClassHidden(comments);
    });
  }
}

/**
 * функция показывает заданное количество комментариев
 */
function showCommentsList () {
  numberComments = 5;
  btnDownloadMore.classList.remove('hidden');
  const comments = commentsList.children;

  removeClassHidden(comments); // показываем первые 5 коментариев

  btnDownloadMore.addEventListener('click', (event) => {
    onShowMoreButtonClick(event);
    removeClassHidden(comments);
  });
}

/**
 * Функция по отрисовке коментариев
 * @param {Array} массив коментариев
 */
const renderComments = (data) => {
  data.forEach((item) => commentsList.append(renderComment(item)));
  showCommentsList();
};

/**
 * функция по наполнению большой картинки данными
 * @param {object} деструктуризация параметров обьекта данных
 */
const fillBigPhoto = ({url, likes, description, comments}) => {
  bigFotoElement.querySelector('.big-picture__img img').src = url; //Адрес изображения
  bigFotoElement.querySelector('.big-picture__img img').alt = description; //описание фото
  bigFotoElement.querySelector('.likes-count').textContent = likes; //количество лайков
  bigFotoElement.querySelector('.social__caption').textContent = description; //описание фото
  renderComments(comments); //отрисованные коменты
  setCommentsCount(comments); //общее количество коментов
};

/**
 * функция по созданию фото с коментариями
 * @param {Array} data массив данных
 */
const renderBigPhoto = (data) => {
  commentsList.innerHTML = ''; //список коментариев
  openUserBigPhoto(); //открытие модалки
  fillBigPhoto(data); //наполненеие данными
};


export {renderBigPhoto};
