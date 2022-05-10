import PointInList from '../view/point-in-list-view.js';
/* import EditPoint from '../view/edit-point-view.js'; */
import { render } from '../render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import AddPoint from '../view/add-new-point-view.js';


export default class BoardPresenter {
  boardComponent = new BoardView();
  eventListComponent = new PointInList();

  init = (boardContainer, destinationsModel, offersModel, pointsModel) => {
    this.boardContainer = boardContainer;

    this.destinationsModel = destinationsModel;
    this.boardDestinations = [...this.destinationsModel.getDestinations()];

    this.offersModel = offersModel;
    this.boardOffers = [...this.offersModel.getOffers()];

    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];

    /* console.log(this.boardDestinations);
    console.log(this.boardOffers);
    console.log(this.boardPoints); */

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    for (let i = 0; i < 1; i++) {
      render(new AddPoint(this.boardPoints[i]), this.boardContainer); ////может быть ошибка this.boardDestinations[i] / this.boardComponent.getElement()
    }
    /* render(new EditPoint(), this.boardComponent.getElement()); //может быть ошибка */

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointInList(this.boardPoints[i]), this.boardContainer); //может быть ошибка this.eventListComponent.getElement
    }

  };
}
