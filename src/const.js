const THOUSAND = 1000;
const SIXTY = 60;

//варианты фильтрации
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

//варианты сортировки
const SortType = {
  DAY: 'day', //default
  TIME: 'time',
  PRICE: 'price',
};

const BLANK_POINT = {
  basePrice: 222,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: null,
  type: ''
};

//варианты в которых может находиться точка маршрута
const Mode = {
  DEFAULT: 'DEFAULT', //обычный
  EDITING: 'EDITING', //редактирование
};

export { THOUSAND, SIXTY, FilterType, SortType, BLANK_POINT, Mode };
