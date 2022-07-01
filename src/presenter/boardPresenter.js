import { remove, render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
import NoPointsView from '../view/noPointsView.js';
import TripListView from '../view/tripListView.js';
import PointPresenter from './pointPresenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortPointDay, sortPointPrice, sortPointTime } from '../utils/event.js';
import NewPointPresenter from './newPointPresenter.js';
import { filter } from '../utils/filter.js';


export default class BoardPresenter {
  #pointContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #pointComponent = new BoardView();
  #pointListComponent = new TripListView();
  #noPointComponent = null;
  #sortComponent = null;

  #pointItemPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor(pointContainer, pointsModel, filterModel) {
    this.#pointContainer = pointContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new NewPointPresenter(this.#pointListComponent.element, this.#handleViewAction);
    //добавляем подписку на обновление модели
    this.#pointsModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);//
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);//
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);//
    }

    return filteredPoints;
  }

  init = () => {
    this.#renderPointSection();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointItemPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelPoint = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:// - обновить часть списка (например, когда поменялось описание)
        this.#pointItemPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:// - обновить список (например, когда задача ушла в архив)
        this.#clearPointSection();
        this.#renderPointSection();
        break;
      case UpdateType.MAJOR:// - обновить всю доску (например, при переключении фильтра)
        this.#clearPointSection({ resetSortType: true });
        this.#renderPointSection();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointSection();
    this.#renderPointSection();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointItemPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange);//
    pointItemPresenter.init(point);
    this.#pointItemPresenter.set(point.id, pointItemPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointsView(this.#filterType);
    render(this.#noPointComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  };

  //метод для очестки доски
  #clearPointSection = ({ resetSortType = false } = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointItemPresenter.forEach((presenter) => presenter.destroy());
    this.#pointItemPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderPointSection = () => {
    const points = this.points;
    const pointCount = points.length;

    render(this.#pointComponent, this.#pointContainer);

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#pointListComponent, this.#pointComponent.element);
    this.#renderPoints(points);
  };
}
