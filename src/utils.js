import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash..
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeTaskDueTime = (dueDate) => dayjs(dueDate).format('hh:mm');
const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizeTaskDueDateT = (dueDate) => dayjs(dueDate).format('DD/MM/YY_HH:mm');

const getRandomItem = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

export { getRandomInteger, humanizeTaskDueTime, humanizeTaskDueDate, humanizeTaskDueDateT, getRandomItem };
