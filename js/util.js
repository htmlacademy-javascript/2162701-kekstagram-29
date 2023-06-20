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

export {getRandomInteger};
export {getRandomArrayElement};
export {getIdGenerator};
