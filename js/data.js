import {getRandomInteger} from './util.js';
import {getRandomArrayElement} from './util.js';
import {getIdGenerator} from './util.js';

//Имена авторов
const USER_NAME = ['Анастасия', 'Анна', 'Мария', 'Елена', 'Дарья', 'Алина', 'Ирина', 'Екатерина', 'Арина', 'Полина',
  'Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил'];

//Текст комментария
const MASSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

//Описание фотографии
const DESCRIPTION_FOTO = ['пляж', 'go to the beach', 'океан', 'девушка на пляже', 'веселый обед', 'black car', 'detox',
  'смузи', 'дикие люди', 'обувница', 'дорога на пляж', 'whate car', 'ужин', 'суши-кот', 'тапки', 'горы', 'хор', 'ретро авто',
  'фонарики', 'урбанизация', 'было очень вкусно', 'закат', 'крабик', 'фестиваль', 'нашествие инопланетян' ];

//количество загруженных фото
const NUMBER_OF_UPLOADED_PHOTOS = 25;

//min и max количество аватарок
const AvatarRange = {
  MIN: 1,
  MAX: 6
};

//min и max количество лайков
const LikesRange = {
  MIN: 15,
  MAX: 200
};

//число случайных коментариев из диапазона
const CommentRange = {
  MIN: 10,
  MAX: 30
};

const generatePhotoId = getIdGenerator(); // id фото по порядку
const generatePhotoUrl = getIdGenerator(); // Url фото по порядку
const generateIdComment = getIdGenerator(); // comments под фото по порядку

/**
 * Функция по созданию массива объектов — список комментариев
 * @param {number} id - идентификатор комментария
 * @param {string} avatar - ссылка на автар, который формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg
 * @param {string} message - комментарий
 * @param {string} name - имя пользователя данного комментария
 * @return {array} - массив объектов
 */
const getComments = () => {
  const arrComments = [];
  for (let i = 0; i < getRandomInteger(CommentRange.MIN, CommentRange.MAX); i++) { //диапазон коментариев, к одной фото
    arrComments.push({
      id: generateIdComment(),
      avatar: `img/avatar-${getRandomInteger(AvatarRange.MIN, AvatarRange.MAX)}.svg`,
      message: getRandomArrayElement(MASSAGES),
      name: getRandomArrayElement(USER_NAME)
    });
  }
  return arrComments;
};

/**
 * Функция по созданию массива из сгенерированных объектов
 * @param {number} id - идентификатор фото
 * @param {string} url - ссылка на фото, которая формируется по правилу photos/{{id от 1 до 25}}.jpg
 * @param {string} description - случайное описание под фото
 * @param {number} likes - случайное количество лайков
 * @param {array} comments - массив комментариев
 */
const postedPhotoByUser = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION_FOTO),
  likes: getRandomInteger(LikesRange.MIN, LikesRange.MAX),
  comments: getComments()
});

/**
* Функция для создания массива объектов с описанием фото
*/
const getPhotosPostedByUser = () => Array.from({length: NUMBER_OF_UPLOADED_PHOTOS}, postedPhotoByUser);

// eslint-disable-next-line no-console
//getPhotoPostedByUser();

export {getPhotosPostedByUser};
