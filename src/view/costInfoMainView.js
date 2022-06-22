import AbstractView from '../framework/view/abstract-view.js';

const createCostInfoMainTemplate = (pointsModel) => {

  //функция для подсчета суммы
  function sumPrice() {
    let sum = 0;
    for (let i = 0; i <arguments.length; i++) {
      sum += arguments[i].basePrice;
    }
    return sum;
  }

  const totalPrice = sumPrice.apply(null, pointsModel.points);
  return (
    `  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`);
};

export default class CostInfoMainView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    if (this.#points) {
      return createCostInfoMainTemplate(this.#points);
    } else {
      return '<div></div>';
    }
  }
}
