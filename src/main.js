import NewEventButtonView from './view/newEventButtonView.js';
import FilterView from './view/filterView.js';
import { render } from './render.js';

import BoardPresenter from './presenter/boardPresenter.js';


/* import TripInfoMainView from './view/tripInfoMainView.js';
import CostInfoMainView from './view/costInfoMainView.js'; */


import PointsModel from './model/pointsModel.js';
import HeaderPresenter from './presenter/headerPresenter.js';


const pointsModel = new PointsModel();

const siteHeadElement = document.querySelector('.page-header');
const siteHeadInnerElement = siteHeadElement.querySelector('.page-body__container');
const siteInnerElement = siteHeadInnerElement.querySelector('.trip-main');
const siteTripMainTripInfo = siteInnerElement.querySelector('.trip-main__trip-info');
const siteDownElement = siteInnerElement.querySelector('.trip-main__trip-controls');
const siteConrtrols = siteDownElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-body__page-main');
const siteMainInnerElement = siteMainElement.querySelector('.page-body__container');

const headerPresenter = new HeaderPresenter(siteTripMainTripInfo, pointsModel);
const boardPresenter = new BoardPresenter(siteMainInnerElement, pointsModel);


headerPresenter.init();

render(new FilterView(), siteConrtrols);
render(new NewEventButtonView(), siteInnerElement);

boardPresenter.init();

