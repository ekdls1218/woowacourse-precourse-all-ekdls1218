import { Console } from '@woowacourse/mission-utils';
import { STRINGS } from './constants/strings.js';
import PROMPT from './constants/prompt.js';
import { thousandsComma } from './utils/utils.js';

const OutputView = {
  print(message) {
    Console.print(message);
  },

  previewPrint(inputDate) {
    Console.print(`${STRINGS.MONTH} ${inputDate}일${PROMPT.PREVIEW}`);
  },

  printOrderMenu(name, count) {
    Console.print(`${name} ${count}개`);
  },

  printPrice(price) {
    const refinePrice = thousandsComma(price);

    Console.print(`${refinePrice}원`);
  },

  printMinusPrice(price) {
    const refinePrice = thousandsComma(price);

    Console.print(`-${refinePrice}원`);
  },

  printBenefit(name, discount) {
    const refineDiscount = thousandsComma(discount);

    Console.print(`${name} -${refineDiscount}원`);
  },
};
export default OutputView;
