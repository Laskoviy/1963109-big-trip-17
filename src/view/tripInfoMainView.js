import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDueDate } from '../utils/event.js';

const createTripInfoMainTemplate = (pointsModel) => {
  /* const { destination, dateFrom } = point;
  const destinationName = destination.name !== null ? destination.name : '';
  const eventDate = humanizePointDueDate(dateFrom);
 */

  const sortedArr = pointsModel.sort((a, b) => {
    if (a.dateFrom > b.dateFrom) {
      return 1;
    }
    if (a.dateFrom < b.dateFrom) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });


  const startTripDate = humanizePointDueDate(sortedArr[0].dateFrom);
  const endTripDate = humanizePointDueDate(sortedArr[sortedArr.length - 1].dateTo);


  return (
    `<div class="trip-info__main">
  <h1 class="trip-info__title">  —  </h1>

  <p class="trip-info__dates">${startTripDate}&nbsp;—&nbsp;${endTripDate}</p>
</div>`
  );
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


