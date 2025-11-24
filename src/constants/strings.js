const STRINGS = Object.freeze({
  MONTH: '12월',
  ORDER_AMOUNT_CONDITION: 10000,

  EVENT_START_date: 1,
  EVENT_END_date: 31,

  SUNDAY: 0,
  MONDAY: 1,
  TUSEDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,

  COMMA: ',',
  HYPHEN: '-',

  REGEX_DATE: /[^0-9]/,
  REGEX_MENU_FORM: /[가-힣]-\d{1,2}$/,
  REGEX_MENU_COUNT: /[^1-9]/,
});

const DDAY = Object.freeze({
  START_DATE: 1,
  END_DATE: 25,
  START_DISCOUNT: 1000,
  INCREASE: 100,
});

const WEEK = Object.freeze({
  DISCOUNT: 2023,
});
const SPECIAL = Object.freeze({
  DATE: 25,
  DISCOUNT: 1000,
});
const PRESENT = Object.freeze({
  CONDITION: 120000,
  PRICE: 25000,
});
const BADGE = Object.freeze({
  STAR_CONDITION: 5000,
  TREE_CONDITION: 10000,
  SANTA_CONDITION: 20000,
});

export { STRINGS, DDAY, WEEK, SPECIAL, PRESENT, BADGE };
