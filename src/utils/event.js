import dayjs from 'dayjs';

const humanizeTaskDueTime = (dueDate) => dayjs(dueDate).format('hh:mm');
const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizeTaskDueDateT = (dueDate) => dayjs(dueDate).format('DD/MM/YY_HH:mm');
//фильтры
const isPointExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');//past
const isPointAhead = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');//future

export { humanizeTaskDueTime, humanizeTaskDueDate, humanizeTaskDueDateT, isPointExpired, isPointAhead };
