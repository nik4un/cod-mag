'use strict';

(function () {
  window.util = {
    /**
     * поиск максимального значения в массиве чисел
     * @param  {Array} arr массив чисел
     * @return {namber}    максимальное число в массиве
     */
    getMaxElement: function (arr) {
      return Math.max.apply(null, arr);
    },
    /**
     * получение мссива из num случайных элементов массива arr
     * @param  {Array} arr  исходный массив
     * @param  {number} num количество элементов результирующего массива (<= arr.length)
     * @return {Array}      массив из случайных элементов исходного массива
     */
    getRandomFromArray: function (arr, num) {
      var inetrArr = (arr === 'undefined') ? [] : Array.from(arr);
      var resultElements = [];
      for (var i = 0; i < num; i += 1) {
        resultElements[i] = inetrArr.splice(
            Math.floor(Math.random() * inetrArr.length),
            1
        )[0];
      }
      return resultElements;
    }
  };
})();
