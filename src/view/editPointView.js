import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDueDateTime } from '../utils/event.js';

/* const BLANK_POINT = {
  basePrice: 222,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: null,
  type: ''
}; */

const createEditDateTemplate = (dateFrom, dateTo) => (
  `<label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${humanizePointDueDateTime(dateFrom)}>
    —
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${humanizePointDueDateTime(dateTo)}></input>`
);

/* const createEditOfferTemplate = () =>(
  `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offtitle1}</span>
            +€&nbsp;
            <span class="event__offer-price">${offprice1}</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked="">
          <label class="event__offer-label" for="event-offer-comfort-1">
            <span class="event__offer-title">${offtitle2}</span>
            +€&nbsp;
            <span class="event__offer-price">${offprice2}</span>
          </label>
        </div>`
); */

const createEditPointTemplate = (point) => {
  const { type, destination, dateFrom, dateTo, basePrice } = point;
  //чтобы шаблон корректно отображался с «пустыми» данными.
  /* const offtitle1 = offers.offers[0].title !== null ? offers.offers[0].title : '';
  const offprice1 = offers.offers[0].price !== null ? offers.offers[0].price : '';
  const offtitle2 = offers.offers[1].title !== null ? offers.offers[1].title : '';
  const offprice2 = offers.offers[1].price !== null ? offers.offers[1].price : ''; */
  const offbasepr = basePrice !== null ? basePrice : '';
  const destinationName = destination.name !== null ? destination.name : '';
  const destinationDescription = destination.description !== null ? destination.description : '';

  const dateTemplate = createEditDateTemplate(dateFrom, dateTo);
  /* const offerTemplate = createEditOfferTemplate(); */
  /* //отрисовка
  const pointTypeOffeR = offers
    .find((offer) => offer.type === point.type);

  pointTypeOfferR.offers
    .map((offer) => '<input type= "checkbox"/>');

  //отрисовать и отметить
  const pointTypeOffer = offers
    .find((offer) => offer.type === point.type);

  pointTypeOffer.offers
    .map((offer) => {
      const checked = point.offers.includes(offer.id) ? 'checked' : '';

      return `<input type= "checkbox" ${checked} />`;
    }); */

  return (
    `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destinationName} list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
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
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title"></span>
            +€&nbsp;
            <span class="event__offer-price"></span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked="">
          <label class="event__offer-label" for="event-offer-comfort-1">
            <span class="event__offer-title"></span>
            +€&nbsp;
            <span class="event__offer-price"></span>
          </label>
        </div>
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationDescription}</p>
    </section>
  </section>
</form>`
  );
};
export default class EditPoint extends AbstractStatefulView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
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

}
