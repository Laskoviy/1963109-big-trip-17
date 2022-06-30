import dayjs from 'dayjs';
const humanizePointDate = (date) => date !== null ? dayjs(date).format('MMM D') : '';
const humanizePointHoursMinutesDate = (date) => date !== null ? dayjs(date).format('hh:mm') : '';
const humanizePointYearMonthDate = (date) => date !== null ? dayjs(date).format('YYYY-MM-DD') : '';
const humanizePointFullDate = (date) => date !== null ? dayjs(date).format('YYYY-MM-DDTHH:mm') : '';
//фильтры
const isPointExpired = (dateFrom) => dateFrom && dayjs().isAfter(dateFrom, 'D');//past
const isPointAhead = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');//future
const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

const getPointDuration = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const allMinutes = date2.diff(date1, 'minutes');
  const allHours = Math.floor(allMinutes / 60);
  const days = Math.floor(allHours / 24);
  const hours = allHours - (days * 24);
  const minutes = allMinutes - (allHours * 60);
  const daysWithZero = String(days).padStart(2, '0');
  const hoursWithZero = String(hours).padStart(2, '0');
  const minutesWithZero = String(minutes).padStart(2, '0');

  if (days > 0) {
    return `${daysWithZero}D ${hoursWithZero}H ${minutesWithZero}M`;
  }

  if (hours > 0) {
    return `${hoursWithZero}H ${minutesWithZero}M`;
  }

  return `${minutesWithZero}M`;
};

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

export { getPointDuration, humanizePointFullDate, getTitle, isDatesEqual, humanizePointDate, capitalise, humanizePointHoursMinutesDate, humanizePointYearMonthDate, isPointExpired, isPointAhead, sortPointDay, sortPointTime, sortPointPrice };
