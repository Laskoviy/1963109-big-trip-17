import { createElement } from '../render.js';

const createHeaderTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class HeaderView {
  getTemplate() {
    return createHeaderTemplate();
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
