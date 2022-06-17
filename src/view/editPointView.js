import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { destinations, mockOffers, pointTypes } from '../mock/structures.js';
import { humanizePointDueDateTime } from '../utils/event.js';

const createDestinationsOptionsTemplate = (places) => {
  let markup = '';

  places.forEach((place) => {
    markup += `<option value="${place.name}"></option>`;
  });

  return markup;
};

const createTypesTemplate = (pointType) => {
  let markup = '';

  pointTypes.forEach((type) => {
    const checked = type === pointType ? 'checked' : '';

    markup += `
      <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
      </div>
    `;
  });

  return markup;
};

const createImagesTemplate = (pictures) => {
  if (pictures.length > 0) {
    let imagesMarkup = '';

    pictures.forEach((picture) => {
      imagesMarkup += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
    });

    return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${imagesMarkup}
        </div>
      </div>
    `;
  }
};

const createEditDateTemplate = (dateFrom, dateTo) => (
  `<label class="visually-hidden" for="event-start-time-1">${dateFrom}</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${humanizePointDueDateTime(dateFrom)}>
    —
    <label class="visually-hidden" for="event-end-time-1">${dateTo}</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${humanizePointDueDateTime(dateTo)}></input>`
);

//редактирование доступных предложений
export const createEditOfferTemplate = (selectedOffers, offers) => {
  let markup = '';

  // Если массив офферов в поинте не пустой
  if (offers.length > 0) {
    offers.forEach((offer) => {
      markup +=
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${selectedOffers.some((selectedOffer) => selectedOffer.id === offer.id) ? 'checked' : ''}>
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

const createEditPointTemplate = (point) => {
  const { type, destination, dateFrom, dateTo, offers, basePrice } = point;

  // Чтобы шаблон корректно отображался с «пустыми» данными.
  const offbasepr = basePrice !== null ? basePrice : '';
  const destinationName = destination.name !== null ? destination.name : '';
  const destinationDescription = destination.description !== null ? destination.description : '';
  const availableOffers = mockOffers.find((offer) => offer.type === type); // Доступные офферы по типу поинта
  const selectedOffers = availableOffers.offers.filter((offer) => offers.find((id) => id === offer.id)); // Офферы отфильтрованные по id
  const dateTemplate = createEditDateTemplate(dateFrom, dateTo);
  const images = destination ? createImagesTemplate(destination.pictures) : [];

  return (
    `<form class="event event--edit" action="#" method="post">
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
              ${createTypesTemplate(type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destinationName} list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationsOptionsTemplate(destinations)}
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
          ${images}
        </section>
      </section>
    </form>`
  );
};

export default class EditPoint extends AbstractStatefulView {
  #point = null;
  // #offers = null;
  // #filteredOffers = null;
  // #destinations = null;
  // #typeOfRadios = null;

  constructor(point) {
    super();
    this.#point = point;

    // this.#destinations = destinations;
    // this.#offers = mockOffers;
    // this.#filteredOffers = this.#filterOffers(point.type);
    // this._state = EditPoint.parsePointToState(point, this.#filteredOffers);
    // this.#typeOfRadios = Array.from(this.element.querySelectorAll('.event__type-input'));

    // this.#setComponentHandlers();
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler); // для кнопки отправки
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler); // для стрелочки
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this.#point);
  };

  #filterOffers = (type) => {
    if (type) {
      const filteredOffers = this.offers.filter((offer) => offer.type === type);

      if (filteredOffers.length > 0) {
        return filteredOffers[0].offers;
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  #setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  };

  formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPoint.parseStateToPoint(this._state));
  };

  setClickSaveHandler = (callback) => {
    this._callback.clickSave = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickSaveHandler);
  };

  #clickSaveHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickSave();
  };

  setClickDeleteHandler = (callback) => {
    this._callback.delete = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#clickDeleteHandler);
  };

  #clickDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.delete(EditPoint.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const typeRadioId = evt.target.getAttribute('for');
    const typeRadioInput = this.typeOfRadios.filter((elm) => elm.id === typeRadioId)[0];

    if (!typeRadioInput) {
      return;
    }

    const type = typeRadioInput.value;
    this.updateElement({point: {...this._state.point, type}});
    this.filteredOffers = this.#filterOffers(this.offers);
    this.updateElement({offers: this.filteredOffers});
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const newDestinationName = evt.target.value;
    const destination = this.destinations.filter((item) => item.name === newDestinationName)[0];

    this.updateElement({point: {...this._state.point, destination}});
  };

  #setComponentHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChangeHandler);
    this.element.querySelector('#event-destination-1').addEventListener('change', this.#destinationChangeHandler);
  };

  _restoreHandlers = () => {
    this.#setComponentHandlers();
    this.#setFormSubmitHandler(this._callback.submit);
    this.setClickSaveHandler(this._callback.click);
    this.setClickDeleteHandler(this._callback.delete);
  };

  reset = (point, offers) => {
    this.updateElement(EditPoint.parsePointToState(point, offers));
  };

  static parsePointToState = (point, offers) => ({point: {...point}, offers: [...offers]});

  static parseStateToPoint = (state)=>{
    const point = {...state};

    return point;
  };
}
