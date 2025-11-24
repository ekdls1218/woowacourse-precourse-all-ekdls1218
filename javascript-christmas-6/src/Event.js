import { getDayOfWeek } from './utils/utils.js';
import { STRINGS, DDAY, WEEK, SPECIAL } from './constants/strings.js';

class Event {
  #date;

  constructor(date) {
    this.#date = date;
  }

  checkDdayEvent() {
    let discount = 0;

    if (this.#date >= DDAY.START_DATE && this.#date <= DDAY.END_DATE) {
      discount = DDAY.START_DISCOUNT + (this.#date - 1) * DDAY.INCREASE;
    }

    return discount;
  }

  static checkWeekEvent(count) {
    const discount = count * WEEK.DISCOUNT;

    return discount;
  }

  checkSpecialEvent() {
    let discount = 0;
    const dayOfWeek = getDayOfWeek(this.#date);

    if (dayOfWeek === STRINGS.SUNDAY || this.#date === SPECIAL.DATE) {
      discount = SPECIAL.DISCOUNT;
    }

    return discount;
  }
}
export default Event;
