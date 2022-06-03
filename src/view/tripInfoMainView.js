import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDueDate } from '../utils/event.js';

const createTripInfoMainTemplate = (point) => {
  const { destination, dateFrom } = point;
  const destinationName = destination.name !== null ? destination.name : '';
  const eventDate = humanizePointDueDate(dateFrom);

  return (
    `<div class="trip-info__main">
  <h1 class="trip-info__title">${destinationName} — ${destinationName}</h1>

  <p class="trip-info__dates">${eventDate}&nbsp;—&nbsp;20</p>
</div>`
  );
};


export default class TripInfoMainView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    if (this.#point) {
      return createTripInfoMainTemplate(this.#point);
    } else {
      return '<div></div>';
    }
  }
}


