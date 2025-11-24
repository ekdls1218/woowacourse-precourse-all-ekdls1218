import {
  getDayOfWeek,
  thousandsComma,
  refineOrder,
  orderMenu,
} from '../src/utils/utils.js';

describe('getDayOfWeek() 메서드 테스트', () => {
  test.each([
    [3, 0],
    [4, 1],
    [5, 2],
    [6, 3],
    [7, 4],
    [8, 5],
    [9, 6],
  ])('요일 테스트', (input, output) => {
    const dayOfWeek = getDayOfWeek(input);

    expect(dayOfWeek).toBe(output);
  });
});

describe('thousandsComma() 메서드 테스트', () => {
  test.each([
    [1200, '1,200'],
    [1200000, '1,200,000'],
    [1200000000, '1,200,000,000'],
  ])('천단위 콤마 테스트', (input, output) => {
    const comma = thousandsComma(input);

    expect(comma).toEqual(output);
  });
});

describe('(orderMenu() 메서드 테스트', () => {
  test.each([
    [
      '해산물파스타-1,레드와인-1,초코케이크-1',
      [
        { name: '해산물파스타', price: 35000, type: 'main', count: 1 },
        { name: '레드와인', price: 60000, type: 'drink', count: 1 },
        { name: '초코케이크', price: 15000, type: 'dessert', count: 1 },
      ],
      [
        '바비큐립-1, 제로콜라-3',
        [
          { name: '바비큐립', price: 54000, type: 'main', count: 1 },
          { name: '제로콜라', price: 3000, type: 'drink', count: 1 },
        ],
      ],
    ],
  ])(
    '입력한 주문을 객체 배열 형식으로 잘 정제하는지 테스트',
    (input, output) => {
      const orderSheet = orderMenu(input);

      expect(orderSheet).toEqual(output);
    },
  );
});

describe('refineOrder() 메서드 테스트', () => {
  test('메뉴판에서 주문을 필터링하고 개수 추가하기 테스트', () => {
    const input = '해산물파스타-1';
    const output = [
      {
        name: '해산물파스타',
        price: 35000,
        type: 'main',
        count: 1,
      },
    ];

    const refine = refineOrder(input);

    expect(refine).toEqual(output);
  });
});
