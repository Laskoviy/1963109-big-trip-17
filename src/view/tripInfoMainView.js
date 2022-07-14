import AbstractView from '../framework/view/abstract-view.js';
import { getEventDates, sortEventDay } from '../utils/event.js';

const createInfoMainTemplate = (points) => {
  const sortedEvents = [...points];
  sortedEvents.sort(sortEventDay);

  const firstEvent = sortedEvents[0];
  const lastEvent = sortedEvents[sortedEvents.length - 1];

  const firstDestination = firstEvent ? firstEvent.destination.name : '';
  const lastDestination = lastEvent ? lastEvent.destination.name : '';
  let infoTitle = '';
  if ( sortedEvents.length > 3 ) {
    infoTitle = `${firstDestination} &mdash; ... &mdash; ${lastDestination}`;
  }
  if ( sortedEvents.length > 1 && sortedEvents.length < 3 ) {
    infoTitle = sortedEvents.map(({ destination }) => `${destination.name}`).join(' &mdash; ');
  }
  if ( sortedEvents.length === 1 ) {
    infoTitle = `${firstDestination}`;
  }

  const eventDates = getEventDates(firstEvent ? firstEvent.dateFrom : null, lastEvent ? lastEvent.dateTo : null);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${infoTitle}</h1>

      <p class="trip-info__dates">${eventDates}</p>
    </div>`
  );
};

export default class InfoMainView extends AbstractView {
  #pointsModel = null;

  constructor(pointsModel) {
    super();
    this.#pointsModel = pointsModel;
  }

  get template() {
    return createInfoMainTemplate(this.#pointsModel ? this.#pointsModel.points : []);
  }
}
