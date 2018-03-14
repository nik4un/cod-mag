'use strict';

(function () {
  var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];

  window.elements.dialogAvatarInput.addEventListener('change', function () {
    var file = window.elements.dialogAvatarInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPE.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.elements.dialogHandle.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
