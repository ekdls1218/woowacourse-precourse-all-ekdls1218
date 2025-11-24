import ApplyEvent from './ApplyEvent.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validator from './Validator.js';
import PROMPT from './constants/prompt.js';
import { orderMenu } from './utils/utils.js';

class App {
  #visitDate;

  #orderSheet;

  #applyEvent;

  constructor() {
    this.#visitDate = '';
    this.#orderSheet = [];
  }

  async run() {
    OutputView.print(PROMPT.INTRODUCE);
    await this.inputDate();
    await this.inputMenu();

    this.#applyEvent = new ApplyEvent(this.#visitDate, this.#orderSheet);
    OutputView.previewPrint(this.#visitDate);
    this.printOrderSheet();
    this.printOrderPrice();
    this.printPresent();
    this.printBenefitList();
    this.printTotalBenefit();
    this.printPayment();
    this.printBadge();
  }

  async inputDate() {
    let input;
    do {
      try {
        input = await InputView.readDate();
        Validator.validDate(input);
      } catch (error) {
        OutputView.print(error.message);
        input = null;
      }
    } while (!input);
    this.#visitDate = input;

    return this.#visitDate;
  }

  async inputMenu() {
    do {
      try {
        const inputOrderMenu = await InputView.readOrder();
        Validator.validMenu(inputOrderMenu);
        this.#orderSheet = orderMenu(inputOrderMenu);
      } catch (error) {
        OutputView.print(error.message);
        this.#orderSheet = null;
      }
    } while (!this.#orderSheet);

    return this.#orderSheet;
  }

  printOrderSheet() {
    OutputView.print(PROMPT.ORDER_MENU);

    this.#orderSheet.forEach((eachMenu) => {
      OutputView.printOrderMenu(eachMenu.name, eachMenu.count);
    });
  }

  printOrderPrice() {
    const orderAmount = this.#applyEvent.calculateOrderAmount();

    OutputView.print(PROMPT.TOTAL_AMOUNT);
    OutputView.printPrice(orderAmount);
  }

  printPresent() {
    const present = this.#applyEvent.checkPresentEvent();

    OutputView.print(PROMPT.PRESENT_MENU);

    if (present === 0) {
      return OutputView.print(PROMPT.NOTHING);
    }

    return OutputView.print(PROMPT.PRESENT);
  }

  printBenefitList() {
    const benefitList = this.#applyEvent.benefitList();

    OutputView.print(PROMPT.BENEFIT);

    if (benefitList.length === 0) {
      return OutputView.print(PROMPT.NOTHING);
    }

    const eachBenefit = benefitList.forEach((value) => {
      OutputView.printBenefit(value.name, value.discount);
    });

    return eachBenefit;
  }

  printTotalBenefit() {
    const totalBenefit = this.#applyEvent.calculateBenefitAmount();

    OutputView.print(PROMPT.TOTAL_BENEFIT);
    if (totalBenefit === 0) {
      return OutputView.printPrice(totalBenefit);
    }

    return OutputView.printMinusPrice(totalBenefit);
  }

  printPayment() {
    const payment = this.#applyEvent.calculatePayment();

    OutputView.print(PROMPT.PAYMENT);
    OutputView.printPrice(payment);
  }

  printBadge() {
    const badge = this.#applyEvent.checkBadgeEvent();

    OutputView.print(PROMPT.BADGE);
    OutputView.print(badge);
  }
}

export default App;
