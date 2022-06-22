import { BLANK_POINT, DESTINATION_NAMES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { destinations, mockOffers, pointTypes } from '../mock/structures.js';
import { getTitle, humanizePointDueDateTime } from '../utils/event.js';
import { capitalise } from '../utils/event.js';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createEditDateTemplate = (dateFrom, dateTo) => (
  `<label class="visually-hidden" for="event-start-time-1">${dateFrom}</label>
    <input class="event__input  event__input--time start" id="event-start-time-1" type="text" name="event-start-time" value=${humanizePointDueDateTime(dateFrom)}>
    —
    <label class="visually-hidden" for="event-end-time-1">${dateTo}</label>
    <input class="event__input  event__input--time end" id="event-end-time-1" type="text" name="event-end-time" value=${humanizePointDueDateTime(dateTo)}></input>`
);

const createDestinationsTemplate = (destinationS, eventDestination) => (
  `
    ${destinationS.map((destination) => `<option value="${destination}" ${destination === eventDestination ? 'selected="selected"' : ''}></option>`).join('')}
  `
);

//редактирование доступных предложений
const createEditOfferTemplate = (selectedOffers, offers) => {
  let markup = '';

  // Если массив офферов в поинте не пустой
  if (offers.length > 0) {
    offers.forEach((offer) => {
      markup +=
        `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" value="${offer.id}" name="event-offer-${offer.id}" ${selectedOffers.some((selectedOffer) => selectedOffer.id === offer.id) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            +€&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
          </div>`;
    });

    return markup;
  }

  // Если пустой, то не выводим ничего
  return '';
};

const createDestinationPhotosTemplate = (destinationPhotos) => (
  `
    ${destinationPhotos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
  `
);

const createEditPointTemplate = (point = {}) => {
  const { type, destination, dateFrom, dateTo, offers, basePrice, id } = point;
  //чтобы шаблон корректно отображался с «пустыми» данными.
  const offbasepr = basePrice !== null ? basePrice : '';
  const destinationName = destination.name !== null ? destination.name : '';
  const destinationDescription = destination.description !== null ? destination.description : '';

  const availableOffers = mockOffers.find((offer) => offer.type === type); // Доступные офферы по типу поинта
  const selectedOffers = availableOffers.offers.filter((offer) => offers.includes(offer.id)); // Офферы отфильтрованные по id
  
  const dateTemplate = createEditDateTemplate(dateFrom, dateTo);
  const destinationsTemplate = createDestinationsTemplate(DESTINATION_NAMES, destination.name);
  const destinationPhotosTemplate = createDestinationPhotosTemplate(destination.pictures);
  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${pointTypes.map((eventType) => (
      `<div class="event__type-item">
        <input id="event-type-${eventType}-${id}" class="event__type-input visually-hidden"
          type="radio" name="event-type"
          value="${eventType}"
          ${eventType === type ? 'checked' : ''}
        >
        <label class="event__type-label  event__type-label--${eventType}"
                for="event-type-${eventType}-${id}">${capitalise(eventType)}</label>
      </div>`)).join('')}
        </fieldset>
    </div>
    </div>

    <div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-list-1">
        ${type} ${getTitle(point)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-list-1" type="text" name="event-destination" value=${destinationName} list="destination-list-1">
        <datalist id="destination-list-1">
        ${destinationsTemplate}
        </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
    ${dateTemplate}
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${offbasepr}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${createEditOfferTemplate(selectedOffers, availableOffers.offers)}
      </div>
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationDescription}</p>

      <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destinationPhotosTemplate}
            </div>
    </section>
  </section>
</form>
</li>`
  );
};
export default class EditPoint extends AbstractStatefulView {

  #datepicker = null;

  constructor(point = BLANK_POINT) {
    super();
    this._state = EditPoint.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

// Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      EditPoint.parsePointToState(point),
    );
  };

  //востановленные обработчики
  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormButtonCloseHandler(this._callback.buttonClose);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler); // для кнопки отправки
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler); // для стрелочки
  };

  //обработчик формы отправки
  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseStateToPoint(this._state));
  };

  setFormButtonCloseHandler = (callback) => {
    this._callback.buttonClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formButtonCloseHandler);
  };

  #formButtonCloseHandler = () => {
    this._callback.buttonClose();
  };

  //обработчик изменения типа
  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.name !== 'event-type') {
      return;
    }

    this.updateElement({
      checkedType: evt.target.value,
      checkedOffers: []
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #setDateFromDatepicker = () => {
    if ( this._state.dateFrom ) {
      this.#datepicker = flatpickr(
        this.element.querySelector('.event__input.event__input--time.start'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler
        }
      );
    }
  };

  #setDateToDatepicker = () => {
    if ( this._state.dateTo ) {
      this.#datepicker = flatpickr(
        this.element.querySelector('.event__input.event__input--time.end'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          onChange: this.#dateToChangeHandler
        }
      );
    }
  };

  //обработчик изменения места назначения
  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    const name = evt.target.value;

    if (name === '') {
      return;
    }

    const destination = destinations.find((point) => point.name === name);

    this.updateElement({
      destination: destination,
    });
  };

  //внутренние слушатели
  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.#changeOfferHandler);
    });
    this.element.querySelector('.event__field-group--price').addEventListener('change', this.#changePriceHandler);
  };

  // метод для добавления офферов при выборе в состояние
  #changeOfferHandler = (evt) => {
    evt.preventDefault();
    let offers = [...this._state.checkedOffers];
    const offerValue = Number(evt.target.value);
    const offerIndex = offers.findIndex((offer) => offer === offerValue);
    if (offerIndex !== -1) {
      offers = [...offers.slice(0, offerIndex), ...offers.slice(offerIndex + 1, offers.length)];
    } else {
      offers.push(offerValue);
    }

    this.updateElement({
      checkedOffers: offers,
    });
  };

  #changePriceHandler = (evt) => {
    this.updateElement({ basePrice: parseInt(evt.target.value, 10) });
  };

  static parsePointToState = (point) => ({
    ...point,
    checkedType: point.type,
    checkedOffers: [...point.offers],
  });

  static parseStateToPoint = (state) => {
    const point = {
      ...state,
      type: state.checkedType,
      offers: state.checkedOffers,
    };

    return point;
  };
}

