'use strict';

(function () {
  var color = {
    SUCCESS: '#1cb34d',
    ERROR: '#ee4830'
  };
  var DISPLAY_TIME = 3000;
  var POSITION = window.elements.wizardSetupOpen;

  // var createMessage = function (title, text, bgColor) {
  //   var messageBody = document.createElement('div');
  //   var messageText = document.createElement('p');
  //
  //   messageBody.appendChild(messageText);
  //   messageText.textContent = text;
  //
  //   messageBody.style.cssText = 'position: absolute; top: 0; width: 100%;';
  //   messageBody.style.backgroundColor = bgColor;
  //   messageText.style.cssText = 'color: #fff; text-align: center; margin: 3px 11px';
  //
  //   return messageBody;
  // };

  var showMessage = function (title, text, bgColor) {
    var messageBody = document.createElement('div');
    var messageText = document.createElement('p');

    messageBody.appendChild(messageText);
    messageText.textContent = text;

    messageBody.style.cssText = 'position: absolute; top: 0; width: 100%;';
    messageBody.style.backgroundColor = bgColor;
    messageText.style.cssText = 'color: #fff; text-align: center; margin: 3px 11px';

    POSITION.appendChild(messageBody);
    setTimeout(function () {
      POSITION.removeChild(messageBody);
    }, DISPLAY_TIME);
  };

  window.message = {
    color: color,
    show: showMessage
  };
})();
