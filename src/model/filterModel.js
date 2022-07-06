import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';
//модуль 7 задание 1
//Задача модели - хранить выбранный фильтр и уведомлять наблюдателей, если таковой изменится.
export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
