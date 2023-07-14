const MAX_HASHTAGS = 5;
const VALID_HASHTAG = /^#[a-zа-яë0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form'); //форма загрузки
const hashtagsText = uploadForm.querySelector('.text__hashtags'); //input для заполнения хештегов
const commentText = uploadForm.querySelector('.text__description'); //input для коментария

const isInputFocus = () => {
  if (document.activeElement === hashtagsText || document.activeElement === commentText) {
    return true;
  }
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const ERROR_TEXT = {
  invalidCount: `нельзя указать больше ${MAX_HASHTAGS} хэш-тэгов`,
  invalidHashtag: 'не верно введен хеш-тег',
  notUnique: 'хэш-тэги не должны повторяться',
};

/**
 * функция по определению хештега
 * @param {string} tags значение инпута
 * обрезаем пробелы, # отсоединяем по пробелу, массив с эл прошедшими проверку
 */
const normalHashtag = (tags) => tags
  .trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

/**
 * Функция проверки введия невалидного хэш-тега
 * @param {*} value текущее значение поля
 * перебираем массив на заданные условия, возвращаем true или false
 */
const validateInvalidHashtag = (value) => normalHashtag(value).every((item) => VALID_HASHTAG.test(item));

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
  return tagArray.length === new Set(tagArray).size;
};

pristine.addValidator(hashtagsText, validateNumberOfHashtags, ERROR_TEXT.invalidCount, 3, true);
pristine.addValidator(hashtagsText, validateInvalidHashtag, ERROR_TEXT.invalidHashtag, 2, true);
pristine.addValidator(hashtagsText, validateRepeatedHashtags,ERROR_TEXT.notUnique, 1, true);

/**
 * отправка формы и проверка на валидацию
 * @param {object} evt evt объект события
 */
const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

export { pristine, isInputFocus, onFormSubmit };
