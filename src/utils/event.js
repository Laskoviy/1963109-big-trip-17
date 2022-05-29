import dayjs from 'dayjs';

const humanizePointDueTime = (dueDate) => dayjs(dueDate).format('hh:mm');
const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizePointDueDateTime = (dueDate) => dayjs(dueDate).format('DD/MM/YY_HH:mm');
//фильтры
const isPointExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');//past
const isPointAhead = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');//future

export { humanizePointDueTime, humanizePointDueDate, humanizePointDueDateTime, isPointExpired, isPointAhead };
