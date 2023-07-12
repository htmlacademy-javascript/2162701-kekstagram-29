
const MAX_HASHTAGS = 5;

const uploadForm = document.querySelector('.img-upload__form'); //форма загрузки
const hashtagsText = uploadForm.querySelector('.text__hashtags'); //input для заполнения хештегов
const commentText = uploadForm.querySelector('.text__description'); //input для коментария

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

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

const isInputFocus = () =>
  document.activeElement === hashtagsText || document.activeElement === commentText;

export { validateForm, pristine, isInputFocus };
