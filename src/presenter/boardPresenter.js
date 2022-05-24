
import { render } from '../render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
import PointInListView from '../view/pointInListView.js';
import TripEventsListView from '../view/tripEventsListView.js';
/* import AddNewPointView from '../view/addNewPointView.js'; */
import EditPoint from '../view/editPointView.js';
import NoPointsView from '../view/noPointsView.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new TripEventsListView();

  #boardPoints = [];

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  };

  #renderPoint = (point) => {
    const pointComponent = new PointInListView(point);
    const pointEditComponent = new EditPoint(point);

    const replacePointToForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(pointComponent, this.#pointListComponent.element);
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardPoints.every((point) => point.isArchive)) {
      render(new NoPointsView(), this.#boardComponent.element);
      return;
    }
    render(new SortView(), this.#boardComponent.element);
    render(this.#pointListComponent, this.#boardComponent.element);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
    /* render(new AddNewPointView(this.#boardPoints[i]), this.#boardContainer);  */
  };

}
