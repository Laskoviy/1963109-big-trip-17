import NewEventButtonView from './view/new-event-button-view.js';
import FilterView from './view/filter-view.js';
import { render } from './render.js';

import BoardPresenter from './presenter/board-presenter.js';

/* import BoardView from './view/board-view.js';
import PointInList from './view/point-in-list-view.js'; */
import TripInfoMainView from './view/trip-info-header-view.js';
import CostInfoMainView from './view/test_price-view.js';

const boardPresenter = new BoardPresenter();


const siteHeadElement = document.querySelector('.page-header');
const siteHeadInnerElement = siteHeadElement.querySelector('.page-header__container');
const siteInnerElement = siteHeadInnerElement.querySelector('.trip-main');
const siteInnerHeadElement = siteInnerElement.querySelector('.trip-main__trip-info');
const siteDownElement = siteInnerElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-body__page-main');
const siteMainInnerElement = siteMainElement.querySelector('.page-body__container');


//синяя шапка
render(new TripInfoMainView(), siteInnerHeadElement);
render(new CostInfoMainView(), siteInnerHeadElement);
render(new NewEventButtonView(), siteInnerElement);
render(new FilterView(), siteDownElement);


boardPresenter.init(siteMainInnerElement);
