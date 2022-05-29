import NewEventButtonView from './view/newEventButtonView.js';
import FilterView from './view/filterView.js';
import { render } from './framework/render.js';
import BoardPresenter from './presenter/boardPresenter.js';

import PointsModel from './model/pointsModel.js';
import HeaderPresenter from './presenter/headerPresenter.js';
import { generateFilter } from './mock/filter.js';


const pointsModel = new PointsModel();

const siteHeadElement = document.querySelector('.page-header');
const siteHeadInnerElement = siteHeadElement.querySelector('.page-body__container');
const siteInnerElement = siteHeadInnerElement.querySelector('.trip-main');
const siteTripMainTripInfo = siteInnerElement.querySelector('.trip-main__trip-info');
const siteDownElement = siteInnerElement.querySelector('.trip-main__trip-controls');
const siteControls = siteDownElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-body__page-main');
const siteMainInnerElement = siteMainElement.querySelector('.page-body__container');

const headerPresenter = new HeaderPresenter(siteTripMainTripInfo, pointsModel);
const boardPresenter = new BoardPresenter(siteMainInnerElement, pointsModel);

const filters = generateFilter(pointsModel.points);

headerPresenter.init();

render(new FilterView(filters), siteControls);
render(new NewEventButtonView(), siteInnerElement);

boardPresenter.init();

