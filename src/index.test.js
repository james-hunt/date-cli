const { calculate, getDateFromString, getOrderedDates, getDaysInMonth, getDayOfYear, getDaysFromEndOfYear, getDaysBetween } = require('./index');

describe('getDateFromString', ()=>{
    test('parses valid dateString', () => {
        const dateString = '1983-06-02';
        const date = [1983, 6, 2];
        const dateInt = 19830602;
        expect(getDateFromString(dateString)).toEqual([date, dateInt])
    });
    
    test('throws error on invalid dateString', () => {
        expect(()=>getDateFromString('1983')).toThrow();
        expect(()=>getDateFromString('abc')).toThrow();
        expect(()=>getDateFromString('1983-9-9')).toThrow();
    });
})

describe('getDaysInMonth', ()=>{
    test('returns days in month', () => {
        const january = 1;
        expect(getDaysInMonth(january)).toBe(31);
        const june = 6;
        expect(getDaysInMonth(june)).toBe(30);
    });
    
    test('returns leap year values for february', () => {
        const february = 2;
        expect(getDaysInMonth(february)).toBe(28);
        expect(getDaysInMonth(february, true)).toBe(29);
    });
})

describe('getOrderedDates', ()=>{
    test('returns dates in order', ()=>{
        const date1 = getDateFromString('1983-06-01');
        const date2 = getDateFromString('1983-06-10');

        const ordered = [date1[0], date2[0]];
    
        expect(getOrderedDates(date1, date2)).toEqual(ordered)
        expect(getOrderedDates(date2, date1)).toEqual(ordered)
    })
})

describe('getDayOfYear', ()=>{
    test('gets number of days from start of year for input', ()=>{
        const [january1] = getDateFromString('2021-01-01');
        const [march20] = getDateFromString('2021-03-20');
        const [march20LeapYear] = getDateFromString('2020-03-20');
        
        expect(getDayOfYear(january1)).toBe(1)
        expect(getDayOfYear(march20)).toBe(79)
        expect(getDayOfYear(march20LeapYear)).toBe(80)
    })
})

describe('getDaysFromEndOfYear', ()=>{
    test('get number of days from end of year for input', ()=>{
        const [february20] = getDateFromString('2021-02-20');
        const [february20LeapYear] = getDateFromString('2020-02-20');
        const [december20] = getDateFromString('2020-12-20');
        
        expect(getDaysFromEndOfYear(february20)).toBe(314)
        expect(getDaysFromEndOfYear(february20LeapYear)).toBe(315)
        expect(getDaysFromEndOfYear(december20)).toBe(11)
    })
})

describe('getDaysBetween', ()=>{
    test('1983-06-02 & 1983-06-22 to output 19', ()=>{
        const [date1] = getDateFromString('1983-06-02');
        const [date2] = getDateFromString('1983-06-22');
    
        expect(getDaysBetween(date1, date2)).toBe(19);
    })

    test('1984-07-04 & 1984-12-25 to output 173', () => {
        const [date1] = getDateFromString('1984-07-04');
        const [date2] = getDateFromString('1984-12-25');
    
        expect(getDaysBetween(date1, date2)).toBe(173);
    })

    test('1983-08-03 & 1989-01-03 to output 1979', () => {
        const [date1] = getDateFromString('1983-08-03');
        const [date2] = getDateFromString('1989-01-03');
    
        expect(getDaysBetween(date1, date2)).toBe(1979);
    });
})

describe('calculate', ()=>{
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
})
