'use strict';


//  список доступных имен
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
//  список доступных фамилий
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
//  список доступных цветов мантии
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
//  список доступных цветов глаз
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

//  количество волшебников в списке
var NUMBER_OF_WISARDS = 4;

// получение мссива  из  num случайных элементов массива arr
var getRandomFromArray = function (arr, num) {
  num = num || NUMBER_OF_WISARDS;
  var resultElements = [];
  for (var i = 0; i < num; i += 1) {
    resultElements[i] = arr.splice((Math.floor(Math.random() * arr.length)), 1)[0];
  }
  return resultElements;
};

//  создание массива волшебников с произвольными параметрами
var wizards = (function (num) {
  var resultElements = [];
  var names = getRandomFromArray(WIZARD_NAMES, num);
  var surnames = getRandomFromArray(WIZARD_SURNAMES, num);
  var coatColors = getRandomFromArray(COAT_COLORS, num);
  var eyesColors = getRandomFromArray(EYES_COLORS, num);
  for (var i = 0; i < num; i += 1) {
    resultElements[i] = {
      name: names[i],
      surname: surnames[i],
      coatColor: coatColors[i],
      eyesColor: eyesColors[i]
    };
  }
  return resultElements;
}
)(NUMBER_OF_WISARDS);

//  создание волшебника из шаблон
var uesrDialog = document.querySelector('.setup');
var similarListElement = uesrDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

//  создание элементов в списке волшебников
(function (items) {
  for (var i = 0; i < items; i += 1) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name + ' ' + wizards[i].surname;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    fragment.appendChild(wizardElement);
  }
})(NUMBER_OF_WISARDS);

//  отображение стартового окна и списка волшебников в нем
uesrDialog.classList.remove('hidden');
similarListElement.appendChild(fragment);
uesrDialog.querySelector('.setup-similar').classList.remove('hidden');
