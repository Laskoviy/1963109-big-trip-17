import { BLANK_POINT, POINT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { fullDate } from '../utils/event.js';
import { OFFERS } from '../mock/offers';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import { DESTINATIONS } from '../mock/destinations.js';

const createOfferTemplate = (offer, eventOffers) => {
  const prefix = offer.title.toLowerCase().replace(' ', '-');
  const checked = eventOffers.includes(offer.id) ? 'checked' : '';

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${prefix}-${offer.id}"
          type="checkbox"
          name="event-offer-${prefix}"
          value="${offer.id}"
          ${checked}
      >
      <label class="event__offer-label" for="event-offer-${prefix}-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `;
};

const createOffersTemplate = (eventTypeOffers, eventOffers) => eventTypeOffers.map((offer) => createOfferTemplate(offer, eventOffers)).join('');

const createPointTypeItemTemplate = (type, isChecked) => {
  const capitalizedValue = type[0].toUpperCase() + type.substring(1);

  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizedValue}</label>
    </div>
  `;
};

const createPointTypesTemplate = (types, eventType) => (
  `
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${types.map((type) => createPointTypeItemTemplate(type, type === eventType)).join('')}
    </fieldset>
  `
);

const createDestinationsTemplate = (destinations, eventDestination) => (
  `
    ${destinations.map((destination) => `<option value="${destination}" ${destination === eventDestination ? 'selected="selected"' : ''}></option>`).join('')}
  `
);

const createDestinationPhotosTemplate = (destinationPhotos) => (
  `
    ${destinationPhotos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
  `
);

const createEventEditTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type, isEdit } = point;

  const dateFromSlashes = fullDate(dateFrom);
  const dateToSlashes = fullDate(dateTo);

  const buttonEditTemplate = isEdit
    ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    : '';

  const pointTypeOffers =
    OFFERS.find((offer) => offer.type === type)
      ? OFFERS.find((offer) => offer.type === type).offers
      : [];
  const offersTemplate = createOffersTemplate(pointTypeOffers, offers);
  const eventTypesTemplate = createPointTypesTemplate(POINT_TYPES, type);
  const destinationNames = DESTINATIONS.map((item) => item['name']);
  const destinationsTemplate = createDestinationsTemplate(destinationNames, destination.name);
  const destinationPhotosTemplate = createDestinationPhotosTemplate(destination.pictures);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="${type !== '' ? `img/icons/${type}.png` : `img/icons/${POINT_TYPES[0]}.png`}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${eventTypesTemplate}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" required autocomplete="off">
            <datalist id="destination-list-1">
              ${destinationsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time  start" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromSlashes}" required autocomplete="off">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time  end" id="event-end-time-1" type="text" name="event-end-time" value="${dateToSlashes}" required autocomplete="off">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" step="1" name="event-price" value="${basePrice}" autocomplete="off">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          ${isEdit ? '<button class="event__reset-btn delete" type="reset">Delete</button>' : '<button class="event__reset-btn cancel" type="reset">Cancel</button>'}
          ${buttonEditTemplate}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destinationPhotosTemplate}
            </div>
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
    this._state = EditPoint.parseEventToState(point);

    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
  }

  get template() {
    return createEventEditTemplate(this._state);
  }

  setEditClickHandler = (callback) => {
    if (this.element.querySelector('.event__rollup-btn')) {
      this._callback.editClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    }
  };

  setCancelClickHandler = (callback) => {
    if (this.element.querySelector('.event__reset-btn.cancel')) {
      this._callback.editClick = callback;
      this.element.querySelector('.event__reset-btn.cancel').addEventListener('click', this.#editClickHandler);
    }
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseStateToEvent(this._state));
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (event) => {
    this.updateElement(
      EditPoint.parseEventToState(event),
    );
  };

  setDeleteClickHandler = (callback) => {
    if (this.element.querySelector('.event__reset-btn.delete')) {
      this._callback.deleteClick = callback;
      this.element.querySelector('.event__reset-btn.delete').addEventListener('click', this.#formDeleteClickHandler);
    }
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPoint.parseStateToEvent(this._state));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setCancelClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #pointTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #pointDestinationToggleHandler = (evt) => {
    evt.preventDefault();
    const targetValue = evt.target.value;
    const destinationValue = DESTINATIONS.find((destination) => destination.name === targetValue);
    this.updateElement({
      destination: destinationValue ? destinationValue : DESTINATIONS[0]
    });
  };

  #pointOffersToggleHandler = (evt) => {
    evt.preventDefault();
    const selectedOffers = this._state.offers;
    const targetValue = parseInt(evt.target.value, 10);
    if (evt.target.checked) {
      selectedOffers.push(targetValue);
    } else {
      const offerIndex = selectedOffers.indexOf(targetValue);
      if (offerIndex !== -1) {
        selectedOffers.splice(offerIndex, 1);
      }
    }
    this._setState({
      offers: selectedOffers,
    });
  };

  #pointPriceToggleHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#setDateToDatepicker();
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
    this.#setDateFromDatepicker();
  };

  #setDateFromDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('.event__input.event__input--time.start'),
      {
        allowInput: true,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler
      }
    );
  };

  #setDateToDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('.event__input.event__input--time.end'),
      {
        allowInput: true,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler
      }
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#pointTypeToggleHandler);

    this.element.querySelector('.event__field-group.event__field-group--destination')
      .addEventListener('change', this.#pointDestinationToggleHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#pointOffersToggleHandler);

    this.element.querySelector('.event__field-group.event__field-group--price')
      .addEventListener('change', this.#pointPriceToggleHandler);
  };

  static parseEventToState = (point) => ({
    ...point,
    isEdit: Object.prototype.hasOwnProperty.call(point, 'id')
  });

  static parseStateToEvent = (state) => {
    const event = { ...state };

    delete event.isEdit;

    return event;
  };
}

