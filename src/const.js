const THOUSAND = 1000;
const SIXTY = 60;

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  isFavorite: false,
  offers: [],
  type: ''
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

//варианты в которых может находиться точка маршрута
const Mode = {
  DEFAULT: 'DEFAULT', //обычный
  EDITING: 'EDITING', //редактирование
};

const DESTINATION_NAMES = ['Amsterdam', 'Chamonix', 'Geneva'];

export { POINT_TYPES, UpdateType, UserAction, DESTINATION_NAMES, THOUSAND, SIXTY, FilterType, SortType, BLANK_POINT, Mode };
