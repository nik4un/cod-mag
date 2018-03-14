'use strict';

(function () {
  var DECISION_TIME = 500;

  //  параметры волшебника начальные
  var initialSettingsWizard = {
    name: window.elements.wizardNameInput.value,
    eyesColor: window.elements.wizardEyesInput.value,
    coatColor: window.elements.wizardCoatInput.value,
    fireballColor: window.elements.wizardFireballInput.value,
    image: window.elements.wizardSetupOpen.src,
  };

  var artifactsBagInit;
  var timerOnUpdate;

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
    if (evt.target.value.length === 0) {
      evt.target.setCustomValidity(window.settings.MESSAGE.MISSING_RU);
    } else if (evt.target.value.length < 2) {
      evt.target.setCustomValidity(window.settings.MESSAGE.TOOSHORT_RU);
    } else {
      evt.target.setCustomValidity('');
    }
  };

  //  обновление похожих волшебников после изменений настроек полбзователем
  var updateSimilarWizards = function () {
    clearTimeout(timerOnUpdate);
    timerOnUpdate = setTimeout(function () {
      window.showSimilarWizards();
    }, DECISION_TIME);
  };

  //  обработчик для клика на глаза: изменение цвета глаз
  var onEyesClick = function () {
    var eyesColor = changeElementOnNext(
        window.elements.wizardEyesInput.value,
        window.settings.EYES_COLORS
    );
    window.elements.wizardEyesInput.value = eyesColor;
    window.elements.wizardEyes.style.fill = eyesColor;

    updateSimilarWizards();
  };

  //  обработчик для клика на пальто: изменение цвета пальто
  var onCoatClick = function () {
    var coatColor = changeElementOnNext(
        window.elements.wizardCoatInput.value,
        window.settings.COAT_COLORS
    );
    window.elements.wizardCoatInput.value = coatColor;
    window.elements.wizardCoat.style.fill = coatColor;

    updateSimilarWizards();
  };

  //  обработчик для клика на файербол: изменение цвета файербола
  var onFireballClick = function () {
    var fireballColor = changeElementOnNext(
        window.elements.wizardFireballInput.value,
        window.settings.FIREBALL_COLORS
    );
    window.elements.wizardFireballInput.value = fireballColor;
    window.elements.wizardFireball.style.backgroundColor = fireballColor;
  };

  //  обработчик на успешную отправку данных формы
  var onSuccessSubmit = function () {
    window.message.show(
        'Успех',
        'Ваш волшебник успешно добавлен в базу',
        window.message.color.SUCCESS
    );
    closeSetupMenu();
  };

  //  обработчик на возникновение ошибки при  отправке данных формы
  var onErrorSubmit = function (error) {
    window.message.show('Ошибка!', error, window.message.color.ERROR);
  };

  //  обработчик на отправку данных формы
  var onSubmitForm = function (evt) {
    initialSettingsWizard.name = window.elements.wizardNameInput.value;
    window.elements.wizardNameInput.setAttribute(
        'value',
        initialSettingsWizard.name
    );
    initialSettingsWizard.eyesColor = window.elements.wizardEyesInput.value;
    initialSettingsWizard.coatColor = window.elements.wizardCoatInput.value;
    initialSettingsWizard.fireballColor =
      window.elements.wizardFireballInput.value;
    initialSettingsWizard.image = window.elements.dialogHandle.src;
    window.elements.wizardSetupOpen.src = window.elements.dialogHandle.src;
    window.backend.save(
        new FormData(window.elements.wizardSetupForm),
        onSuccessSubmit,
        onErrorSubmit
    );
    evt.preventDefault();
  };

  //  обработчик на нажатие кнопки мыши на аватаре меню настроек
  var onMouseDownAvatar = function (evt) {
    if (evt.target === window.elements.dialogAvatarInput) {
      evt.preventDefault();
    }

    var hasShifted = false;

    var mousePositionInMenu = {
      left: evt.clientX - window.elements.wizardSetupMenu.offsetLeft,
      top: evt.clientY - window.elements.wizardSetupMenu.offsetTop
    };

    //  обработчик перемещения меню настроек в окне браузера
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (Math.abs(moveEvt.movementX) > 1 || Math.abs(moveEvt.movementY) > 1) {
        hasShifted = true;
      }

      window.elements.wizardSetupMenu.style.left =
        moveEvt.clientX - mousePositionInMenu.left + 'px';
      window.elements.wizardSetupMenu.style.top =
        moveEvt.clientY - mousePositionInMenu.top + 'px';
    };

    //  обработчик на отпускание кнопки мыши на аватаре меню настроек
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (hasShifted) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();

          window.elements.dialogAvatarInput.removeEventListener('click', onClickPreventDefault);
        };
        window.elements.dialogAvatarInput.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  //  обработчик для клика на кнопку открытия меню настроек
  var onPopupOpenClic = function () {
    window.elements.wizardSetupMenu.classList.remove('hidden');
    window.showSimilarWizards();

    window.elements.dialogAvatarInput.addEventListener(
        'mousedown',
        onMouseDownAvatar
    );

    //  начальное состояние сумки волшебника
    artifactsBagInit = Array.from(window.elements.artifactsBagCells).map(function (element) {
      return element.innerHTML;
    });

    document.addEventListener('keydown', onPopupPressEsc);

    window.elements.wizardSetupClose.addEventListener('click', onPopupEscClic);
    window.elements.wizardSetupClose.addEventListener(
        'keydown',
        onPopupEscPressEnter
    );

    window.elements.wizardSetupForm.addEventListener('submit', onSubmitForm);

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

    window.elements.wizardSetupClose.removeEventListener(
        'click',
        onPopupEscClic
    );
    window.elements.wizardSetupClose.removeEventListener(
        'keydown',
        onPopupEscPressEnter
    );

    window.elements.wizardSetupForm.removeEventListener('submit', onSubmitForm);

    window.elements.wizardNameInput.removeEventListener('input', onInputName);
    window.elements.wizardNameInput.removeEventListener('focus', function () {
      document.removeEventListener('keydown', onPopupPressEsc);
    });
    window.elements.wizardNameInput.removeEventListener('blur', function () {
      document.addEventListener('keydown', onPopupPressEsc);
    });
    window.elements.wizardEyes.removeEventListener('click', onEyesClick);
    window.elements.wizardCoat.removeEventListener('click', onCoatClick);
    window.elements.wizardFireball.removeEventListener(
        'click',
        onFireballClick
    );
    window.elements.wizardSetupOpen.addEventListener('click', onPopupOpenClic);
    window.elements.wizardSetupOpen.addEventListener(
        'keydown',
        onPopupOpenPressEnter
    );

    window.elements.wizardSetupMenu.style = false;
    window.elements.dialogHandle.removeEventListener(
        'mousedown',
        onMouseDownAvatar
    );
  };

  //  обработчик на клик по кнопке ESC меню настроек
  var onPopupEscClic = function () {
    closeSetupMenu();
    window.elements.wizardNameInput.value = initialSettingsWizard.name;
    window.elements.wizardNameInput.setAttribute(
        'value',
        initialSettingsWizard.name
    );

    window.elements.wizardEyesInput.value = initialSettingsWizard.eyesColor;
    window.elements.wizardCoatInput.value = initialSettingsWizard.coatColor;
    window.elements.wizardFireballInput.value =
      initialSettingsWizard.fireballColor;

    window.elements.wizardEyes.style.fill = initialSettingsWizard.eyesColor;
    window.elements.wizardCoat.style.fill = initialSettingsWizard.coatColor;
    window.elements.wizardFireball.style.backgroundColor =
      initialSettingsWizard.fireballColor;

    window.elements.dialogHandle.src = initialSettingsWizard.image;

    Array.from(window.elements.artifactsBagCells).forEach(function (element, index) {
      element.innerHTML = artifactsBagInit[index];
    });
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
  window.elements.wizardSetupOpen.addEventListener(
      'keydown',
      onPopupOpenPressEnter
  );
})();
