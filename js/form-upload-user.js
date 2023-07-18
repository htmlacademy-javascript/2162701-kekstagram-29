import { isEscapeKey } from './util.js';
import { pristine, isInputFocus } from './form-validation.js';
import { initSlider, hideSlider, resetEffect } from './slider.js';
import { resetScale, initScale } from './scale.js';

const SubmitBtnText = { //текст на кнопке отправить
  UNBLOCK: 'Сохранить',
  BLOCK: 'Сохраняю...'
};
const uploadForm = document.querySelector('.img-upload__form'); //форма загрузки
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay'); //подложка
const uploadInput = uploadForm.querySelector('.img-upload__input'); //контрол загрузки файла
const uploadCancel = uploadForm.querySelector('.img-upload__cancel'); //кнопка закрыть
const submitBtn = uploadForm.querySelector('.img-upload__submit'); //кнопка отправить

/**
 * функция для закрытия подложки с помощью клавиатуры, за исключением, когда поле ввода в фокусе
 * @param {object} evt объект события
 */
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !(isInputFocus())) {
    evt.preventDefault();
    closeUserOverlay();
  }
}

/**
 * функция для открытия подложки
 */
const openUserOverlay = () => {
  initSlider(); //бегунок слайдера
  initScale(); // маштаб
  uploadOverlay.classList.remove('hidden'); // 1. Показать подложку
  document.body.classList.add('modal-open');//2. отключаем скрол под подложкой
  document.addEventListener('keydown', onDocumentKeydown); // 3. Добавить обработчики для закрытия на клавишу
  hideSlider(); //скрывается слайдер при первоночальном показе
};

/**
 * функция для закрытия подложки
 */
function closeUserOverlay () {
  uploadForm.reset(); // восстанавливает стандартные значения
  resetScale(); //сброс эффектов маштаба
  resetEffect(); //сброс эффектов слайдера
  pristine.reset(); //сброс ошибок pristine
  uploadOverlay.classList.add('hidden'); // 1. Скрыть подложку
  document.body.classList.remove('modal-open');// 2. включить скрол
  document.removeEventListener('keydown', onDocumentKeydown); //3. удалить обработчик событий при нажатии на клавишу
}

//при клике на кнопку закрыть
uploadCancel.addEventListener('click', () => {
  closeUserOverlay();
});

//открытие модалки при событии change
uploadInput.addEventListener('change', () => {
  openUserOverlay();
});

//блокировка отпраки невалидной формы
uploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

/**
 * функция по бокировке кнопки отправить
 */
const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitBtnText.BLOCK;
};

/**
 * функция по разблокировки кнопки отправить
 */
const unblockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitBtnText.UNBLOCK;
};

/**
 *
 * @param {object} cb данные из формы
 */
const setOnFormSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitBtn();
      await cb(new FormData(uploadForm));
      unblockSubmitBtn();
    }
  });
};


/**
 * инициализация формы загрузки
 */
/*const initUploadForm = () => {
  //uploadForm.addEventListener('submit', validationCheck); //проверка на валидацию
  initSlider(); //бегунок слайдера
  initScale(); // маштаб
  setValidaator(); //проверка на валидацию
};*/

export { setOnFormSubmit, closeUserOverlay };
