import { createElement } from '../render.js';


const createTripInfoMainTemplate = (point) => {
  const { destination } = point;
  const destname1 = destination.destinations[0].name !== null ? destination.destinations[0].name : '';
  const destname2 = destination.destinations[1].name !== null ? destination.destinations[1].name : '';

  return(
    `<div class="trip-info__main">
  <h1 class="trip-info__title">${destname1} — ${destname2}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
</div>`
  );};

export default class TripInfoMainView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}


