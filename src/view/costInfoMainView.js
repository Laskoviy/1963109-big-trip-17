import AbstractView from '../framework/view/abstract-view.js';


const createCostInfoMainTemplate = (point) => {
  const { basePrice } = point;
  const totalPrice = basePrice * 3; //нужно исправлять...
  return(
    `  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`);
};

export default class CostInfoMainView extends AbstractView{
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createCostInfoMainTemplate(this.#point);
  }
}
