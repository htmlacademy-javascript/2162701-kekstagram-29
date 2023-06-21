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
const AVATAR_RANGE = {
  min: 1,
  max: 6
};

//min и max количество лайков
const LIKES_RANGE = {
  min: 15,
  max: 200
};

//число случайных коментариев из диапазона
const COMMENT_RANGE = {
  min: 0,
  max: 30
};

//Генерация случайных чисел
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//Генерация случайного элемента массива
const getRandomArrayElement = (elements,) => elements[getRandomInteger(0, elements.length - 1)];

//Генерация порядкого номера
const getIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generatePhotoId = getIdGenerator(); // id фото по порядку
const generatePhotoUrl = getIdGenerator(); // Url фото по порядку
const generateComments = getIdGenerator(); // comments под фото по порядку

const photoСomments = () => { //ф-ия по созданию массива объектов — список комментариев
  const arrComments = []; // массив для хранения объектов
  for (let i = 0; i < getRandomInteger(COMMENT_RANGE.min, COMMENT_RANGE.max); i++) { //диапазон коментариев, к одной фото
    arrComments.push({
      id: generateComments(),
      avatar: `img/avatar-${getRandomInteger(AVATAR_RANGE.min, AVATAR_RANGE.max)}.svg`,
      message: getRandomArrayElement(MASSAGES),
      name: getRandomArrayElement(USER_NAME)
    });
  }
  return arrComments;
};

const photoPostedByUser = () => ({ // ф-ия по созданию массива из сгенерированных объектов
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION_FOTO),
  likes: getRandomInteger(LIKES_RANGE.min, LIKES_RANGE.max),
  comments: photoСomments()
});

const getPhotoPostedByUser = () => Array.from({length: NUMBER_OF_UPLOADED_PHOTOS}, photoPostedByUser);

// eslint-disable-next-line no-console
console.log(getPhotoPostedByUser());
