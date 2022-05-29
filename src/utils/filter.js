import { FilterType } from '../const';
import { isPointAhead, isPointExpired } from './event';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => !point.isArchive),
  [FilterType.PAST]: (points) => points.filter((point) => isPointExpired(point.dueDate) && !point.isArchive),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointAhead(point.dueDate) && !point.isArchive),
};

export { filter };
