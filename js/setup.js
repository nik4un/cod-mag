'use strict';

//  список доступных имен
var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
//  список доступных фамилий
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
//  список доступных цветов мантии
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
//  список доступных цветов глаз
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
//  список доступных цветов файербола
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
//  количество волшебников в списке
var NUMBER_OF_WISARDS = 4;
//  клавиатурные коды
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
//  сообщения на валидность
var MESSAGE_TOOSHORT_RU = 'Имя должно состоять как минимум из 2-х символов';
var MESSAGE_MISSING_RU = 'Поле должно быть заполнено';

/**
 * получение мссива из  "num" случайных элементов массива "arr"
 * @param  {Array} arr исходный массив
 * @param  {number} num количество элементов результирующего массива (<= arr.length)
 * @return {Array}     массив из случайных элементов исходного массива
 */
var getRandomFromArray = function (arr, num) {
  num = num || NUMBER_OF_WISARDS;
  var inetrArr = Array.from(arr);
  var resultElements = [];
  for (var i = 0; i < num; i += 1) {
    resultElements[i] = inetrArr.splice(Math.floor(Math.random() * inetrArr.length), 1)[0];
  }
  return resultElements;
};

/**
 * Генерация массива волшебников с произвольными параметрами
 * @return [{name: string, coatColor: string, eyesColor: string}, ...]
 *         массив волшебников со случайным именем и цветом глаз и пальто
 */
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
})(NUMBER_OF_WISARDS);

var wizardSetupMenu = document.querySelector('.setup');
var similarListElement = wizardSetupMenu.querySelector('.setup-similar-list');
var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
//  создание фрагмента для заполнения похожими волшебниками
var fragment = document.createDocumentFragment();

//  создание элементов в списке волшебников
(function (items) {
  for (var i = 0; i < items; i += 1) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent =
      wizards[i].name + ' ' + wizards[i].surname;
    wizardElement.querySelector('.wizard-coat').style.fill =
      wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill =
      wizards[i].eyesColor;
    fragment.appendChild(wizardElement);
  }
})(NUMBER_OF_WISARDS);

var wizardSetupOpen = document.querySelector('.setup-open');
var wizardSetupClose = document.querySelector('.setup-close');
var wizardSetupSave = wizardSetupMenu.querySelector('.setup-submit');
var wizardNameInput = wizardSetupMenu.querySelector('.setup-user-name');
var wizardSetup = wizardSetupMenu.querySelector('.setup-player');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardCoatInput = document.querySelector('input[name="coat-color"]');
var wizardEyesInput = document.querySelector('input[name="eyes-color"]');
var wizardFireballInput = wizardFireball.querySelector(
    'input[name="fireball-color"]'
);
//  параметры волшебника начальные и текущие
var wizardInit = {
  eyesColor: wizardEyesInput.value,
  coatColor: wizardCoatInput.value,
  fireballColor: wizardFireballInput.value
};

/**
 * устанавливает/удаляет отслеживание событий
 * @param  {obj}    element           элемент, на который устанавливается событие
 * @param  {string} action            может быть "add" или "remove"
 * @param  {Array}  eventHandlerPairs массив списков из двух значений [событие, обработчик]
 */
var setEventsListener = function (element, action, eventHandlerPairs) {
  if (action === 'add') {
    eventHandlerPairs.forEach(function (item) {
      element.addEventListener(item[0], item[1]);
    });
  }
  if (action === 'remove') {
    eventHandlerPairs.forEach(function (item) {
      element.removeEventListener(item[0], item[1]);
    });
  }
};

//  получение обработчика для клика на элементе
var getClickHandler = function (method) {
  return function () {
    method();
  };
};

//  получение обработчика для нажатой кнопки
var getKeydownHandler = function (keyCode, method) {
  //   var condition = document.activeElement.className !== 'setup-user-name';
  return function (evt) {
    if (evt.keyCode === keyCode) {
      method();
    }
  };
};

//  обработчик для ввода имени в поле ввода
var onInput = function (evt) {
  setEventsListener(wizardSetupSave, 'remove', [
    ['click', onSetupSaveClick],
    ['keydown', onSetupSavePressEnter]
  ]);
  if (evt.target.value.length === 0) {
    evt.target.setCustomValidity(MESSAGE_MISSING_RU);
  } else if (evt.target.value.length < 2) {
    evt.target.setCustomValidity(MESSAGE_TOOSHORT_RU);
  } else {
    evt.target.setCustomValidity('');
    setEventsListener(wizardSetupSave, 'add', [
      ['click', onSetupSaveClick],
      ['keydown', onSetupSavePressEnter]
    ]);
  }
};

/**
 * изменение element на следующий по порядку из colorSource
 * @param  {String} element     исходный цвет
 * @param  {Array} colorSource  список доступных цветов
 * @return {String}             цвет следующий по порядку в списке за element
 */
var changeColor = function (element, colorSource) {
  var index = colorSource.indexOf(element);
  index = index < colorSource.length - 1 ? index + 1 : 0;
  return colorSource[index];
};

//  обработчик для изменения цвета глаз
var changeEyesColor = function () {
  wizardInit.eyesColor = changeColor(wizardInit.eyesColor, EYES_COLORS);
  wizardEyesInput.value = wizardInit.eyesColor;
  wizardEyes.style.fill = wizardInit.eyesColor;
};

//  обработчик для изменения цвета пальто
var changeCoatColor = function () {
  wizardInit.coatColor = changeColor(wizardInit.coatColor, COAT_COLORS);
  wizardCoatInput.value = wizardInit.coatColor;
  wizardCoat.style.fill = wizardInit.coatColor;
};

//  обработчик для изменения цвета файербола
var changeFireballColor = function () {
  wizardInit.fireballColor = changeColor(
      wizardInit.fireballColor,
      FIREBALL_COLORS
  );
  wizardFireballInput.value = wizardInit.fireballColor;
  wizardFireball.style.backgroundColor = wizardInit.fireballColor;
};

//  открытие меню настроек
var openPopup = function () {
  wizardSetupMenu.classList.remove('hidden');
  wizardSetupMenu.querySelector('.setup-similar').classList.remove('hidden');

  setEventsListener(document, 'add', [['keydown', onPopupPressEsc]]);
  setEventsListener(wizardSetupClose, 'add', [
    ['click', onPopupEscClic],
    ['keydown', onPopupEscPressEnter]
  ]);
  setEventsListener(wizardSetupSave, 'add', [
    ['click', onSetupSaveClick],
    ['keydown', onSetupSavePressEnter]
  ]);
  setEventsListener(wizardNameInput, 'add', [
    ['input', onInput],
    [
      'focus',
      function () {
        document.removeEventListener('keydown', onPopupPressEsc);
      }
    ],
    [
      'blur',
      function () {
        document.addEventListener('keydown', onPopupPressEsc);
      }
    ]
  ]);
  setEventsListener(wizardEyes, 'add', [['click', onEyesClick]]);
  setEventsListener(wizardCoat, 'add', [['click', onCoatClick]]);
  setEventsListener(wizardFireball, 'add', [['click', onFireballClick]]);
};

//  закрытие меню настроек
var closePopup = function () {
  wizardSetupMenu.classList.add('hidden');

  setEventsListener(document, 'remove', [['keydown', onPopupPressEsc]]);
  setEventsListener(wizardSetupClose, 'remove', [
    ['click', onPopupEscClic],
    ['keydown', onPopupEscPressEnter]
  ]);
  setEventsListener(wizardSetupSave, 'remove', [
    ['click', onSetupSaveClick],
    ['keydown', onSetupSavePressEnter]
  ]);
  setEventsListener(wizardNameInput, 'remove', [
    ['input', onInput],
    ['focus', function () {
      document.removeEventListener('keydown', onPopupPressEsc);
    }
    ],
    ['blur', function () {
      document.addEventListener('keydown', onPopupPressEsc);
    }
    ]
  ]);
  setEventsListener(wizardEyes, 'remove', [['click', onEyesClick]]);
  setEventsListener(wizardCoat, 'remove', [['click', onCoatClick]]);
  setEventsListener(wizardFireball, 'remove', [['click', onFireballClick]]);
};

//  помещения обработчиков в переменные
var onPopupOpenClic = getClickHandler(openPopup);
var onPopupOpenPressEnter = getKeydownHandler(ENTER_KEYCODE, openPopup);
var onPopupEscClic = getClickHandler(closePopup);
var onPopupPressEsc = getKeydownHandler(ESC_KEYCODE, closePopup);
var onPopupEscPressEnter = getKeydownHandler(ENTER_KEYCODE, closePopup);
var onSetupSaveClick = getClickHandler(closePopup);
var onSetupSavePressEnter = getKeydownHandler(ENTER_KEYCODE, closePopup);
var onEyesClick = getClickHandler(changeEyesColor);
var onCoatClick = getClickHandler(changeCoatColor);
var onFireballClick = getClickHandler(changeFireballColor);

//  добавление фрагмента с волшебниками
similarListElement.appendChild(fragment);

//  создание отслеживания событий для открытия меню настроек
setEventsListener(wizardSetupOpen, 'add', [
  ['click', onPopupOpenClic],
  ['keydown', onPopupOpenPressEnter]
]);
