import { render, RenderPosition, replace } from '../framework/render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
import PointInListView from '../view/pointInListView.js';
/* import AddNewPointView from '../view/addNewPointView.js'; */
import EditPoint from '../view/editPointView.js';
import NoPointsView from '../view/noPointsView.js';
import TripListView from '../view/tripListView.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new TripListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointsView();

  #boardPoints = [];

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  };

  //метод для сортировки
  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  //метод для отрисовки точки
  #renderPoint = (point) => {
    const pointComponent = new PointInListView(point);
    const pointEditComponent = new EditPoint(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(pointComponent, this.#pointListComponent.element);
  };

  /* #renderPoints = (from, to) => {
    this.#boardPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  }; */

  //метод для отрисовки пустого поля
  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  //метод для отрисовки списка с точками
  #renderPointList = () => {
    render(this.#pointListComponent, this.#boardComponent.element);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
    /* render(new AddNewPointView(this.#boardPoints[i]), this.#boardContainer);  */
  };

  //метод для отрисовки доски
  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);
    if (this.#boardPoints.every((point) => point.isArchive)) {//изменить на количество точек <1
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
  };
}
