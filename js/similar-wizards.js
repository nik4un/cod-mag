'use strict';

(function () {
  /**
   * Генерация массива волшебников с произвольными параметрами
   * @return [{name: string, coatColor: string, eyesColor: string}, ...]
   *         массив волшебников со случайным именем и цветом глаз и пальто
   */
  var wizards = (function (num) {
    var resultElements = [];
    var names = window.util.getRandomFromArray(window.settings.WIZARD_NAMES, num);
    var surnames = window.util.getRandomFromArray(window.settings.WIZARD_SURNAMES, num);
    var coatColors = window.util.getRandomFromArray(window.settings.COAT_COLORS, num);
    var eyesColors = window.util.getRandomFromArray(window.settings.EYES_COLORS, num);
    for (var i = 0; i < num; i += 1) {
      resultElements[i] = {
        name: names[i],
        surname: surnames[i],
        coatColor: coatColors[i],
        eyesColor: eyesColors[i]
      };
    }
    return resultElements;
  })(window.settings.NUMBER_OF_WISARDS);

  //  создание фрагмента для заполнения похожими волшебниками
  var fragment = document.createDocumentFragment();

  //  создание элементов в списке волшебников
  (function (items) {
    for (var i = 0; i < items; i += 1) {
      var wizardElement = window.elements.similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent =
        wizards[i].name + ' ' + wizards[i].surname;
      wizardElement.querySelector('.wizard-coat').style.fill =
        wizards[i].coatColor;
      wizardElement.querySelector('.wizard-eyes').style.fill =
        wizards[i].eyesColor;
      fragment.appendChild(wizardElement);
    }
  })(window.settings.NUMBER_OF_WISARDS);

  //  добавление фрагмента с волшебниками
  window.elements.similarListElement.appendChild(fragment);

})();
