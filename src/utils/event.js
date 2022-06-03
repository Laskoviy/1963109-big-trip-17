import dayjs from 'dayjs';

const humanizePointDueTime = (dueDate) => dayjs(dueDate).format('hh:mm');
const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueDateTime = (dueDate) => dayjs(dueDate).format('DD/MM/YY_HH:mm');
//фильтры
const isPointExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');//past
const isPointAhead = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');//future

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeight = (a,b) => {
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

const sortPointTime = (pointA, pointB) => {//сортировка по убыванию по времени
  const weight = getWeight(pointA.dueDate, pointB.dueDate);

  return weight ?? dayjs(pointB.dueDate).diff(dayjs(pointA.dueDate));
};

const sortPointPrice = (pointA, pointB) => {//сортировка по убыванию по цене
  const weight = getWeight(pointA.basePrice, pointB.basePrice);

  return weight ?? (pointB.basePrice).diff(pointA.basePrice);
};

export { humanizePointDueTime, humanizePointDueDate, humanizePointDueDateTime, isPointExpired, isPointAhead, sortPointTime, sortPointPrice };
