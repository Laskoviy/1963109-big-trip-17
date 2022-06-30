import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDate } from '../utils/event.js';

const createTripInfoMainTemplate = (pointsModel) => {


  const sortedArr = pointsModel.points.sort((a, b) => {
    if (a.dateFrom > b.dateFrom) {
      return 1;
    }
    if (a.dateFrom < b.dateFrom) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });

  const startTripDate = humanizePointDate(sortedArr[0].dateFrom);
  const endTripDate = humanizePointDate(sortedArr[sortedArr.length - 1].dateTo);
  const firstDest = sortedArr[0].destination.name;
  const lastDest = sortedArr[sortedArr.length - 1].destination.name;
  return (`
    <div class="trip-info__main">
      <h1 class="trip-info__title"> ${firstDest} —...— ${lastDest} </h1>
      <p class="trip-info__dates">${startTripDate}&nbsp;—&nbsp;${endTripDate}</p>
    </div>
  `);

};

export default class TripInfoMainView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    if (this.#point) {
      return createTripInfoMainTemplate(this.#point);
    } else {
      return '<div></div>';
    }
  }
}


