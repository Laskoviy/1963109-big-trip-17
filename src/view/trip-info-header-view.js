import { createElement } from '../render.js';

const createTripInfoMainTemplate = () => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>
    <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
  </div>`
);

export default class TripInfoMainView {
  getTemplate() {
    return createTripInfoMainTemplate();
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


