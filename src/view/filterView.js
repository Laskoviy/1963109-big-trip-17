import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const { name } = filter;
  //в случае отсутствия данных по фильтру, он блокируется от выбора нужно придумать как реализовать
  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="everything" ${isChecked ? 'checked' : ''}
      />
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
     </div>`
  );
};

const createFilterItemTemplateDisabled = (filter, isChecked) => {
  const { name } = filter;
  //в случае отсутствия данных по фильтру, он блокируется от выбора нужно придумать как реализовать
  return (
    `<div class="trip-filters__filter">
      <input
      id="filter-${name}" disabled
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="everything" ${isChecked ? 'checked' : ''}
      />
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
     </div>`
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

const createFilterTemplateDisabled = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplateDisabled(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    if (this.#filters.count<1) {
      return createFilterTemplateDisabled(this.#filters);
    } else {
      return createFilterTemplate(this.#filters);
    }
  }
}
