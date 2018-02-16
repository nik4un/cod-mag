'use strict';

//  добавление перетаскиванием артифактов волшебнику
(function () {
  var draggedItem = null;

  window.elements.wizardSetupMenu.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem =
        evt.target.parentElement.parentElement === window.elements.artifactsShop ?
          evt.target.cloneNode(true) : evt.target;
      window.elements.artifactsBag.setAttribute('style', 'outline: 2px dashed red;');
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  window.elements.artifactsBag.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  window.elements.artifactsBag.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
    return false;
  });

  window.elements.artifactsBag.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    if (evt.target.tagName.toLowerCase() === 'div' && evt.target.children.length === 0) {
      evt.target.appendChild(draggedItem);
    }
    window.elements.artifactsBag.removeAttribute('style');
    draggedItem = null;

    evt.preventDefault();
  });

  window.elements.artifactsBag.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  window.elements.artifactsBag.addEventListener('dragend', function (evt) {
    evt.target.parentElement.removeChild(draggedItem);
    window.elements.artifactsBag.removeAttribute('style');
    evt.preventDefault();
  });
})();
