import ApplyEvent from '../src/ApplyEvent.js';

const input = [
  { name: '티본스테이크', price: 55000, type: 'main', count: 1 },
  { name: '바비큐립', price: 54000, type: 'main', count: 1 },
  { name: '초코케이크', price: 15000, type: 'dessert', count: 2 },
  { name: '제로콜라', price: 3000, type: 'drink', count: 1 },
];

const applyEvent = new ApplyEvent(24, input);

describe('checkPresentEvent() 메서드 테스트', () => {
  test('총 주문 금액 12만원 이상 시 샴페인(2,5000) 증정', () => {
    const present = applyEvent.checkPresentEvent();

    expect(present).toBe(25000);
  });

  test('총 주문 금액 12만원 미만 시 증정 없음', () => {
    const nothingInput = [
      { name: '바비큐립', price: 54000, type: 'main', count: 1 },
      { name: '초코케이크', price: 15000, type: 'dessert', count: 1 },
      { name: '제로콜라', price: 3000, type: 'drink', count: 1 },
    ];

    const present = new ApplyEvent(23, nothingInput).checkPresentEvent();

    expect(present).toBe(0);
  });
});

describe('countMenu() 메서드 테스트', () => {
  test('메인 개수 세기 테스트', () => {
    const typeInput = 'main';
    const countMainMenu = applyEvent.countMenu(typeInput);

    expect(countMainMenu).toEqual(2);
  });

  test('디저트 개수 세기 테스트', () => {
    const typeInput = 'dessert';
    const countDessertMenu = applyEvent.countMenu(typeInput);

    expect(countDessertMenu).toEqual(2);
  });

  test('메뉴는 다르지만 종류가 같은 개수 세기 테스트', () => {
    const countInput = [
      { name: '티본스테이크', price: 55000, type: 'main', count: 1 },
      { name: '바비큐립', price: 54000, type: 'main', count: 2 },
      { name: '초코케이크', price: 15000, type: 'dessert', count: 2 },
      { name: '제로콜라', price: 3000, type: 'drink', count: 1 },
    ];
    const typeInput = 'main';

    const otherMenuSameType = new ApplyEvent(24, countInput).countMenu(
      typeInput,
    );

    expect(otherMenuSameType).toEqual(3);
  });
});

describe('checkWeek() 메서드 테스트', () => {
  test.each([3, 4, 5, 6, 7])('평일이면 디저트 할인', (dateInput) => {
    const checkWeekday = new ApplyEvent(dateInput, input).checkWeekday();

    expect(checkWeekday).toEqual(2);
  });

  test.each([8, 9])('주말이면 메인 할인', (dateInput) => {
    const checkWeekend = new ApplyEvent(dateInput, input).checkWeekend();

    expect(checkWeekend).toEqual(2);
  });
});

describe('benefitList() 메서드 테스트', () => {
  test('총 주문 금액이 10000원 미만일 때 빈 배열 리턴', () => {
    const lessInput = [
      { name: '아이스크림', price: 5000, type: 'dessert', count: 1 },
      { name: '제로콜라', price: 3000, type: 'drink', count: 1 },
    ];

    const lessOrderAmount = new ApplyEvent(25, lessInput).benefitList();

    expect(lessOrderAmount).toEqual([]);
  });

  test('총 주문 금액이 10000원 이상일 때 할인 금액이 0인 내역 삭제 후 리턴', () => {
    const output = [
      { name: '크리스마스 디데이 할인:', discount: 3300 },
      { name: '평일 할인:', discount: 4046 },
      { name: '특별 할인:', discount: 1000 },
      { name: '증정 이벤트:', discount: 25000 },
    ];

    const benefitList = applyEvent.benefitList();

    expect(benefitList).toEqual(output);
  });
});

describe('loadEvent() 메서드 테스트', () => {
  test('혜택 금액 내역 배열 생성 테스트', () => {
    const output = [3300, 4046, 0, 1000, 25000];

    const loadEvent = applyEvent.loadEvent();

    expect(loadEvent).toEqual(output);
  });
});

describe('combineEvent() 메서드 테스트', () => {
  test('혜택 메시지 내역 배열과 혜택 금액 내역 배열 합치기 테스트', () => {
    const combineInput = [3300, 4046, 0, 1000, 25000];

    const output = [
      { name: '크리스마스 디데이 할인:', discount: 3300 },
      { name: '평일 할인:', discount: 4046 },
      { name: '주말 할인:', discount: 0 },
      { name: '특별 할인:', discount: 1000 },
      { name: '증정 이벤트:', discount: 25000 },
    ];

    const combineList = ApplyEvent.combineEvent(combineInput);

    expect(combineList).toEqual(output);
  });
});

describe('calculateOrderAmount() 메서드 테스트', () => {
  test('총 주문 금액 계산 테스트', () => {
    const orderAmount = applyEvent.calculateOrderAmount();

    expect(orderAmount).toEqual(142000);
  });
});

describe('calculateDiscountAmount() 메서드 테스트', () => {
  test('총 할인 금액 계산 테스트', () => {
    const discountAmount = applyEvent.calculateDiscountAmount();

    expect(discountAmount).toEqual(8346);
  });
});

describe('calculateBenefitAmount() 메서드 테스트', () => {
  test('총 혜택 금액 계산 테스트', () => {
    const benefitAmount = applyEvent.calculateBenefitAmount();

    expect(benefitAmount).toEqual(33346);
  });
});

describe('calculatePayment() 메서드 테스트', () => {
  test('할인 후 예상 결제 금액 계산 테스트', () => {
    const payment = applyEvent.calculatePayment();

    expect(payment).toEqual(133654);
  });
});

describe('checkBadgeEvent() 메서드 테스트', () => {
  test('총 혜택 금액이 5천원 이상일 때 별', () => {
    const starInput = [
      { name: '바비큐립', price: 54000, type: 'main', count: 1 },
      { name: '초코케이크', price: 15000, type: 'dessert', count: 1 },
      { name: '제로콜라', price: 3000, type: 'drink', count: 1 },
    ];

    const star = new ApplyEvent(25, starInput).checkBadgeEvent();

    expect(star).toBe('별');
  });

  test('총 혜택 금액이 1만원 이상일 때 트리', () => {
    const treeInput = [
      { name: '바비큐립', price: 54000, type: 'main', count: 1 },
      { name: '아이스크림', price: 5000, type: 'dessert', count: 3 },
      { name: '제로콜라', price: 3000, type: 'drink', count: 1 },
    ];

    const tree = new ApplyEvent(25, treeInput).checkBadgeEvent();

    expect(tree).toBe('트리');
  });

  test('총 혜택 금액이 2만원 이상일 때 산타', () => {
    const santa = applyEvent.checkBadgeEvent();

    expect(santa).toBe('산타');
  });

  test('총 혜택 금액이 5천원 미만일 때 없음', () => {
    const nothingInput = [
      { name: '바비큐립', price: 54000, type: 'main', count: 1 },
      { name: '초코케이크', price: 15000, type: 'dessert', count: 1 },
      { name: '제로콜라', price: 3000, type: 'drink', count: 1 },
    ];

    const nothing = new ApplyEvent(27, nothingInput).checkBadgeEvent();

    expect(nothing).toBe('없음');
  });
});
