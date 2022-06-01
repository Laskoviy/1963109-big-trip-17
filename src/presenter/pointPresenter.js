import { remove, render, replace } from '../framework/render';
import EditPoint from '../view/editPointView';
import PointInListView from '../view/pointInListView';

export default class PointPresenter {

  #pointListContainer = null;
  #changeData = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
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

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
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

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  };
}
