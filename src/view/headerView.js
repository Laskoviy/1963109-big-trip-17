import { createElement } from '../render.js';

const createHeaderTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class HeaderView {
  #element = null;

  get template() {
    return createHeaderTemplate();
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
