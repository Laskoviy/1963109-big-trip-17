import dayjs from 'dayjs';

const humanizePointDueTime = (dueDate) => dayjs(dueDate).format('hh:mm');
const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueDateTime = (dueDate) => dayjs(dueDate).format('DD/MM/YY_HH:mm');
//фильтры
const isPointExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');//past
const isPointAhead = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');//future

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);

  return weight ?? dayjs(pointA.dueDate).diff(dayjs(pointB.dueDate));
};

const sortPointDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);

  return weight ?? dayjs(pointB.dueDate).diff(dayjs(pointA.dueDate));
};

export { humanizePointDueTime, humanizePointDueDate, humanizePointDueDateTime, isPointExpired, isPointAhead, sortPointUp, sortPointDown };
