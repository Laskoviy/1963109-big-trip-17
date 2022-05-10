import { generateOffer } from '../mock/strucktures.js';

export default class OffersModel {
  offers = Array.from({ length: 1 }, generateOffer);

  getOffers = () => this.offers;
}
