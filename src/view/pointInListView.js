import { SIXTY, THOUSAND } from '../const.js';
import { createElement } from '../render.js';
import { getRandomInteger, humanizeTaskDueDate, humanizeTaskDueTime } from '../utils.js';

const createPointInListTemplate = (point) => {
  const { type, destination, dateFrom, dateTo, basePrice, offers, isFavorite } = point;

  const date1 = dateFrom !== null ? humanizeTaskDueTime(dateFrom) : '';
  const date2 = dateTo !== null ? humanizeTaskDueTime(dateTo) : '';

  //генерация рандомного места
  const randomIndex = getRandomInteger(0, destination.destinations.length - 1);
  const dest = destination.destinations[randomIndex];

  //функция по вычитанию времени взял из интернета

  const startDate = humanizeTaskDueTime(dateFrom);
  const endDate = humanizeTaskDueTime(dateTo);

  const timeDiff = (start, end) => {
    start = start.split(':');
    end = end.split(':');
    const startDateS = new Date(0, 0, 0, start[0], start[1], 0);
    const endDateS = new Date(0, 0, 0, end[0], end[1], 0);
    let dif = endDateS.getTime() - startDateS.getTime();
    let hours = Math.floor(dif / THOUSAND / SIXTY / SIXTY);
    dif -= hours * THOUSAND * SIXTY * SIXTY;
    const minutes = Math.floor(dif / THOUSAND / SIXTY);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) { hours = hours + 24; }


    return `${(hours <= 9 ? '0' : '') + hours}H:${minutes <= 9 ? '0' : ''}${minutes}M`;
  };

  const duration = timeDiff(startDate, endDate);
  const eventDate = humanizeTaskDueDate(dateFrom);

  return (
    `<div class="event">
            <time class="event__date" datetime="2019-03-18">${eventDate}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type} ${dest.name}</h3>
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
            <button class="event__favorite-btn event__favorite-btn--${isFavorite}" type="button">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
              </svg>
            </button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>`
  );
};

export default class PointInListView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointInListTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

