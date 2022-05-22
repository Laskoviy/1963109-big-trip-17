import { render } from '../render.js';
import CostInfoMainView from '../view/costInfoMainView.js';

import HeaderView from '../view/headerView.js';


import TripInfoMainView from '../view/tripInfoMainView.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #pointsModel = null;

  #headerComponent = new HeaderView();

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
    render(this.#headerComponent, this.#headerContainer);
    for (let i = 0; i < 1; i++) {
      render(new TripInfoMainView(this.#boardPoints[i]), this.#headerComponent.element);
    }
    for (let i = 0; i < 1; i++) {
      render(new CostInfoMainView(this.#boardPoints[i]), this.#headerComponent.element);
    }
  };
}
