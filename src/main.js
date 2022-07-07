import { render } from './framework/render.js';
import BoardPresenter from './presenter/boardPresenter.js';
import PointsModel from './model/pointsModel.js';
import FilterModel from './model/filterModel.js';
import NewPointButtonView from './view/newPointButtonView.js';
import FilterPresenter from './presenter/filterPresenter.js';
import TripInfoMainView from './view/tripInfoMainView.js';
import CostInfoMainView from './view/costInfoMainView.js';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteInfoElement = siteMainElement.querySelector('.trip-main__trip-info');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const sitePageBodyElement = sitePageMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const pointPresenter = new BoardPresenter(sitePageBodyElement, pointsModel, filterModel); //Передадим модель фильтров в презентер доски
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
  /* newPointButtonComponent.removeAttribute('disabled'); */
};

const handleNewPointButtonClick = () => {
  pointPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
  /* newPointButtonComponent.setAttribute('disabled'); */
};

render(newPointButtonComponent, siteMainElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

render(new TripInfoMainView(pointsModel), siteInfoElement);
render(new CostInfoMainView(pointsModel), siteInfoElement);

filterPresenter.init();
pointPresenter.init();
