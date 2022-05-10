import NewEventButtonView from './view/new-event-button-view.js';
import FilterView from './view/filter-view.js';
import { render } from './render.js';

import BoardPresenter from './presenter/board-presenter.js';

/* import BoardView from './view/board-view.js';
import PointInList from './view/point-in-list-view.js'; */
import TripInfoMainView from './view/trip-info-header-view.js';
import CostInfoMainView from './view/test_price-view.js';

import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
/* import HeaderPresenter from './presenter/header-presenter.js'; */

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter();

/* const headerPresenter = new HeaderPresenter(); */


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


render(new FilterView(), siteDownElement);
render(new NewEventButtonView(), siteInnerElement);

/* headerPresenter.init(siteInnerHeadElement, pointsModel); */
boardPresenter.init(siteMainInnerElement, destinationsModel, offersModel, pointsModel);
