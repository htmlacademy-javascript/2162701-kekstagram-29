import { isEscapeKey, isOverlayTarget } from './util.js';
import { pristine, isInputFocus } from './form-validation.js';

const uploadForm = document.querySelector('.img-upload__form'); //форма загрузки
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay'); //подложка
const uploadInput = uploadForm.querySelector('.img-upload__input'); //контрол загрузки файла
const uploadCancel = uploadForm.querySelector('.img-upload__cancel'); //кнопка закрыть

/**
 * функция для закрытия подложки с помощью клавиатуры, за исключением, когда поле ввода в фокусе
 * @param {object} evt объект события
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputFocus) {
    evt.preventDefault();
    closeUserOverlay();
  }
};

/**
 * функция для закрытия подложки при клике по документу
 * @param {object} evt объект события
 */
const onDocumentTargetClick = (evt) => {
  if (isOverlayTarget(evt) && !isInputFocus) {
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

const initUploadForm = () => {
  uploadInput.addEventListener('change', openUserOverlay);
};

export { initUploadForm };
