import { filter } from '../utils/filter.js';
//функция по генерации фильтров
export const generateFilter = (points) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(points).length,
  }),
);

/* const adForm = document.querySelector('.ad-form'); //нужно сделать поиск элемента
const mapFilters = document.querySelector('.map__filters');

//после прикрепить функцию по блокированию фильтра
export const setActiveFilter = () => {
  mapFilters.classList.remove('map__filters--disabled');

  [...mapFilters.children].forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export const setDisabledFilterForm = () => {
  mapFilters.classList.add('map__filters--disabled');
  [...mapFilters.children].forEach((element) => {
    element.setAttribute('disabled', 'true');
  });
}; */
