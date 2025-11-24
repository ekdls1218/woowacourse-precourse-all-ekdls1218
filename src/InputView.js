import { Console } from '@woowacourse/mission-utils';
import PROMPT from './constants/prompt.js';

const InputView = {
  async readDate() {
    const inputDate = await Console.readLineAsync(PROMPT.ASK_DATE);

    return inputDate;
  },

  async readOrder() {
    const inputMenu = await Console.readLineAsync(PROMPT.ASK_MENU);

    return inputMenu;
  },
};

export default InputView;
