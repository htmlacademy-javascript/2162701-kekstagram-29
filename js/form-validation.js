const MAX_HASHTAGS = 5;
const MAX_LENGTH_TEXT = 140;

const uploadForm = document.querySelector('.img-upload__form'); //форма загрузки
const hashtagsText = uploadForm.querySelector('.text__hashtags'); //input для заполнения хештегов
const commentText = uploadForm.querySelector('.text__description'); //input для коментария

const isInputFocus = () => {
  if (document.activeElement !== hashtagsText && document.activeElement !== commentText) {
    return true;
  }
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}/*, false*/);

/**
 * Функция по определению длины текста
 * @param {string} text - исходная строка
 * @returns {boolean} — false, если является, либо true
 */
const validateText = (text) => text.length > MAX_LENGTH_TEXT;

/**
 * функция по определению хештега
 * @param {string} tags значение инпута
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
  const tagArray = normalHashtag(value).map((tag) => tag.toLowerCase());
  return tagArray.length === new Set(tagArray).size; //сравниваем длину массива с длинной коллекции
};

pristine.addValidator(commentText, validateText, `Комментарий не может быть длинее ${MAX_LENGTH_TEXT} символов`, 4, true);
pristine.addValidator(hashtagsText, validateNumberOfHashtags, `нельзя указать больше ${MAX_HASHTAGS} хэш-тэгов`, 1, true);
pristine.addValidator(hashtagsText, validateInvalidHashtag, 'не верно введен хеш-тег', 2, true);
pristine.addValidator(hashtagsText, validateRepeatedHashtags, 'хэш-тэги не должны повторяться', 3, true);


//отправка формы и проверка на валидацию
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// Блокировка отправки невалидной формы
/*uploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});*/

export { pristine, isInputFocus };

