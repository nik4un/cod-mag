'use strict';

//  параметры волшебника начальные
var wizardInitial = {
  name: window.elements.wizardNameInput.value,
  eyesColor: window.elements.wizardEyesInput.value,
  coatColor: window.elements.wizardCoatInput.value,
  fireballColor: window.elements.wizardFireballInput.value
};

//  параметры волшебника текущие
var wizardCurrent = {
  name: window.elements.wizardNameInput,
  eyesColor: window.elements.wizardEyesInput.value,
  coatColor: window.elements.wizardCoatInput.value,
  fireballColor: window.elements.wizardFireballInput.value
};

/**
 * определяет значение следующее по порядку за element из списа colorSource
 * @param  {any} element   исходное значение
 * @param  {array} source  список доступных значений
 * @return {any}           значение, следующее по порядку в списке за element
 */
var changeElementOnNext = function (element, source) {
  var index = source.indexOf(element);
  index = index < source.length - 1 ? index + 1 : 0;
  return source[index];
};

//  обработчик для ввода имени в поле ввода
var onInputName = function (evt) {
  window.elements.wizardSetupSave.removeEventListener('click', onSetupSaveClick);
  window.elements.wizardSetupSave.removeEventListener('keydown', onSetupSavePressEnter);

  if (evt.target.value.length === 0) {
    evt.target.setCustomValidity(window.settings.MESSAGE.MISSING_RU);
  } else if (evt.target.value.length < 2) {
    evt.target.setCustomValidity(window.settings.MESSAGE.TOOSHORT_RU);
  } else {
    evt.target.setCustomValidity('');
    window.elements.wizardSetupSave.addEventListener('click', onSetupSaveClick);
    window.elements.wizardSetupSave.addEventListener('keydown', onSetupSavePressEnter);
  }
};

//  обработчик для клика на глаза: изменение цвета глаз
var onEyesClick = function () {
  wizardCurrent.eyesColor = changeElementOnNext(wizardCurrent.eyesColor, window.settings.EYES_COLORS);
  window.elements.wizardEyesInput.value = wizardCurrent.eyesColor;
  window.elements.wizardEyes.style.fill = wizardCurrent.eyesColor;
};

//  обработчик для клика на пальто: изменение цвета пальто
var onCoatClick = function () {
  wizardCurrent.coatColor = changeElementOnNext(wizardCurrent.coatColor, window.settings.COAT_COLORS);
  window.elements.wizardCoatInput.value = wizardCurrent.coatColor;
  window.elements.wizardCoat.style.fill = wizardCurrent.coatColor;
};

//  обработчик для клика на файербол: изменение цвета файербола
var onFireballClick = function () {
  wizardCurrent.fireballColor = changeElementOnNext(
      wizardCurrent.fireballColor,
      window.settings.FIREBALL_COLORS
  );
  window.elements.wizardFireballInput.value = wizardCurrent.fireballColor;
  window.elements.wizardFireball.style.backgroundColor = wizardCurrent.fireballColor;
};

//  обработчик для клика на кнопку «Сохранить» меню настроек
var onSetupSaveClick = function () {
  wizardInitial.name = window.elements.wizardNameInput.value;
  window.elements.wizardNameInput.setAttribute('value', wizardInitial.name);
  wizardInitial.eyesColor = window.elements.wizardEyesInput.value;
  wizardInitial.coatColor = window.elements.wizardCoatInput.value;
  wizardInitial.fireballColor = window.elements.wizardFireballInput.value;
  closeSetupMenu();
};

var onMouseDownAvatar = function (evt) {
  if (evt.target === window.elements.dialogHandle) {
    evt.preventDefault();
  }

  var hasShifted = false;

  var mousePositionInMenu = {
    left: evt.clientX - window.elements.wizardSetupMenu.offsetLeft,
    top: evt.clientY - window.elements.wizardSetupMenu.offsetTop
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    hasShifted = true;

    window.elements.wizardSetupMenu.style.left =
      (moveEvt.clientX - mousePositionInMenu.left) + 'px';
    window.elements.wizardSetupMenu.style.top =
      (moveEvt.clientY - mousePositionInMenu.top) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (!hasShifted) {
      window.elements.dialogAvatarInput.click();
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};


var onSetupSavePressEnter = function (evt) {
  if (evt.keyCode === window.settings.KEY_CODE.ENTER) {
    onSetupSaveClick();
  }
};

//  обработчик для клика на кнопку открытия меню настроек
var onPopupOpenClic = function () {
  window.elements.wizardSetupMenu.classList.remove('hidden');
  window.elements.wizardSetupSimilar.classList.remove('hidden');

  window.elements.dialogAvatarInput.style.zIndex = '-1';
  window.elements.dialogHandle.addEventListener('mousedown', onMouseDownAvatar);

  document.addEventListener('keydown', onPopupPressEsc);

  window.elements.wizardSetupClose.addEventListener('click', onPopupEscClic);
  window.elements.wizardSetupClose.addEventListener('keydown', onPopupEscPressEnter);

  window.elements.wizardSetupSave.addEventListener('click', onSetupSaveClick);
  window.elements.wizardSetupSave.addEventListener('keydown', onSetupSavePressEnter);

  window.elements.wizardNameInput.addEventListener('input', onInputName);
  window.elements.wizardNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupPressEsc);
  });
  window.elements.wizardNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupPressEsc);
  });

  window.elements.wizardEyes.addEventListener('click', onEyesClick);
  window.elements.wizardCoat.addEventListener('click', onCoatClick);
  window.elements.wizardFireball.addEventListener('click', onFireballClick);
};


//  действия при закрытии меню настроек
var closeSetupMenu = function () {
  window.elements.wizardSetupMenu.classList.add('hidden');

  document.removeEventListener('keydown', onPopupPressEsc);

  window.elements.wizardSetupClose.removeEventListener('click', onPopupEscClic);
  window.elements.wizardSetupClose.removeEventListener('keydown', onPopupEscPressEnter);

  window.elements.wizardSetupSave.removeEventListener('click', onSetupSaveClick);
  window.elements.wizardSetupSave.removeEventListener('keydown', onSetupSavePressEnter);

  window.elements.wizardNameInput.removeEventListener('input', onInputName);
  window.elements.wizardNameInput.removeEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupPressEsc);
  });
  window.elements.wizardNameInput.removeEventListener('blur', function () {
    document.addEventListener('keydown', onPopupPressEsc);
  });
  window.elements.wizardEyes.removeEventListener('click', onEyesClick);
  window.elements.wizardCoat.removeEventListener('click', onCoatClick);
  window.elements.wizardFireball.removeEventListener('click', onFireballClick);
  window.elements.wizardSetupOpen.addEventListener('click', onPopupOpenClic);
  window.elements.wizardSetupOpen.addEventListener('keydown', onPopupOpenPressEnter);

  window.elements.wizardSetupMenu.style = false;
  window.elements.dialogHandle.removeEventListener('mousedown', onMouseDownAvatar);
};

//  обработчик на клик по кнопке ESC меню настроек
var onPopupEscClic = function () {
  closeSetupMenu();
  window.elements.wizardNameInput.value = wizardInitial.name;
  window.elements.wizardNameInput.setAttribute('value', wizardInitial.name);
  window.elements.wizardEyesInput.value = wizardInitial.eyesColor;
  window.elements.wizardCoatInput.value = wizardInitial.coatColor;
  window.elements.wizardFireballInput.value = wizardInitial.fireballColor;

  wizardCurrent.name = wizardInitial.name;
  wizardCurrent.eyesColor = wizardInitial.eyesColor;
  wizardCurrent.coatColor = wizardInitial.coatColor;
  wizardCurrent.fireballColor = wizardInitial.fireballColor;

  window.elements.wizardEyes.style.fill = wizardInitial.eyesColor;
  window.elements.wizardCoat.style.fill = wizardInitial.coatColor;
  window.elements.wizardFireball.style.backgroundColor = wizardInitial.fireballColor;
};

//  обработчик на нажатие кнопки ENTER на сокусированной кнопке открытия меню настроек
var onPopupOpenPressEnter = function (evt) {
  if (evt.keyCode === window.settings.KEY_CODE.ENTER) {
    onPopupEscClic();
  }
};

//  обработчик на нажатие кнопки ESC при открытом меню настроек
var onPopupPressEsc = function (evt) {
  if (evt.keyCode === window.settings.KEY_CODE.ESC) {
    onPopupEscClic();
  }
};

//  обработчик на нажатие кнопки ENTER на сокусированной кнопке закрытия меню настроек
var onPopupEscPressEnter = function (evt) {
  if (evt.keyCode === window.settings.KEY_CODE.ENTER) {
    onPopupEscClic();
  }
};

//  создание отслеживания событий для открытия меню настроек
window.elements.wizardSetupOpen.addEventListener('click', onPopupOpenClic);
window.elements.wizardSetupOpen.addEventListener('keydown', onPopupOpenPressEnter);
