import { render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
/* import AddNewPointView from '../view/addNewPointView.js'; */
import NoPointsView from '../view/noPointsView.js';
import TripListView from '../view/tripListView.js';
import PointPresenter from './pointPresenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new TripListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointsView();

  #boardPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  };

  #handleModeChange = () => { //метод для изменения варианта представления точки
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  //метод для изменения/обновления точки
  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardPoints
    switch (sortType) {
      case SortType.DATE_UP://исправить
        this.#boardPoints.sort(sortTaskUp); //исправить
        break;
      case SortType.DATE_DOWN://исправить
        this.#boardPoints.sort(sortTaskDown);//исправить
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  };

  //метод для сортировки
  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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
    if (this.#boardPoints.length < 1) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointList();
  };
}
