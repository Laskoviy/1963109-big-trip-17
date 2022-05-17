import { getRandomInteger } from '../utils.js';

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

export const generateDestination = () => ({
  destinations: [
    {
      id: 1,
      description: null,
      name: 'Chamonix',
      pictures: [
        {
          src: 'http://picsum.photos/300/200?r=0.0762563005163317',
          description: 'Chamonix parliament building'
        }
      ]
    }, {
      id: 2,
      description: 'Amsterdam, is a beautiful city...',
      name: 'Amsterdam',
      pictures: [
        {
          src: 'http://picsum.photos/300/200?r=0.0762563005163317',
          description: 'Amsterdam parliament building'
        }
      ]
    }
  ]
}
);

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

export const generatePoint = () => ({
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestination(),
  id: '0',
  isFavorite: false,
  offers: generateOffer(), //?? generateOffer.offers.title
  type: generatePointType()
});

export const generateLocalPoint = () => ({
  basePrice: 222,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestination(),
  isFavorite: false,
  offers: generateOffer(), //?? generateOffer.offers.title
  type: generatePointType()
});

/* export const generateAuthorizationError = () => ({
  error: 401,
  message: 'Header Authorization is not correct'
});

export const generateAuthorizationError = () => ({
  error: 404,
  message: 'Not found'
}); */

