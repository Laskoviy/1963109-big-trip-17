import {render} from '../framework/render.js';
import CostInfoMainView from '../view/costInfoMainView.js';
import TripInfoMainView from '../view/tripInfoMainView.js';


export default class HeaderPresenter {
  #headerContainer = null;
  #pointsModel = null;
  #boardPoints = [];

  constructor(headerContainer, pointsModel) {
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  };

  #renderBoard = () => {
    if (this.#boardPoints.every((point) => point.isArchive)) { //на случай если нет точек маршрута
      this.#headerContainer.remove();
      return;
    }
    for (let i = 0; i < 1; i++) {
      render(new TripInfoMainView(this.#boardPoints[i]), this.#headerContainer);
    }
    for (let i = 0; i < 1; i++) {
      render(new CostInfoMainView(this.#boardPoints[i]), this.#headerContainer);
    }
  };
}
