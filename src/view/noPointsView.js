import { createElement } from '../render.js';

const createNoPointsTemplate = () => (
  `<p class="trip-events__msg">
  Click New Event to create your first point
  </p > `
);

export default class NoPointsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoPointsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
