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

/**
 * Проверка попадания встречи в рамки рабочего дня
 * @param {string} startDay — старт рабочего дня
 * @param {string} endDay — конец рабочего дня
 * @param {string} startMeeting — начало встречи
 * @param {number} timeMeeting - время встречи
 * @return {boolean} — true, если попадает, либо false
 */

const causeTime = (startDay, endDay, startMeeting, timeMeeting) => {
  if (parseFloat(startMeeting) + (timeMeeting / 60) <= parseFloat(endDay.replace(':', '.')) && startMeeting.replace(':', '.') >= parseFloat(startDay.replace(':', '.'))) {
    return true;
  } else {
    return false;
  }
};

(causeTime('08:00', '17:30', '14:00', 90));
(causeTime('8:0', '10:0', '8:0', 120));
(causeTime('08:00', '14:30', '14:00', 90));
(causeTime('14:00', '17:30', '08:0', 90));
(causeTime('8:00', '17:30', '08:00', 900));
