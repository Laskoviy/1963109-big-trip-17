import dayjs from 'dayjs';

const humanizePointDueTime = (dateFrom) => dayjs(dateFrom).format('HH:mm');
const humanizePointDueDate = (dateFrom) => dayjs(dateFrom).format('MMM D');
const fullDate = (date) => date !== null ? dayjs(date).format('DD/MM/YY HH:mm') : '';
//фильтры
const isPointExpired = (dateFrom) => dateFrom && dayjs().isAfter(dateFrom, 'D');//past
const isPointAhead = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');//future

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeight = (a, b) => {
  if (a === null && b === null) {
    return 0;
  }

  if (a === null) {
    return 1;
  }

  if (b === null) {
    return -1;
  }

  return null;
};

const sortPointDay = (pointA, pointB) => {//сортировка по убыванию по дню
  const weight = getWeight(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
};

const sortPointTime = (pointA, pointB) => {//сортировка по убыванию по времени поездки не работает!
  const durationPointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationPointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationPointB - durationPointA;
};

const getTitle = (boardPoint) => {
  let pretextTitle = 'to';
  if (boardPoint.type.includes('sightseeing') || boardPoint.type.includes('restaurant')) {
    pretextTitle = 'in';
  }
  if (boardPoint.type.includes('check-in')) {
    pretextTitle = 'at';
  }
  return pretextTitle;
};

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;//сортировка по убыванию по цене поездки
const capitalise = (word) => word.slice(0, 1).toUpperCase() + word.slice(1);

export { getTitle, humanizePointDueTime, capitalise, humanizePointDueDate, fullDate, isPointExpired, isPointAhead, sortPointDay, sortPointTime, sortPointPrice };
