
const sliderElement = document.querySelector('.effects__list'); // ползунок слайдера для каждой li
const valueElement = document.querySelector('.effect-level__value');
const radioElement = document.querySelector('.effects__radio');

//Начальное значение в поле ввода записано самостоятельно.
valueElement.value = 80;

//передаем sliderElement(в нем просим отрисовать слайдер), min, max значение, шаг, с какой стороны закрашивать ползунок
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) { //Метод .format.to() нужен для форматирования значения из слайдера и вывода его где-либо.
      if (Number.isInteger(value)) {//.isInteger целое число
        return value.toFixed(0); //обрезание всех знаков после запятой если число целое
      }
      return value.toFixed(1); // .toFixed количество знаков после запятой
    },
    from: function (value) { //Метод .format.from() нужен для форматирования значения для слайдера
      return parseFloat(value); //метод parseFloat() для возвращения числа
    },
  },
});

//.on(на) update слушитель событий нужно вызывать функцию
//первым аргументом передается тип события, вторым обработчик
//метод .get вернет значение
sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

//обработчик на выбор галочки с условием, от которого зависит, какие параметры передать слайдеру.
//.updateOptions обновить настройки
//Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
radioElement.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
    sliderElement.noUiSlider.set(100);//метод .set устанавливает значение прямо в слайдер
  }
});

//удаление слайдера, метод мы вызываем у свойства noUiSlider элемента.
//sliderElement.noUiSlider.destroy();

//отключение слайдера
//sliderElement.setAttribute('disabled', true);
//добавлять и убирать атрибут 'disabled' следует с помощью методов .setAttribute() и .removeAttribute()
// sliderElement.removeAttribute('disabled');
