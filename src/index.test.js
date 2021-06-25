const { calculate, getDateFromString } = require('./index');

test('calculates 1983-06-02 & 1983-06-22 to output 19', () => {
    const date1 = getDateFromString('1983-06-02');
    const date2 = getDateFromString('1983-06-22');

    expect(calculate(date1, date2)).toBe(19);
});

test('calculates 1984-07-04 & 1984-12-25 to output 173', () => {
    const date1 = getDateFromString('1984-07-04');
    const date2 = getDateFromString('1984-12-25');

    expect(calculate(date1, date2)).toBe(173);
});

test('calculates 1989-01-03 & 1983-08-03 to output 1979', () => {
    const date1 = getDateFromString('1989-01-03');
    const date2 = getDateFromString('1983-08-03');

    expect(calculate(date1, date2)).toBe(1979);
});