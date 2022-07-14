import { remove, render } from '../framework/render.js';
import InfoCostView from '../view/costInfoMainView.js';
import TripInfoMainView from '../view/tripInfoMainView.js';

export default class TripInfoPresenter {
  #infoMainComponent = null;
  #infoCostComponent = null;
  #elementContainer = null;
  #pointsModel = null;

  constructor(elementContainer, pointsModel) {
    this.#elementContainer = elementContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#infoMainComponent = new TripInfoMainView(this.#pointsModel);
    this.#infoCostComponent = new InfoCostView(this.#pointsModel);

    render(this.#infoMainComponent, this.#elementContainer);
    render(this.#infoCostComponent, this.#elementContainer);};

  destroy = () => {
    remove(this.#infoMainComponent);
    remove(this.#infoCostComponent);
  };
}
