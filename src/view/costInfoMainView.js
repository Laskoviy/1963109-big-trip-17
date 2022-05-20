import { createElement } from '../render.js';

const createCostInfoMainTemplate = () => (
  `  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`
);

export default class CostInfoMainView {
  #element = null;
  get template() {
    return createCostInfoMainTemplate();
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
