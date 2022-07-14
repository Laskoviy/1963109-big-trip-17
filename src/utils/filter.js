import { FilterType } from '../const';
import { isEventFuture, isEventPast } from './event';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventFuture(point.dateFrom)), //дата начала события больше или равна текущей дате;
  [FilterType.PAST]: (points) => points.filter((point) => isEventPast(point.dateTo)),//дата окончания маршрута меньше, чем текущая
};

export { filter };
