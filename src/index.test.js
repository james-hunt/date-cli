const { calculate, getDateString } = require('./index');

test('calculates 02/06/1983 & 22/06/1983 to output 19', () => {
    const date1 = getDateString('02/06/1983');
    const date2 = getDateString('22/06/1983');

    expect(calculate(date1, date2)).toBe(19);
});

test('calculates 04/07/1984 & 25/12/1984 to output 173', () => {
    const date1 = getDateString('04/07/1984');
    const date2 = getDateString('25/12/1984');

    expect(calculate(date1, date2)).toBe(173);
});

test('calculates 03/01/1989 & 03/08/1983 to output 1979', () => {
    const date1 = getDateString('03/01/1989');
    const date2 = getDateString('03/08/1983');

    expect(calculate(date1, date2)).toBe(1979);
});