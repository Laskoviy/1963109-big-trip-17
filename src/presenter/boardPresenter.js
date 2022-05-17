
import { render } from '../render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
import PointInListView from '../view/pointInListView.js';
/* import AddNewPointView from '../view/addNewPointView.js'; */
import EditPoint from '../view/editPointView.js';
export default class BoardPresenter {
  boardComponent = new BoardView();
  eventListComponent = new PointInListView();

  init = (boardContainer, destinationsModel, offersModel, pointsModel) => {
    this.boardContainer = boardContainer;

    this.destinationsModel = destinationsModel;
    this.boardDestinations = [...this.destinationsModel.getDestinations()];

    this.offersModel = offersModel;
    this.boardOffers = [...this.offersModel.getOffers()];

    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    for (let i = 0; i < 1; i++) {
      /* render(new AddNewPointView(this.boardPoints[i]), this.boardContainer); */ ////может быть ошибка this.boardDestinations[i] / this.boardComponent.getElement()
      render(new EditPoint(this.boardPoints[i]), this.boardContainer);
    }
    /* render(new EditPoint(), this.boardComponent.getElement()); //может быть ошибка */

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointInListView(this.boardPoints[i]), this.boardContainer); //может быть ошибка this.eventListComponent.getElement
    }

  };
}
