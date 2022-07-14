import dayjs from 'dayjs';

const humanizeDate = (date) => date !== null ? dayjs(date).format('MMM D') : '';
const hoursMinutesDate = (date) => date !== null ? dayjs(date).format('hh:mm') : '';
const yearMonthDate = (date) => date !== null ? dayjs(date).format('YYYY-MM-DD') : '';
const fullDate = (date) => date !== null ? dayjs(date).format('YYYY-MM-DDTHH:mm') : '';
const slashesFullDate = (date) => date !== null ? dayjs(date).format('DD/MM/YY HH:mm') : '';

const getEventDates = (dateFrom, dateTo) => {
  let dateFromFormat = '';
  let dateToFormat = '';
  if ( dateFrom !== null && dateTo !== null ) {
    const dateFromMonth = dayjs(dateFrom).format('M');
    const dateToMonth = dayjs(dateTo).format('M');
    if ( dateFromMonth !== dateToMonth ) {
      dateFromFormat = dayjs(dateFrom).format('D MMM');
      dateToFormat = dayjs(dateTo).format('D MMM');
    } else {
      dateFromFormat = dayjs(dateFrom).format('D MMM');
      dateToFormat = dayjs(dateTo).format('D');
    }
  }
  return `${dateFromFormat}&nbsp;&mdash;&nbsp;${dateToFormat}`;
};

const getEventDuration = (dateFrom, dateTo) => {
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

const getEventOffersByType = (offers, type) => offers.find((offer) => offer.type === type)
  ? offers.find((offer) => offer.type === type).offers
  : [];

const isEventFuture = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');
const isEventPast = (dateTo) => dateTo && dayjs().isAfter(dateTo, 'D');

const sortEventDay = (eventA, eventB) => {
  const dateFromA = dayjs(eventA.dateFrom);
  const dateFromB = dayjs(eventB.dateFrom);
  return dateFromA.diff(dateFromB);
};

const sortEventTime = (eventA, eventB) => {
  const date1A = dayjs(eventA.dateFrom);
  const date2A = dayjs(eventA.dateTo);
  const durationEventA = date2A.diff(date1A);

  const date1B = dayjs(eventB.dateFrom);
  const date2B = dayjs(eventB.dateTo);
  const durationEventB = date2B.diff(date1B);

  return durationEventB - durationEventA;
};

const sortEventPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'minutes');

export {humanizeDate, hoursMinutesDate, yearMonthDate, fullDate, slashesFullDate, getEventDates, getEventDuration, getEventOffersByType, isEventFuture, isEventPast, sortEventDay, sortEventTime, sortEventPrice, isDatesEqual};
