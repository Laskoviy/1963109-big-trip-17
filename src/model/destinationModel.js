import { generateDestination } from '../mock/structures.js';

export default class DestinationsModel {
  destinations = Array.from({ length: 1 }, generateDestination);

  getDestinations = () => this.destinations;
}
