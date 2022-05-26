import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoMainTemplate = (point) => {
  const { destination } = point;
  const destname1 = destination.destinations[0].name !== null ? destination.destinations[0].name : '';
  const destname2 = destination.destinations[1].name !== null ? destination.destinations[1].name : '';

  return (
    `<div class="trip-info__main">
  <h1 class="trip-info__title">${destname1} — ${destname2}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
</div>`
  );
};

export default class TripInfoMainView extends AbstractView{
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


