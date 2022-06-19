import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { destinations, mockOffers, pointTypes } from '../mock/structures.js';
import { getTitle, humanizePointDueDateTime } from '../utils/event.js';
import { capitalise } from '../utils/event.js';
const createEditDateTemplate = (dateFrom, dateTo) => (
  `<label class="visually-hidden" for="event-start-time-1">${dateFrom}</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${humanizePointDueDateTime(dateFrom)}>
    —
    <label class="visually-hidden" for="event-end-time-1">${dateTo}</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${humanizePointDueDateTime(dateTo)}></input>`
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

const createEditPointTemplate = (point = {}) => {
  const { type, destination, dateFrom, dateTo, offers, basePrice, checkedType, id } = point;
  //чтобы шаблон корректно отображался с «пустыми» данными.
  const offbasepr = basePrice !== null ? basePrice : '';
  const destinationName = destination.name !== null ? destination.name : '';
  const destinationDescription = destination.description !== null ? destination.description : '';

  const availableOffers = mockOffers.find((offer) => offer.type === checkedType); // Доступные офферы по типу поинта
  const selectedOffers = availableOffers.offers.filter((offer) => offers.find((id) => id === offer.id)); // Офферы отфильтрованные по id

  const dateTemplate = createEditDateTemplate(dateFrom, dateTo);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${checkedType ? checkedType : type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${pointTypes.map((eventType) => (
      `<div class="event__type-item">
                          <input id="event-type-${eventType}-${id}"
                                 class="event__type-input  visually-hidden" type="radio" name="event-type"
                                 value="${eventType}"
                                 ${eventType === type && 'checked'}>
                          <label class="event__type-label  event__type-label--${eventType}"
                                 for="event-type-${eventType}-${id}">${capitalise(eventType)}</label>
      </div>`)).join('')}
        </fieldset>
    </div>
    </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for=${destination}-${id}>
            ${checkedType ? checkedType : type} ${getTitle(point)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${destination}-${id}" type="text" name="event-destination" value=${destinationName} list="${destination}-${id}">
            <datalist id="${destination}-${id}">
            ${destinations.map((destination) => (`<option value="${destination.name}"></option>`)).join('')}
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
    </section>
  </section>
</form>
</li>`
  );
};
export default class EditPoint extends AbstractStatefulView {
  #point = null;

  constructor(point) {
    super();
    this._state = EditPoint.parsePointToState(point);
    this.#point = point;
    this.#setInnerHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  reset = (point) => {
    this.updateElement(
      EditPoint.parsePointToState(point),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormButtonCloseHandler(this._callback.buttonClose);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler); // для кнопки отправки
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler); // для стрелочки
  };

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

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.name !== 'event-type') {
      return;
    }

    this.updateElement({
      checkedType: evt.target.value,
      offers: [],
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.#changeOfferHandler);
    });
  };

  // метод для добавления офферов при выборе в состояние
  #changeOfferHandler = (evt) => {
    evt.preventDefault();
    let offers = [...this._state.offers];
    const offerValue = Number(evt.target.value);
    const offerIndex = offers.findIndex((offer) => offer === offerValue);
    if (offerIndex !== -1) {
      offers = [...offers.slice(0, offerIndex), ...offers.slice(offerIndex + 1, offers.length)];
    } else {
      offers.push(offerValue);
    }

    this.updateElement({
      offers: offers,
    });
  };


  static parsePointToState = (point) => ({
    ...point,
    checkedType: point.type
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    if (point.checkedType !== point.type) {
      point.type = point.checkedType;
    }
    delete point.checkedType;
    return point;
  };
}
