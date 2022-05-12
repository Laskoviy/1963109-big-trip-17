import { createElement } from '../render.js';

const createCostInfoMainTemplate = () => (
  `  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`
);

export default class CostInfoMainView {
  getTemplate() {
    return createCostInfoMainTemplate();
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
