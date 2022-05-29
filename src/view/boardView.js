import AbstractView from '../framework/view/abstract-view.js';

const createBoardTemplate = () => '<section class="trip-events"><h2 class="visually-hidden">Trip events</h2></section>';

export default class BoardView extends AbstractView {
  get template() {
    return createBoardTemplate();
  }
}
