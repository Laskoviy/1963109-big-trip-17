import { generateOffer } from '../mock/structures.js';

export default class OffersModel {
  offers = Array.from({ length: 1 }, generateOffer);

  getOffers = () => this.offers;
}
