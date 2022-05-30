import { FilterType } from '../const';
import { isPointAhead, isPointExpired } from './event';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointAhead(point.dateFrom)), //дата начала события больше или равна текущей дате;
  [FilterType.PAST]: (points) => points.filter((point) => isPointExpired(point.dateTo)),//дата окончания маршрута меньше, чем текущая
};

export { filter };
