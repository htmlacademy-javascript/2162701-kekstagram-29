//Имена авторов
const userName = ['Анастасия', 'Анна', 'Мария', 'Елена', 'Дарья', 'Алина', 'Ирина', 'Екатерина', 'Арина', 'Полина',
  'Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил'];

//Текст комментария
const massages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

//Описание фотографии
const descriptionFoto = ['пляж', 'go to the beach', 'океан', 'девушка на пляже', 'веселый обед', 'black car', 'detox',
  'смузи', 'дикие люди', 'обувница', 'дорога на пляж', 'whate car', 'ужин', 'суши-кот', 'тапки', 'горы', 'хор', 'ретро авто',
  'фонарики', 'урбанизация', 'было очень вкусно', 'закат', 'крабик', 'фестиваль', 'нашествие инопланетян' ];

// Генерация случайных чисел
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//генерация случайного элемента массива
const getRandomArrayElement = (elements,) => elements[getRandomInteger(0, elements.length - 1)];

// Генерация порядкого номера
function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generatePhotoId = createIdGenerator(); // id фото по порядку
const generatePhoUrl = createIdGenerator(); // Url фото по порядку
const generateComments = createIdGenerator(); // comments под фото по порядку

const photoPostedByUser = () => {
  const photoСomments = () => { //ф-ия по созданию массив объектов — список комментариев
    const arrComments = []; // массив для хранения объектов
    for (let i = 0; i < getRandomInteger(1, 30); i++) { //диапазон коментариев, к одной фото
      arrComments.push({
        id: generateComments(),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: getRandomArrayElement(massages),
        name: getRandomArrayElement(userName)
      });
    }
    return arrComments;
  };

  return {
    id: generatePhotoId(),
    url: `photos/${generatePhoUrl()}.jpg`,
    description: getRandomArrayElement(descriptionFoto),
    likes: getRandomInteger(15, 200),
    comments: photoСomments()
  };
};
// eslint-disable-next-line no-console
console.log(Array.from({length: 25}, photoPostedByUser));
