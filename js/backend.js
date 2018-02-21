'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/code-and-magick';
  var ERROR_MESSAGE = {
    400: 'Неверный запрос.',
    401: 'Пользователь не авторизован.',
    404: 'Ничего не найдено.',
    500: 'Ошибка сервера.'
  };
  var TIMEOUT = 30000;

  // формирование запрса на сервер
  var makeRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        var error =
          ERROR_MESSAGE[xhr.status] ||
          'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс.');
    });
    return xhr;
  };

  window.backend = {
    //  функция получения данных с сервера
    load: function (onLoad, onError) {
      var xhr = makeRequest(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    //  функция отправки данных на сервер
    save: function (data, onLoad, onError) {
      var xhr = makeRequest(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
