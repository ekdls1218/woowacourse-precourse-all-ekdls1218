import MENU from '../constants/menu.js';

const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(2023, 11, date).getDay();

  return dayOfWeek;
};

const thousandsComma = (price) => {
  const comma = Number(price.toFixed(1)).toLocaleString();

  return comma;
};

const refineOrder = (eachMenu) => {
  const hyphenSeparate = eachMenu.split('-');

  const orderFiltering = MENU.filter(
    (vlaue) => vlaue.name === hyphenSeparate[0],
  );

  const insertCount = orderFiltering.map((value) => ({
    ...value,
    count: Number(hyphenSeparate[1]),
  }));

  return insertCount;
};

const orderMenu = (inputOrderMenu) => {
  const commaSeparate = inputOrderMenu.split(',');

  const order = [];
  commaSeparate.forEach((eachMenu) => {
    order.push(...refineOrder(eachMenu.trim()));
  });

  return order;
};

export { getDayOfWeek, thousandsComma, refineOrder, orderMenu };
