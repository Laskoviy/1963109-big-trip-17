
import { render } from '../render.js';
import BoardView from '../view/boardView.js';
import SortView from '../view/sortView.js';
import PointInListView from '../view/pointInListView.js';
import TripEventsListView from '../view/tripEventsListView.js';
/* import AddNewPointView from '../view/addNewPointView.js'; */
import EditPoint from '../view/editPointView.js';
export default class BoardPresenter {
  /* boardComponent = new BoardView();
  eventListComponent = new PointInListView(); */

  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new TripEventsListView(); //#eventListComponent ?

  #boardPoints = [];

  init = (boardContainer, pointsModel) => {

    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#pointListComponent, this.#boardComponent.element);
    /*  for (let i = 0; i < 1; i++) {
      render(new EditPoint(this.#boardPoints[i]), this.#boardContainer);
    } */

    /* render(new AddNewPointView(this.#boardPoints[i]), this.#boardContainer);  ////может быть ошибка  this.#boardComponent.element */
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
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

    pointEditComponent.element.querySelector('.event__save-btn').addEventListener('click', (evt) => { //заменил submit на click так как не работает отвена дефолтного события! а
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(pointComponent, this.#pointListComponent.element);
  };
}
