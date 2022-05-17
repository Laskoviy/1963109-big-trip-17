import NewEventButtonView from './view/newEventButtonView.js';
import FilterView from './view/filterView.js';
import { render } from './render.js';

import BoardPresenter from './presenter/boardPresenter.js';


/* import TripInfoMainView from './view/tripInfoMainView.js';
import CostInfoMainView from './view/costInfoMainView.js'; */

import DestinationsModel from './model/destinationModel.js';
import OffersModel from './model/offersModel.js';
import PointsModel from './model/pointsModel.js';
import HeaderPresenter from './presenter/headerPresenter.js';

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();

const headerPresenter = new HeaderPresenter();
const boardPresenter = new BoardPresenter();

const siteHeadElement = document.querySelector('.page-header');
const siteHeadInnerElement = siteHeadElement.querySelector('.page-body__container');
const siteInnerElement = siteHeadInnerElement.querySelector('.trip-main');
const siteTripMainTripInfo = siteInnerElement.querySelector('.trip-main__trip-info');
const siteDownElement = siteInnerElement.querySelector('.trip-main__trip-controls');
const siteConrtrols = siteDownElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-body__page-main');
const siteMainInnerElement = siteMainElement.querySelector('.page-body__container');

//синяя шапка
/* render(new TripInfoMainView(), siteInnerHeadElement);
render(new CostInfoMainView(), siteInnerHeadElement); */

headerPresenter.init(siteTripMainTripInfo, pointsModel);

render(new FilterView(), siteConrtrols);
render(new NewEventButtonView(), siteInnerElement);


boardPresenter.init(siteMainInnerElement, destinationsModel, offersModel, pointsModel);

