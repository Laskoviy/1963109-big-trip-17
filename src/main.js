import FilterView from './view/filterView.js';
import { render } from './framework/render.js';
import BoardPresenter from './presenter/boardPresenter.js';

import PointsModel from './model/pointsModel.js';
import HeaderPresenter from './presenter/headerPresenter.js';
import { generateFilter } from './mock/filter.js';


export const pointsModel = new PointsModel(); //обьект с массивом поинтов
const filters = generateFilter(pointsModel.points);

const sitePageHeaderElement = document.querySelector('.page-header');
const sitePageHeaderContainerElement = sitePageHeaderElement.querySelector('.page-header__container');
export const siteTripMainElement = sitePageHeaderContainerElement.querySelector('.trip-main');
export const siteTripMainTripInfoElement = siteTripMainElement.querySelector('.trip-main__trip-info');
const siteDownElement = siteTripMainElement.querySelector('.trip-main__trip-controls');
const siteControls = siteDownElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-body__page-main');
const siteMainInnerElement = siteMainElement.querySelector('.page-body__container');

const headerPresenter = new HeaderPresenter(siteTripMainTripInfoElement, pointsModel);
const boardPresenter = new BoardPresenter(siteMainInnerElement, pointsModel);

headerPresenter.init();

render(new FilterView(filters), siteControls);

boardPresenter.init();
