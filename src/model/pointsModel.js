import { generatePoint } from '../mock/structures.js';

export default class PointsModel {
  #points = Array.from({ length: 6 }, generatePoint);

  get points() {
    return this.#points;
  }
}

