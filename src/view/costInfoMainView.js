import AbstractView from '../framework/view/abstract-view.js';
import { getPointOffersByType } from '../utils/event.js';

const createInfoCostTemplate = (points, offers) => {
  const totalCost = points.reduce((sum, point) => {
    const pointTypeOffers = getPointOffersByType(offers, point.type);
    const pointOffersSum = pointTypeOffers.reduce((acc, offer) => {
      if ( point.offers.includes(offer.id) ) {
        acc += offer.price;
      }
      return acc;
    }, 0);
    sum += point.basePrice + pointOffersSum;
    return sum;
  }, 0);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>`
  );
};


export default class InfoCostView extends AbstractView {
  #pointsModel = null;

  constructor(pointsModel) {
    super();
    this.#pointsModel = pointsModel;
  }

  get template() {
    return createInfoCostTemplate(this.#pointsModel ? this.#pointsModel.points : [], this.#pointsModel ? this.#pointsModel.offers : []);
  }
}
