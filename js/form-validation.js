import { isEscapeKey, isModalTarget } from './util.js';

const MAX_HASHTAGS = 5;

const uploadForm = document.querySelector('.img-upload__form'); //форма загрузки
const hashtagsText = uploadForm.querySelector('.text__hashtags'); //input для заполнения хештегов
//const commentText = uploadForm.querySelector('.text__description'); //input для коментария
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay'); //подложка
//const uploadInput = uploadForm.querySelector('.img-upload__input'); //контрол загрузки файла
const uploadCancel = uploadForm.querySelector('.img-upload__cancel'); //кнопка закрыть

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

/**
 * функция для закрытия подложки с помощью клавиатуры
 * @param {object} evt объект события
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserOverlay();
  }
};

/**
 * функция для закрытия подложки при клике по документу
 * @param {object} evt объект события
 */
const onDocumentTargetClick = (evt) => {
  if (isModalTarget(evt)) {
    evt.preventDefault();
    closeUserOverlay();
  }
};

/**
 * функция для открытия подложки
 */
const openUserOverlay = () => {
  uploadOverlay.classList.remove('hidden'); // 1. Показать подложку
  document.body.classList.add('modal-open');//2. отключаем скрол под подложкой
  document.addEventListener('keydown', onDocumentKeydown); // 3. Добавить обработчики для закрытия на клавишу
  document.addEventListener('click', onDocumentTargetClick); // 4. Добавить обработчики для закрытия на клик вне модального окна
};

/**
 * функция для закрытия подложки
 */
function closeUserOverlay () {
  uploadForm.reset(); // восстанавливает стандартные значения
  //resetScale();
  //resetEffect();
  pristine.reset(); //сброс ошибок pristine
  uploadOverlay.classList.add('hidden'); // 1. Скрыть подложку
  document.body.classList.remove('modal-open');// 2. включить скрол
  document.removeEventListener('keydown', onDocumentKeydown); //3. удалить обработчик событий при нажатии на клавишу
  document.removeEventListener('click', onDocumentTargetClick); //4. удалить обработчик событий при клике вне модального окна
}

uploadCancel.addEventListener('click', () => {
  closeUserOverlay();
});

/**
 * функция отмены обработчика события для isEscape
 * @param {object} evt объект события
 */
const onKeydownFormField = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};
//когда будем использовать
document.removeEventListener('keydown', onKeydownFormField);//удаляем
document.addEventListener('keydown', onKeydownFormField);//добавляем

/**
 * функция отмены обработчика события для клика по документу
 * @param {object} evt объект события
 */
const onTargetClickFormField = (evt) => {
  if (isModalTarget(evt)) {
    evt.stopPropagation();
  }
};
//когда будем использовать
document.removeEventListener('click', onTargetClickFormField);//удаляем
document.addEventListener('click', onTargetClickFormField);//добавляем

/**
 * функция по определению хештега
 * @param {} tags значение инпута
 * обрезаем пробелы, # отсоединяем по пробелу, массив с эл прошедшими проверку
 */
const normalHashtag = (tags) => tags.trim().split(' ').filter(Boolean);

/**
 * Функция проверки введия невалидного хэш-тега
 * @param {*} value текущее значение поля
 * перебираем массив на заданные условия, возвращаем true или false
 */
const validateInvalidHashtag = (value) => normalHashtag(value).every((tag) => /^#[a-zа-яё0-9]{1-19}$/i.test(tag));

/**
 * Функция проверки превышено количество хэш-тегов
 * @param {*} value текущее значение поля
 */
const validateNumberOfHashtags = (value) => normalHashtag(value).length <= MAX_HASHTAGS;

/**
 * Функция проверки хэш-теги повторяются
 * @param {*} value текущее значение поля
 */
const validateRepeatedHashtags = (value) => {
  const tagArray = normalHashtag(value).toLowerCase();
  return tagArray.length === new Set(tagArray).size; //сравниваем длину массива с длинной коллекции
};

//отправка формы и проверка на валидацию
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

/**
 * Функция для валидации формы
 */
const validateForm = () => {
  pristine.addValidator(hashtagsText, validateNumberOfHashtags, `нельзя указать больше ${MAX_HASHTAGS} хэш-тэгов`, 1);
  pristine.addValidator(hashtagsText, validateInvalidHashtag, 'не верно введен хеш-тег', 2);
  pristine.addValidator(hashtagsText, validateRepeatedHashtags, 'хэш-тэги не должны повторяться', 3);
};
