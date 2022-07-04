import AbstractView from '../framework/view/abstract-view.js';
import { getPointDates, humanizePointDate, sortPointDay } from '../utils/event.js';

const createInfoMainTemplate = (points) => {
  const sortedPoints = [...points];
  sortedPoints.sort(sortPointDay);

  const firstPoint = sortedPoints[0];
  const lastPoint = sortedPoints[sortedPoints.length - 1];

  const firstDestination = firstPoint ? firstPoint.destination.name : '';
  const lastDestination = lastPoint ? lastPoint.destination.name : '';
  let infoTitle = '';
  if ( sortedPoints.length > 3 ) {
    infoTitle = `${firstDestination} &mdash; ... &mdash; ${lastDestination}`;
  }
  if ( sortedPoints.length > 1 && sortedPoints.length < 3 ) {
    infoTitle = sortedPoints.map(({ destination }) => `${destination.name}`).join(' &mdash; ');
  }
  if ( sortedPoints.length === 1 ) {
    infoTitle = `${firstDestination}`;
  }

  const pointDates = getPointDates(firstPoint ? firstPoint.dateFrom : null, lastPoint ? lastPoint.dateTo : null);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${infoTitle}</h1>

      <p class="trip-info__dates">${pointDates}</p>
    </div>`
  );
};

export default class TripInfoMainView extends AbstractView {
  #pointsModel = null;

  constructor(pointsModel) {
    super();
    this.#pointsModel = pointsModel;
  }

  get template() {
    return createInfoMainTemplate(this.#pointsModel ? this.#pointsModel.points : []);
  }
}


