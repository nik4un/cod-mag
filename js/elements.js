'use strict';

var wizardSetupMenu = document.querySelector('.setup');
var wizardSetup = wizardSetupMenu.querySelector('.setup-player');
(function () {
  window.elements = {
    wizardSetupMenu: wizardSetupMenu,
    similarWizardTemplate: document
        .querySelector('#similar-wizard-template')
        .content.querySelector('.setup-similar-item'),
    wizardSetupOpen: document.querySelector('.setup-open'),
    wizardSetupClose: wizardSetupMenu.querySelector('.setup-close'),
    wizardSetupSimilar: wizardSetupMenu.querySelector('.setup-similar'),
    wizardSetupSave: wizardSetupMenu.querySelector('.setup-submit'),
    wizardNameInput: wizardSetupMenu.querySelector('.setup-user-name'),
    similarListElement: wizardSetupMenu.querySelector('.setup-similar-list'),
    wizardSetup: wizardSetup,
    wizardCoat: wizardSetup.querySelector('.wizard-coat'),
    wizardEyes: wizardSetup.querySelector('.wizard-eyes'),
    wizardFireball: wizardSetup.querySelector('.setup-fireball-wrap'),
    wizardCoatInput: wizardSetup.querySelector('input[name="coat-color"]'),
    wizardEyesInput: wizardSetup.querySelector('input[name="eyes-color"]'),
    wizardFireballInput: wizardSetup.querySelector('input[name="fireball-color"]'),
  };
})();
