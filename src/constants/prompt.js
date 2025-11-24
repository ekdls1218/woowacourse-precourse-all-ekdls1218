import { STRINGS } from './strings.js';

const PROMPT = Object.freeze({
  INTRODUCE: `안녕하세요! 우테코 식당 ${STRINGS.MONTH} 이벤트 플래너입니다.`,
  ASK_DATE: `${STRINGS.MONTH} 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
  ASK_MENU:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  PREVIEW: '에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n',
  ORDER_MENU: '<주문 메뉴>',
  TOTAL_AMOUNT: '\n<할인 전 총주문 금액>',
  PRESENT_MENU: '\n<증정 메뉴>',
  BENEFIT: '\n<혜택 내역>',
  TOTAL_BENEFIT: '\n<총혜택 금액>',
  PAYMENT: '\n<할인 후 예상 결제 금액>',
  BADGE: `\n<${STRINGS.MONTH} 이벤트 배지>`,

  PRESENT: '샴페인 1개',

  EVENT: [
    '크리스마스 디데이 할인:',
    '평일 할인:',
    '주말 할인:',
    '특별 할인:',
    '증정 이벤트:',
  ],

  NOTHING: '없음',

  BADGE_STAR: '별',
  BADGE_TREE: '트리',
  BADGE_SANTA: '산타',
});
export default PROMPT;
