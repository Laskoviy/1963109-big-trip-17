import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/common.js';


const generateOfferType = () => {
  const travelType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, travelType.length - 1);

  return travelType[randomIndex];
};

const generatePointType = () => {
  const pointType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, pointType.length - 1);

  return pointType[randomIndex];
};

export const generateDestination = () => {
  const destinations = [
    {
      id: 1,
      description: 'Geneva is a beautiful city',
      name: 'Chamonix',
      pictures: [
        {
          src: 'http://picsum.photos/300/200?r=0.0762563005163317',
          description: 'Chamonix parliament building'
        }
      ]
    },
    {
      id: 2,
      description: 'Geneva is a beautiful city',
      name: 'Geneva',
      pictures: [
        {
          src: 'http://picsum.photos/300/200?r=0.0762563005163317',
          description: 'Geneva is a beautiful city'
        }
      ]
    },
    {
      id: 3,
      description: 'Geneva is a beautiful city',
      name: 'Amsterdam',
      pictures: [
        {
          src: 'http://picsum.photos/300/200?r=0.0762563005163317',
          description: 'Amsterdam is an amazing city'
        }
      ]
    }
  ];
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
};


export const generateOffer = () => ({
  type: generateOfferType(),
  offers: [
    {
      id: 1,
      title: 'Upgrade to a business class',
      price: 120
    }, {
      id: 2,
      title: 'Choose the radio station',
      price: 60
    }
  ]
});

const generateRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const generatePoint = () => ({
  basePrice: getRandomInteger(100, 2000),
  dateFrom: generateRandomDate(new Date(2022, 4, 1), new Date(2022, 5, 2)), //дата начала
  dateTo: generateRandomDate(new Date(2022, 5, 2), new Date()), //дата окончания
  destination: generateDestination(),
  id: nanoid(),
  isFavorite: false,
  offers: generateOffer(),
  type: generatePointType()
});

/* export const generateLocalPoint = () => ({
  basePrice: 222,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestination(),
  isFavorite: false,
  offers: generateOffer(),
  type: generatePointType()
}); */

/* export const generateAuthorizationError = () => ({
  error: 401,
  message: 'Header Authorization is not correct'
});

export const generateAuthorizationError = () => ({
  error: 404,
  message: 'Not found'
}); */

