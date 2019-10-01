'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var similarListElement = setupSimilar.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

function getRandomElement(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

function createWizards(num) {
  var wizards = [];

  for (var i = 0; i < num; i++) {
    wizards[i] = {
      name: getRandomElement(NAMES) + ' ' + getRandomElement(LAST_NAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    };
  }
  return wizards;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function renderAllWizards(wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
}

similarListElement.appendChild(renderAllWizards(createWizards(4)));

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var SETUP_OPEN = document.querySelector('.setup-open');
var SETUP_CLOSE = setup.querySelector('.setup-close');
var SETUP_USER_NAME = setup.querySelector('.setup-user-name');

SETUP_OPEN.addEventListener('click', function () {
  openSetup();
});

SETUP_CLOSE.addEventListener('click', function () {
  closeSetup();
});

function openSetup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
}

function closeSetup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
}

function onSetupEscPress(e) {
  if (e.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
}

SETUP_OPEN.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

SETUP_CLOSE.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

SETUP_USER_NAME.addEventListener('keydown', function (e) {
  if (e.keyCode === ESC_KEYCODE) {
    e.stopPropagation();
  }
});

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');

var coatColorInput = document.querySelector('input[name="coat-color"]');
var eyesColorInput = document.querySelector('input[name="eyes-color"]');
var fireballColorInput = document.querySelector('input[name="fireball-color"]');

wizardCoat.addEventListener('click', function () {
  changeWizardCoatColor();
});

wizardEyes.addEventListener('click', function () {
  changeWizardEyesColor();
});

setupFireballWrap.addEventListener('click', function () {
  changeFireballColor();
});

function changeWizardCoatColor() {
  var wizardCoatColor = getRandomElement(COAT_COLORS);
  wizardCoat.style.fill = wizardCoatColor;
  coatColorInput.value = wizardCoatColor;
}

function changeWizardEyesColor() {
  var wizardYeysColor = getRandomElement(EYES_COLORS);
  wizardEyes.style.fill = wizardYeysColor;
  eyesColorInput.value = wizardYeysColor;
}

function changeFireballColor() {
  var fireballColor = getRandomElement(FIREBALL_COLORS);
  setupFireballWrap.style.backgroundColor = fireballColor;
  fireballColorInput.value = fireballColor;
}

SETUP_USER_NAME.addEventListener('invalid', function () {
  if (SETUP_USER_NAME.validity.tooShort) {
    SETUP_USER_NAME.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (SETUP_USER_NAME.validity.tooLong) {
    SETUP_USER_NAME.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (SETUP_USER_NAME.validity.valueMissing) {
    SETUP_USER_NAME.setCustomValidity('Обязательное поле');
  } else {
    SETUP_USER_NAME.setCustomValidity('');
  }
});

SETUP_USER_NAME.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});
