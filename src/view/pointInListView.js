import dayjs from 'dayjs';

import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDueDate, humanizePointDueTime } from '../utils/event.js';

const createPointInListTemplate = (point) => {
  const { type, destination, dateFrom, dateTo, basePrice, offers, isFavorite } = point;
  const destinationName = destination.name !== null ? destination.name : '';
  const date1 = dateFrom !== null ? humanizePointDueTime(dateFrom) : '';
  const date2 = dateTo !== null ? humanizePointDueTime(dateTo) : '';

  //функция по вычитанию времени
  const timeDiff = (start, end) => {
    const durationTime = dayjs(end).diff(dayjs(start));
    return `${dayjs(durationTime).hour()}H:${dayjs(durationTime).minute()}M`;
  };

  const duration = timeDiff(dateTo, dateFrom);
  const eventDate = humanizePointDueDate(dateFrom);

  return (
    `<li class="trip-events__item">
    <div class="event">
            <time class="event__date" datetime="2019-03-18">${eventDate}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type} ${destinationName}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T10:30">${date1}</time>
                —
                <time class="event__end-time" datetime="2019-03-18T11:00">${date2}</time>
              </p>
              <p class="event__duration">${duration}</p>
            </div>
            <p class="event__price">
              €&nbsp;<span class="event__price-value">${basePrice}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              <li class="event__offer">
                <span class="event__offer-title">${offers.offers[0].title} </span>
                +€&nbsp${offers.offers[0].price}<br>
                <span class="event__offer-price">${offers.offers[1].title}</span>
                +€&nbsp${offers.offers[1].price}
              </li>
            </ul>
            <button class="event__favorite-btn event__favorite-btn--${isFavorite ? 'active' : ''}" type="button">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
              </svg>
            </button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
          </li>`
  );
};

export default class PointInListView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointInListTemplate(this.#point);
  }

  setEditClickHandler = (callback) => { //определяем сеттер(метод) для колбека который вызываем при нажатии на галочку
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => { //определяем сеттер(метод) для колбека который вызываем при нажатии на звездочку
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

}

