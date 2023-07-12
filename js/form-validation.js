import { isEscapeKey, isModalTarget } from './util.js';

const uploadForm = document.querySelector('.img-upload__form'); //форма загрузки
const textHashtags = uploadForm.querySelector('.text__hashtags'); //input для заполнения хештегов
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay'); //подложка
const uploadInput = uploadForm.querySelector('.img-upload__input'); //контрол загрузки файла
const uploadCancel = uploadForm.querySelector('.img-upload__cancel'); //кнопка закрыть

/**
 * функция для закрытия подложки с помощью клавиатуры
 * @param {object} evt объект собития
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserOverlay();
  }
};

/**
 * функция для закрытия подложки при клике по документу
 * @param {object} evt объект собития
 */
const onDocumentTargetClick = (evt) => {
  if (isModalTarget(evt)) {
    evt.preventDefault();
    closeUserOverlay();
  }
};

const openUserOverlay = () => {
  uploadOverlay.classList.remove('hidden'); // 1. Показать подложку
  document.body.classList.add('modal-open');//2. отключаем скрол под подложкой
  document.addEventListener('keydown', onDocumentKeydown); // 3. Добавить обработчики для закрытия на клавишу
  document.addEventListener('click', onDocumentTargetClick); // 4. Добавить обработчики для закрытия на клик вне модального окна
};

function closeUserOverlay () {
  uploadOverlay.classList.add('hidden'); // 1. Скрыть подложку
  document.body.classList.remove('modal-open');// 2. включить скрол
  document.removeEventListener('keydown', onDocumentKeydown); //3. удалить обработчик событий при нажатии на клавишу
  document.removeEventListener('click', onDocumentTargetClick); //4. удалить обработчик событий при клике вне модального окна
}

uploadCancel.addEventListener('click', () => {
  closeUserOverlay();
});


//условия
//Хэш-теги:

//хэш-тег начинается с символа # (решётка);
//строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
//хеш-тег не может состоять только из одной решётки;
//максимальная длина одного хэш-тега 20 символов, включая решётку;
//хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
//хэш-теги разделяются пробелами;
//один и тот же хэш-тег не может быть использован дважды;
//нельзя указать больше пяти хэш-тегов;
//хэш-теги необязательны;
//если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

//Комментарий:

//комментарий не обязателен;
//длина комментария не может составлять больше 140 символов;
//если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

const pristine = new Pristine(uploadForm, {

}, false);

/**
 * Функция проверки формы хештегов
 * @param {*} value
 * @returns Функция проверки обязательно должна возвращать true или false, в зависимости от того, валидно ли поле.
 */
function validateHashtags () {
  return 
}

//метод .addValidator() принимает несколько аргументов
//первы эл формы, кот хотим валидировать
//второй аргумент функция проверки
//Третьим аргументом нужно передать сообщение об ошибке.
pristine.addValidator(
  textHashtags,
  validateHashtags,
  'ошибка');

//отправка формы и проверка на валидацию
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
