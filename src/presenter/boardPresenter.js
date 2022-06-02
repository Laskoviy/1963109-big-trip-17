import { render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
/* import AddNewPointView from '../view/addNewPointView.js'; */
import NoPointsView from '../view/noPointsView.js';
import TripListView from '../view/tripListView.js';
import PointPresenter from './pointPresenter.js';
import { updateItem } from '../utils/common.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new TripListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointsView();

  #boardPoints = [];
  #pointPresenter = new Map();

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  };

  #handleModeChange = () => { //метод для изменения варианта представления точки
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  //метод для изменения/обновления точки
  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  //метод для сортировки
  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  //метод для отрисовки точки
  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange); //создаем экземпляр презентера точки
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);//добавляем презентер точки в новую коллекцию(Map)
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

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
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
    if (this.#boardPoints.length < 1) {//правильно??
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
  };
}
