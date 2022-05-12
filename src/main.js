import NewEventButtonView from './view/newEventButtonView.js';
import FilterView from './view/filterView.js';
import { render } from './render.js';

import BoardPresenter from './presenter/boardPresenter.js';


import TripInfoMainView from './view/tripInfoMainView.js';
import CostInfoMainView from './view/costInfoMainView.js';

import DestinationsModel from './model/destinationModel.js';
import OffersModel from './model/offersModel.js';
import PointsModel from './model/pointsModel.js';
/* import HeaderPresenter from './presenter/headerPresenter.js'; */

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
