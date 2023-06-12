const GET_STRING_LENGHT = (testString, stringLength) => {
  if (testString.length > stringLength) {
    return false;
  }
  return true;
};

GET_STRING_LENGHT('хочется как можно меньше работать и больше веселиться', 35);

/**
* приводим к одному регистру, удалям пробеллы в строке
* делаем все буквы элементами массива, меняем положение и удаляем все запятые и пробелы самого массива
*/
const CHECK_PALINDROM = (palindrome) => {
  if (palindrome.toUpperCase().replaceAll(' ', '') === palindrome.toUpperCase().replaceAll(' ', '').split('').reverse().join('')) {
    return true;
  }
  return false;
};

CHECK_PALINDROM('привет');
CHECK_PALINDROM('Лёша на полке клопа нашёл');
