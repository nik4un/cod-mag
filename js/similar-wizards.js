'use strict';

(function () {
  /**
   * Генерация массива волшебников с произвольными параметрами из внутренних данных
   * @return [{name: string, coatColor: string, eyesColor: string}, ...]
   *         массив волшебников со случайным именем и цветом глаз и пальто
   */
  // var wizards = (function (num) {
  //   var resultElements = [];
  //   var names = window.util.getRandomFromArray(window.settings.WIZARD_NAMES, num);
  //   var surnames = window.util.getRandomFromArray(window.settings.WIZARD_SURNAMES, num);
  //   var coatColors = window.util.getRandomFromArray(window.settings.COAT_COLORS, num);
  //   var eyesColors = window.util.getRandomFromArray(window.settings.EYES_COLORS, num);
  //   for (var i = 0; i < num; i += 1) {
  //     resultElements[i] = {
  //       name: names[i],
  //       surname: surnames[i],
  //       coatColor: coatColors[i],
  //       eyesColor: eyesColors[i]
  //     };
  //   }
  //   return resultElements;
  // })(window.settings.NUMBER_OF_WISARDS);

  var allWizards = null;

  /**
   *  формирование фрагмента DOM с похожими волшебниками из данных, полученных с сервера
   * @param  {array} wizardList [ массив объектов, описывающих волшебника ]
   */
  var getSimilarWizards = function (wizardList) {
    var wizards = window.util.getRandomFromArray(
        wizardList,
        window.settings.NUMBER_OF_WISARDS
    );

    //  создание фрагмента для заполнения похожими волшебниками
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (item) {
      var wizardElement = window.elements.similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent =
        item.name;
      wizardElement.querySelector('.wizard-coat').style.fill = item.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = item.colorEyes;
      fragment.appendChild(wizardElement);
    });
    //  добавление фрагмента с волшебниками
    window.elements.similarListElement.appendChild(fragment);
  };

  /**
   * обработчик на успешное получение данных с сервера
   * тображение похожих волшебников в меню настроек
   * @param  {array} data [ массив объектов, описывающих волшебника ]
   */
  var onSuccessLoad = function (data) {
    allWizards = data;
    getSimilarWizards(allWizards);
    window.elements.wizardSetupSimilar.classList.remove('hidden');
  };

  /**
   * обработчик на возникновение ошибки при получении данных с сервера
   *  вывод сообщения в окне браузера
   * @param  {string} error [ описание ошибки ]
   */
  var onErrorLoad = function (error) {
    var messageError = error + ' Похожие волшебники не могут быть отображены';
    window.message.show('Ошибка!', messageError, window.message.color.ERROR);
  };

  window.loadWizards = function () {
    if (!allWizards) {
      window.backend.load(onSuccessLoad, onErrorLoad);
    }
  };
})();
