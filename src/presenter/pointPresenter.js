import { Mode } from '../const';
import { remove, render, replace } from '../framework/render';
import EditPoint from '../view/editPointView';
import PointInListView from '../view/pointInListView';

export default class PointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT; //по умолчанию точка будет в обычном режиме

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;
    //добавляем возможность переиспользования
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointInListView(point);
    this.#pointEditComponent = new EditPoint(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);//подключение обработчика для кнопки редактирования
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);////подключение обработчика для кнопки звездочка/избранное
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);//подключение обработчика для кнопки отправки формы

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => { //универсальный метод(для наружного использования) сброса формы на точку
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => { //метод для обновления задачи через кнопку избранное
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handleFormSubmit = (point) => {//метод для обновления задачи через кнопку save
    this.#changeData({ ...this.#point, ...point });
    this.#replaceFormToPoint();
  };
}
