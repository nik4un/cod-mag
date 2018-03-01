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

  // расчет рейтинга похожести для волшебников с сервера
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.elements.wizardCoatInput.value) {
      rank += 2;
    }
    if (wizard.colorEyes === window.elements.wizardEyesInput.value) {
      rank += 1;
    }
    return rank;
  };

  /**
   *  формирование фрагмента DOM с похожими волшебниками из данных, полученных с сервера
   * @param  {array} wizardList [ массив объектов, описывающих волшебника ]
   */
  var getSimilarWizards = function (wizardList) {
    // сортировка волшебников по похожести
    // и получение первых наиболее похожих в количестве NUMBER_OF_WISARDS
    var wizards = wizardList.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizardList.indexOf(left) - wizardList.indexOf(right);
      }
      return rankDiff;
    }).slice(0, window.settings.NUMBER_OF_WISARDS);

    //  очистка списка похожих волшебников, если он не пустй
    while (window.elements.similarListElement.children.length) {
      window.elements.similarListElement.removeChild(window.elements.similarListElement.children[0]);
    }

    //  создание фрагмента для заполнения похожими волшебниками
    var fragment = document.createDocumentFragment();

    //  наполнение фрагмента похожими волшебниками
    wizards.forEach(function (item) {
      var wizardElement = window.elements.similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent =
        item.name;
      wizardElement.querySelector('.wizard-coat').style.fill = item.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = item.colorEyes;
      fragment.appendChild(wizardElement);
    });

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

  // получение похожих волшебников, в зависимости от того, скачены они с сервера или нет
  window.showSimilarWizards = function () {
    if (!allWizards) {
      window.backend.load(onSuccessLoad, onErrorLoad);
    } else {
      getSimilarWizards(allWizards);
    }
  };
})();
