import Event from '../src/Event';

describe('checkDdayEvent() 메서드 테스트', () => {
  test.each([
    [1, 1000],
    [2, 1100],
    [3, 1200],
    [4, 1300],
    [5, 1400],
    [6, 1500],
    [7, 1600],
    [8, 1700],
    [9, 1800],
    [10, 1900],
    [11, 2000],
    [12, 2100],
    [13, 2200],
    [14, 2300],
    [15, 2400],
    [16, 2500],
    [17, 2600],
    [18, 2700],
    [19, 2800],
    [20, 2900],
    [21, 3000],
    [22, 3100],
    [23, 3200],
    [24, 3300],
    [25, 3400],
  ])('크리스마스 디데이 이벤트 테스트', (input, ouput) => {
    const dday = new Event(input).checkDdayEvent();

    expect(dday).toBe(ouput);
  });
});

describe('checkWeekEvent() 메서드 테스트', () => {
  test('평일/주말 할인 테스트', () => {
    const input = 10;

    const week = Event.checkWeekEvent(input);

    expect(week).toBe(20230);
  });
});

describe('checkSpecialEvent() 메서드 테스트', () => {
  test.each([3, 10, 17, 24, 25, 31])('특별 할인 테스트', (input) => {
    const special = new Event(input).checkSpecialEvent();

    expect(special).toBe(1000);
  });
});
