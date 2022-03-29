const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

// Смена состояния формы
const setFormInactive = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
};

const setFormActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
};

// Настройки Pristine
const pristine = new Pristine(adForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

// Валидация для заголовка объявления
const titleField = adForm.querySelector('[name="title"]');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleFieldError = `От ${MIN_TITLE_LENGTH} до ${MAX_TITLE_LENGTH} символов`;

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(titleField, validateTitle, titleFieldError);

// Валидация для цены объявления
const priceField = adForm.querySelector('[name="price"]');
const MIN_PRICE = 1;
const MAX_PRICE = 100000;
const priceFieldError = `Число от ${MIN_PRICE} до ${MAX_PRICE}`;

const validatePrice = (value) => value >= MIN_PRICE && value <= MAX_PRICE;

pristine.addValidator(priceField, validatePrice, priceFieldError);

// Валидация для количества комнат и мест
const roomsOption = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');

const validateRooms = () => roomsOption[roomsField.value].includes(capacityField.value);

const getRoomsErrorMessage = () => {
  switch (roomsField.value) {
    case '1':
      return '1 комната только для 1 гостя';
    case '2':
      return '2 комнаты только от 1 до 2 гостей';
    case '3':
      return '3 комнаты только от 1 до 3 гостей';
    case '100':
      return '100 комнат не для гостей';
  }
};

capacityField.addEventListener('change', () => {
  pristine.validate(roomsField);
});

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);

// Отправка формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

setFormInactive();
export {setFormActive};
