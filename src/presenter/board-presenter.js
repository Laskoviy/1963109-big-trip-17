import PointInList from '../view/point-in-list-view';
import EditPoint from '../view/edit-point-view';
import { render } from '../render.js';
import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view';
import AddPoint from '../view/add-new-point-view';


export default class BoardPresenter {
  boardComponent = new BoardView();
  eventListComponent = new PointInList();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(new EditPoint(), this.boardComponent.getElement());
    render(new AddPoint(), this.boardComponent.getElement());


    for (let i = 0; i < 3; i++) {
      render(new PointInList(), this.boardContainer);
    }

  };
}
