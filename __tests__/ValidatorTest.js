import Validator from '../src/Validator.js';
import ERROR from '../src/constants/error.js';

describe('날짜 입력 예외 테스트', () => {
  test.each(['-1', '0', '일', 'one', '!', '2 3', '34', '23.6', ''])(
    'validDate() 메서드 테스트',
    (input) => {
      const validDateError = () => Validator.validDate(input);

      expect(validDateError).toThrow(ERROR.ERROR);
    },
  );
  describe('isBetweenDate() 메서드 테스트', () => {
    test.each(['-1', '0', '35', '32', '365', '-1.3', '0.3'])(
      '날짜 입력 시 1~31사이의 숫자를 입력하지 않았을 때',
      (input) => {
        const isBetweenDateError = () => Validator.isBetweenDate(input);

        expect(isBetweenDateError).toThrow(ERROR.ERROR);
      },
    );
  });

  describe('isEmptyDate() 메서드 테스트', () => {
    test('빈 값을 입력했을 때', () => {
      const input = '';

      const isEmptyDateError = () => Validator.isEmptyDate(input);

      expect(isEmptyDateError).toThrow(ERROR.ERROR);
    });
  });

  describe('isNotNumber() 메서드 테스트', () => {
    test.each(['!', '2#', '3.4', '26.7', '일', '2 3', 'one'])(
      ' 양의 정수가 아닌 값을 입력했을 때',
      (input) => {
        const isNotNumberError = () => Validator.isNotNumber(input);

        expect(isNotNumberError).toThrow(ERROR.ERROR);
      },
    );
  });
});

describe('주문 입력 예외 테스트', () => {
  test.each([
    '엽기떡볶이-1',
    '제로콜라-2,레드와인-1',
    '바비큐립-23',
    '시저샐러드-1,시저샐러드-1',
    '초코케이크-1개',
    '초코케이크,1',
    '초코케이크--1',
    '초코케이크->1',
    '초코케이크-한개',
    '타파스-0.3',
    '타파스-0',
    '타파스-2.4',
    '타파스-!#',
  ])('validMenu() 메서드 테스트', (input) => {
    const validMenuError = () => Validator.validMenu(input);

    expect(validMenuError).toThrow(ERROR.ERROR);
  });

  describe('isNotMenu() 메서드 테스트', () => {
    test('메뉴판에 없는 메뉴를 입력했을 때', () => {
      const input = '엽기떡볶이-1';

      const isNotMenuError = () => Validator.isNotMenu(input);

      expect(isNotMenuError).toThrow(ERROR.ERROR);
    });
  });
});

describe('isOnlyDrink() 메서트 테스트', () => {
  test('음료만 주문했을 때', () => {
    const input = '제로콜라-2,레드와인-1';

    const isOnlyDrinkError = () => Validator.isOnlyDrink(input);

    expect(isOnlyDrinkError).toThrow(ERROR.ERROR);
  });
});

describe('isOverMenu() 메서드 테스트', () => {
  test.each([
    '바비큐립-23',
    '티본스테이크-3,해산물파스타-5,제로콜라-8,아이스크림-6',
  ])('주문한 총 메뉴의 개수가 20개 초과일 때', (input) => {
    const isOverMenuError = () => Validator.isOverMenu(input);

    expect(isOverMenuError).toThrow(ERROR.ERROR);
  });
});

describe('isDuplicationMenu() 메서드 테스트', () => {
  test('중복 메뉴를 입력했을 때', () => {
    const input = '시저샐러드-1,시저샐러드-1';

    const isDuplicationMenuError = () => Validator.isDuplicationMenu(input);

    expect(isDuplicationMenuError).toThrow(ERROR.ERROR);
  });
});

describe('isDifferentInput() 메서드 테스트', () => {
  test.each([
    '초코케이크,1',
    '초코케이크-1개',
    '초코케이크--1',
    '초코케이크:1',
    '초코케이크->1',
    '초코케이크-한개',
  ])(
    '입력 형식이 예시와 다를 때(주문 메뉴-개수 e.g. 초코케이크-1)',
    (input) => {
      const isDifferentInputError = () => Validator.isDifferentInput(input);

      expect(isDifferentInputError).toThrow(ERROR.ERROR);
    },
  );
});

describe('isMenuCount() 메서드 테스트', () => {
  test.each([
    '타파스-0',
    '타파스--1',
    '타파스-두개',
    '타파스-two',
    '타파스-0.3',
    '타파스-2.4',
    '타파스-!#',
  ])('입력한 메뉴 개수가 1 이상의 양의 정수가 아닐 때', (input) => {
    const isMenuCount = () => Validator.isMenuCount(input);

    expect(isMenuCount).toThrow(ERROR.ERROR);
  });
});
