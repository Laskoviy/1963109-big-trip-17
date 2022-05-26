import dayjs from 'dayjs';

const humanizeTaskDueTime = (dueDate) => dayjs(dueDate).format('hh:mm');
const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizeTaskDueDateT = (dueDate) => dayjs(dueDate).format('DD/MM/YY_HH:mm');

export {humanizeTaskDueTime, humanizeTaskDueDate, humanizeTaskDueDateT};
