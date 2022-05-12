import { render } from '../render.js';

import HeaderView from '../view/headerView.js';
import TripInfoMainView from '../view/trip-info-header-view.js';
import CostInfoMainView from '../view/test_price-view.js';

export default class HeaderPresenter {
  headerComponent = new HeaderView();


  init = (headerContainer, pointsModel) => {
    this.headerContainer = headerContainer;

    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];


    render(this.headerComponent, this.headerContainer);
    for (let i = 0; i < 1; i++) {
      render(new TripInfoMainView(this.boardPoints[i]), this.headerComponent.getElement());
    }
    for (let i = 0; i < 1; i++) {
      render(new CostInfoMainView(this.boardPoints[i]), this.headerComponent.getElement());
    }

  };
}
