const bigFotoElement = document.querySelector('.big-picture'); //модальное окно

//функция для чистоты кода
const isEscapeKey = (evt) => evt.key === 'Escape';
const isModalTarget = (evt) => evt.target === bigFotoElement;

/**
 * устранение дребезга
 * @param callback
 * @param {number} timeDelay - задержка в миллисекундах
 * @returns
 */
const debounce = (callback, timeDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeDelay);
  };
};

export { isEscapeKey, isModalTarget, debounce };

/**
 *
 * @param {(...args: any) => any} callback
 * @param {number} [delay]
 * @return {(...args: any) => any}
 */
/*const debounce = (callback, delay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  let lastCallTime;

  return (...rest) => {
    const elapsedTime = Date.now() - lastCallTime;
    const newDelay = Math.max(delay - elapsedTime, 0);

    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => {
      callback(...rest);
      lastCallTime = Date.now();
    }, newDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};*/
