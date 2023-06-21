/**
 * Проверка длины строки
 * @param {string} testString  — исходная строка
 * @param {number} stringLength - максимальное кол-во символов
 * @returns {boolean} — false, если является, либо true
 */

const getSTtringLeNnght = (testString, stringLength) => {
  if (testString.length > stringLength) {
    return false;
  }
  return true;
};

getSTtringLeNnght('хочется как можно меньше работать и больше веселиться', 35);

/**
 * Проверка строки на палиндром
 * @param {string} palindrome — исходная строка
 * @return {boolean} — true, если является, либо false
 */

const checkPalindrom = (palindrome) => {
  if (palindrome.toUpperCase().replaceAll(' ', '') === palindrome.toUpperCase().replaceAll(' ', '').split('').reverse().join('')) {
    return true;
  }
  return false;
};

checkPalindrom('привет');
checkPalindrom('Лёша на полке клопа нашёл');
