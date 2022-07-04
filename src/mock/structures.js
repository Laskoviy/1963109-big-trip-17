import { nanoid } from 'nanoid';
import { getRandomInteger, getRandomItem } from '../utils/common.js';
import { DESTINATIONS } from './destinations.js';

export const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const generateRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generateOffersIds = () => {
  const count = getRandomInteger(0, 3);

  return new Array(count).fill('').map(() => getRandomInteger(0, 5));
};

export const generatePoint = () => ({
  basePrice: getRandomInteger(100, 2000),
  dateFrom: generateRandomDate(new Date(2022, 4, 1), new Date(2022, 5, 2)), //дата начала
  dateTo: generateRandomDate(new Date(2022, 5, 2), new Date()), //дата окончания
  destination: getRandomItem(DESTINATIONS),
  id: nanoid(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: generateOffersIds(),
  type: getRandomItem(pointTypes)
});

/* export const generateAuthorizationError = () => ({
  error: 401,
  message: 'Header Authorization is not correct'
});

export const generateAuthorizationError = () => ({
  error: 404,
  message: 'Not found'
}); */

