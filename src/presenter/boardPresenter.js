import { remove, render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
import NoPointsView from '../view/noPointsView.js';
import TripListView from '../view/tripListView.js';
import PointPresenter from './pointPresenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPointDay, sortPointPrice, sortPointTime } from '../utils/event.js';
import AddNewPointView from '../view/addNewPointView.js';
import NewEventButtonView from '../view/newEventButtonView.js';
import { siteTripMainElement } from '../main.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #changeData = null;

  #boardComponent = new BoardView();
  #pointListComponent = new TripListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointsView();
  #addNewPointView = new AddNewPointView();
  #addNewPointViewButton = new NewEventButtonView();

  #boardPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = []; //бекап исходного массива

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
    this.#addNewPointView.setNewPointClickHandler(this.#handleNewPointClick);
    this.#addNewPointView.setFormSubmitHandler(this.#handleFormSubmit);//подключение обработчика для кнопки отправки формы
  };

  #handleModeChange = () => { //метод для изменения варианта представления точки
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFormSubmit = (point) => {//метод для обновления задачи через кнопку save
    this.#changeData(point);
    this.#removeAddNewPoint();
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
      case SortType.DAY:
        this.#boardPoints.sort(sortPointDay);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointPrice);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortPointTime);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardPoints исходный массив
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType); //сортируем задачи
    this.#clearPointList(); //очищаем список задач
    this.#renderPointList(); //отрисовываем список заного
  };

  #setDefaultSort = () => {
    this.#sortPoints(this.#currentSortType); //сортируем задачи по умолчанию
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

  #clearPointList = () => {//метод для очистки списка
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  //метод для отрисовки списка с точками
  #renderPointList = () => {
    render(this.#pointListComponent, this.#boardComponent.element);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };

  //метод для отрисовки формы создания поинта в списке
  #renderAddNewPoint = () => {
    render(this.#addNewPointView, this.#pointListComponent.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  //метод для удаления формы создания поинта в списке
  #removeAddNewPoint = () => {
    remove(this.#addNewPointView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#addNewPointViewButton.element.removeAttribute('disabled', true); //кнопка new Event становится обычной
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeAddNewPoint();
    }
  };

  //метод для отрисовки кнопки добавления нового поинта в список
  #renderAddNewPointBtn = () => {
    render(this.#addNewPointViewButton, siteTripMainElement);
  };

  #handleNewPointClick = () => {
    this.#renderAddNewPoint();
    this.#addNewPointViewButton.element.setAttribute('disabled', true); //кнопка new Event становится серой
  };

  //метод для отрисовки доски
  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);
    if (this.#boardPoints.length < 1) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#setDefaultSort();
    this.#renderPointList();
    this.#renderAddNewPointBtn();
  };
}
