import AbstractView from '../framework/view/abstract-view.js';

const createHeaderTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class HeaderView extends AbstractView{
  get template() {
    return createHeaderTemplate();
  }
}
