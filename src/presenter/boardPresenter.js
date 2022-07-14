import { remove, render, RenderPosition } from '../framework/render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
import NoPointsView from '../view/noPointsView.js';
import TripListView from '../view/tripListView.js';
import PointPresenter from './pointPresenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortEventDay, sortEventPrice, sortEventTime } from '../utils/event.js';
import NewPointPresenter from './newPointPresenter.js';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loadingView.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripInfoPresenter from './tripInfoPresenter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class BoardPresenter {
  #pointContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #pointComponent = new BoardView();
  #pointListComponent = new TripListView();
  #loadingComponent = new LoadingView();
  #noPointComponent = null;
  #sortComponent = null;

  #pointItemPresenter = new Map();
  #pointNewPresenter = null;
  #eventInfoPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(pointContainer, pointsModel, filterModel, siteInfoElement) {
    this.#pointContainer = pointContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new NewPointPresenter(this.#pointListComponent.element, this.#handleViewAction);
    this.#eventInfoPresenter = new TripInfoPresenter(siteInfoElement, this.#pointsModel);

    this.#pointsModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);
  }

  get points() {
    //В геттере points презентера кроме текущей сортировки учтем текущий фильтр
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {//условие, чтобы учитывалась выбранная сортировка
      case SortType.DAY:
        return filteredPoints.sort(sortEventDay);
      case SortType.TIME:
        return filteredPoints.sort(sortEventTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortEventPrice);
    }

    return filteredPoints;
  }

  init = () => {
    this.#renderPointSection();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback, this.#pointsModel);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointItemPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointItemPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointItemPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointItemPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointItemPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelPoint = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH: // - обновить часть списка (например, когда поменялось описание)
        this.#pointItemPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR: // - обновить список (например, когда задача ушла в архив)
        this.#clearPointSection();
        this.#renderPointSection();
        break;
      case UpdateType.MAJOR: // - обновить всю доску (например, при переключении фильтра)
        this.#clearPointSection({ resetSortType: true });
        this.#renderPointSection();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    pointItemPresenter.init(point, this.#pointsModel);
    this.#pointItemPresenter.set(point.id, pointItemPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointsView(this.#filterType);
    render(this.#noPointComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearPointSection = ({ resetSortType = false } = {}) => {
    this.#eventInfoPresenter.destroy();
    this.#pointNewPresenter.destroy();
    this.#pointItemPresenter.forEach((presenter) => presenter.destroy());
    this.#pointItemPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderPointSection = () => {
    render(this.#pointComponent, this.#pointContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    } else {
      this.#eventInfoPresenter.init();
    }

    this.#renderSort();
    render(this.#pointListComponent, this.#pointComponent.element);
    this.#renderPoints(points);
  };
}
