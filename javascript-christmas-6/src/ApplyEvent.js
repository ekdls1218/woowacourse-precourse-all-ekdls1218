import Event from './Event.js';
import { getDayOfWeek } from './utils/utils.js';
import { STRINGS, PRESENT, BADGE } from './constants/strings.js';
import PROMPT from './constants/prompt.js';

class ApplyEvent {
  #inputDate;

  #inputMenu;

  constructor(inputDate, inputMenu) {
    this.#inputDate = inputDate;
    this.#inputMenu = inputMenu;
  }

  calculateOrderAmount() {
    let sumPrice;

    const orderAmount = this.#inputMenu.reduce((accumulator, order) => {
      sumPrice = accumulator + order.price * order.count;

      return sumPrice;
    }, 0);

    return orderAmount;
  }

  calculateDiscountAmount() {
    const benefitAmount = this.calculateBenefitAmount();
    const present = this.checkPresentEvent();

    const discountAmount = benefitAmount - present;

    return discountAmount;
  }

  calculateBenefitAmount() {
    const discountList = this.benefitList();
    let sumPrice;

    const benefitAmount = discountList.reduce((accumulator, discount) => {
      sumPrice = accumulator + discount.discount;

      return sumPrice;
    }, 0);

    return benefitAmount;
  }

  calculatePayment() {
    const orderAmount = this.calculateOrderAmount();
    const discountAmount = this.calculateDiscountAmount();

    const payment = orderAmount - discountAmount;

    return payment;
  }

  checkPresentEvent() {
    let present = 0;
    const orderAmount = this.calculateOrderAmount();

    if (orderAmount >= PRESENT.CONDITION) {
      present = PRESENT.PRICE;
      return present;
    }
    return present;
  }

  benefitList() {
    let discountList = [];
    const orderAmount = this.calculateOrderAmount();

    if (orderAmount >= STRINGS.ORDER_AMOUNT_CONDITION) {
      const discountPrice = this.loadEvent();
      const combineList = ApplyEvent.combineEvent(discountPrice);

      discountList = combineList.filter((value) => value.discount !== 0);

      return discountList;
    }

    return discountList;
  }

  loadEvent() {
    const discountEvent = new Event(this.#inputDate);
    const weekdayCount = this.checkWeekday();
    const weekendCount = this.checkWeekend();

    const dday = discountEvent.checkDdayEvent();
    const weekday = Event.checkWeekEvent(weekdayCount);
    const weekend = Event.checkWeekEvent(weekendCount);
    const special = discountEvent.checkSpecialEvent();
    const present = this.checkPresentEvent();

    const discountPrice = [dday, weekday, weekend, special, present];

    return discountPrice;
  }

  static combineEvent(discountPrice) {
    const eventName = PROMPT.EVENT;
    const list = [];

    eventName.map((key, i) =>
      list.push({ name: key, discount: discountPrice[i] }),
    );

    return list;
  }

  checkWeekday() {
    let count = 0;
    const dayOfWeek = getDayOfWeek(this.#inputDate);

    if (dayOfWeek >= STRINGS.SUNDAY && dayOfWeek <= STRINGS.THURSDAY) {
      count = this.countMenu('dessert');

      return count;
    }

    return count;
  }

  checkWeekend() {
    let count = 0;
    const dayOfWeek = getDayOfWeek(this.#inputDate);

    if (dayOfWeek === STRINGS.FRIDAY || dayOfWeek === STRINGS.SATURDAY) {
      count = this.countMenu('main');

      return count;
    }

    return count;
  }

  countMenu(type) {
    const typeMenus = this.#inputMenu.filter((value) => value.type === type);

    let count;
    const typeCount = typeMenus.reduce((accumulator, menuType) => {
      count = accumulator + menuType.count;

      return count;
    }, 0);

    return typeCount;
  }

  checkBadgeEvent() {
    const benefitAmount = this.calculateBenefitAmount();

    if (benefitAmount >= BADGE.SANTA_CONDITION) return PROMPT.BADGE_SANTA;

    if (benefitAmount >= BADGE.TREE_CONDITION) return PROMPT.BADGE_TREE;

    if (benefitAmount >= BADGE.STAR_CONDITION) return PROMPT.BADGE_STAR;

    return PROMPT.NOTHING;
  }
}
export default ApplyEvent;
