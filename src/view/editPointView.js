import { BLANK_POINT, DESTINATION_NAMES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { destinations, mockOffers, pointTypes } from '../mock/structures.js';
import { getRandomInteger, getRandomItem } from '../utils/common.js';
import { getTitle, humanizePointDueDateTime } from '../utils/event.js';
import { capitalise } from '../utils/event.js';
const createEditDateTemplate = (dateFrom, dateTo) => (
  `<label class="visually-hidden" for="event-start-time-1">${dateFrom}</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${humanizePointDueDateTime(dateFrom)}>
    —
    <label class="visually-hidden" for="event-end-time-1">${dateTo}</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${humanizePointDueDateTime(dateTo)}></input>`
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

const createEditPointTemplate = (point = {}) => {
  const { type, destination, dateFrom, dateTo, offers, basePrice, checkedType, id } = point;
  //чтобы шаблон корректно отображался с «пустыми» данными.
  const offbasepr = basePrice !== null ? basePrice : '';
  const destinationName = destination.name !== null ? destination.name : '';
  const destinationDescription = destination.description !== null ? destination.description : '';

  const availableOffers = mockOffers.find((offer) => offer.type === checkedType); // Доступные офферы по типу поинта
  const selectedOffers = availableOffers.offers.filter((offer) => offers.find((Offerid) => Offerid === offer.id)); // Офферы отфильтрованные по id

  const dateTemplate = createEditDateTemplate(dateFrom, dateTo);
  const destinationsTemplate = createDestinationsTemplate(DESTINATION_NAMES, destination.name);
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
      <label class="event__label  event__type-output" for="event-destination-list-1">
        ${checkedType ? checkedType : type} ${getTitle(point)}
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
    </section>
  </section>
</form>
</li>`
  );
};
export default class EditPoint extends AbstractStatefulView {

  constructor(point = BLANK_POINT) {
    super();
    this._state = EditPoint.parsePointToState(point);
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

  //востановленные обработчики
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

  /* #eventDestinationToggleHandler = (evt) => {
    evt.preventDefault();
    //Когда выбираем пункт назначения в выпадающем списке, то там есть только название name, поэтому для description и pictures сделал случайное формирование заново
    this.updateElement({
      destination: {
        description: getRandomItem(destinations).description,
        name: evt.target.value,
        pictures: [
          {
            src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
            description: getRandomItem(destinations).description
          },
          {
            src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
            description: getRandomItem(destinations).description
          },
          {
            src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
            description: getRandomItem(destinations).description
          },
          {
            src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
            description: getRandomItem(destinations).description
          },
          {
            src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`,
            description: getRandomItem(destinations).description
          }
        ]
      }
    });
  }; */


  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.name !== 'event__input  event__input--destination') {
      return;
    }

    this.updateElement({
      checkedDestination: evt.target.value,
      offers: [],
    });
  };

  //внутренние слушатели
  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__field-group.event__field-group--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.#changeOfferHandler);
      checkbox.addEventListener('change', this.#changeDestinationInfoHandler);
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

  // метод для добавления описания и фотографий при выборе в места
  #changeDestinationInfoHandler = (evt) => {
    evt.preventDefault();
    let destinationS = [...this._state.destination];
    const destinationValue = Number(evt.target.value);
    const destinationIndex = destinationS.findIndex((destination) => destination === destinationValue);
    if (destinationIndex !== -1) {
      destinationS = [...destinationS.slice(0, destinationIndex), ...destinationS.slice(destinationIndex + 1, destinationS.length)];
    } else {
      destinationS.push(destinationValue);
    }

    this.updateElement({
      destination: destinationS,
    });
  };


  static parsePointToState = (point) => ({
    ...point,
    checkedType: point.type,
    checkedDestination: point.destination.name
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    if (point.checkedType !== point.type) {
      point.type = point.checkedType;
    }
    delete point.checkedType;

    if (point.checkedDestination !== point.destination.name) {
      point.destination.name = point.checkedDestination;
    }
    delete point.checkedDestination;

    return point;
  };
}
