import { createElement } from '../render.js';


const createTripInfoMainTemplate = (point) => {
  const { destination } = point;
  const destname1 = destination.destinations[0].name !== null ? destination.destinations[0].name : '';
  const destname2 = destination.destinations[1].name !== null ? destination.destinations[1].name : '';

  return (
    `<div class="trip-info__main">
  <h1 class="trip-info__title">${destname1} — ${destname2}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
</div>`
  );
};

export default class TripInfoMainView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get template() {
    if (this.#point) {
      return createTripInfoMainTemplate(this.#point);
    } else {
      return '<div></div>';
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}


