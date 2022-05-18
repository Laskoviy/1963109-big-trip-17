
import { render } from '../render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
import PointInListView from '../view/pointInListView.js';
/* import AddNewPointView from '../view/addNewPointView.js'; */
import EditPoint from '../view/editPointView.js';
export default class BoardPresenter {
  /* boardComponent = new BoardView();
  eventListComponent = new PointInListView(); */

  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new PointInListView(); //#eventListComponent ?

  #boardPoints = [];

  init = (boardContainer, pointsModel) => {

    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    for (let i = 0; i < 1; i++) {
      /* render(new AddNewPointView(this.boardPoints[i]), this.boardContainer); */ ////может быть ошибка this.boardDestinations[i] / this.boardComponent.getElement()
      render(new EditPoint(this.#boardPoints[i]), this.#boardContainer);
    }
    /* render(new EditPoint(), this.boardComponent.getElement()); //может быть ошибка */

    for (let i = 0; i < this.#boardPoints.length; i++) {
      render(new PointInListView(this.#boardPoints[i]), this.#boardContainer); //может быть ошибка this.eventListComponent.getElement
    }

  };
}
