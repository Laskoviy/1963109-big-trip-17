import { render } from './framework/render.js';
import BoardPresenter from './presenter/boardPresenter.js';
import PointsModel from './model/pointsModel.js';
import FilterModel from './model/filterModel.js';
import NewPointButtonView from './view/newPointButtonView.js';
import FilterPresenter from './presenter/filterPresenter.js';
import PointsApiService from './view/pointApiService.js';

const AUTHORIZATION = 'Basic ekIyu26ddDDguPXj';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteInfoElement = siteMainElement.querySelector('.trip-main__trip-info');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const sitePageBodyElement = sitePageMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const pointPresenter = new BoardPresenter(sitePageBodyElement, pointsModel, filterModel, siteInfoElement);

const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  pointPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

filterPresenter.init();
pointPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteMainElement);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
