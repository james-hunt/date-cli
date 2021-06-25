const minDate = '01/01/1900';
const maxDate = '31/12/2999';

const monthsInYear = 12;
const daysInYear = 365;
const daysInLeapYear = daysInYear+1;

// Simple and allows for any separator
// Also removes need to check isNan etc. later since input has to be 8 digits
// Should we be more strict on separator?
// Could use regex or even check string location of `/` if it needs to be strict
const getDateString = (str) => {
    const dateString = str.trim().replace(/[^\d]/g, '');
    if(dateString.length !== 8){
        throw new Error("Date is incorrect. Please enter date in format dd/mm/yyyy")
    }
    
    return dateString
}

const getDay = dateString => parseInt(dateString.substr(0, 2));
const getMonth = dateString => parseInt(dateString.substr(2, 2));
const getYear = dateString => parseInt(dateString.substr(-4));

// Make these dynamic in case we want to change the max/min constants later;
const maxDateString = getDateString(maxDate);
const minDateString = getDateString(minDate);
const maxYear = getYear(maxDateString);
const minYear = getYear(minDateString);

// Is a leap year if divisible by 4
// Except if it's a century, then it must be divisible by 400
// https://airandspace.si.edu/stories/editorial/science-leap-year
const getIsLeapYear = (yearInt) => {
    return yearInt % 100 === 0 ? yearInt % 400 === 0 : yearInt % 4 === 0
}

const getDaysInMonth = (monthInt, isLeapYear) => {
    switch(monthInt){
        case 4: 
        case 6:
        case 9:  
        case 11: 
            return 30;
        case 2: 
            return isLeapYear ? 29 : 28;
        default:
            return 31;
    }
}

// Is X must be "between" confusing? Should it be "between x inclusive"?
const validateDate = dateString => {
    const year = getYear(dateString);
    if(year > maxYear || year < minYear){
        throw new Error(`Year must be between ${minYear}-${maxYear}`);
    }

    const month = getMonth(dateString);
    if(month < 1 || month > monthsInYear){
        throw new Error(`Month must be between 1-12`);
    }

    const isLeapYear = getIsLeapYear(year);
    const day = getDay(dateString);
    const daysInMonth = getDaysInMonth(month, isLeapYear);
    if(day < 1 || day > daysInMonth){
        throw new Error(`Date must be between 1-${daysInMonth} for ${dateString.substr(2,2)}/${year}`);
    }
}

const requestDateInput = (prompt) => new Promise(resolve => {
    process.stdout.write(prompt)
    process.stdin.on('data', data => {
        try{
            const inputString = data.toString();
            const dateString = getDateString(inputString);
            validateDate(dateString);
            resolve(dateString)
        }catch(e){
            console.warn('ERROR:', e.message);
            process.exit();
        }
    })
})

const getIsCorrectOrder = (a, b) => {
    // Only continue comparison if same year
    const y1 = getYear(a);
    const y2 = getYear(b);
    if(y1 !== y2){
        return y1 < y2
    }

    // Only continue comparison if same month
    const m1 = getMonth(a);
    const m2 = getMonth(b);
    if(m1 !== m2){
        return m1 < m2
    }
    
    const d1 = getDay(a);
    const d2 = getDay(b);
    if(d1 !== d2){
        return d1 < d2
    }
}

const getDaysInYear = yearInt => getIsLeapYear(yearInt) ? daysInLeapYear : daysInYear

const getDaysBetweenYears = (y1, y2) => {
    // Return if no full years between
    if(y2 - y1 < 2){
        return 0
    }

    let days = 0;
    for (let i = y1+1; i < y2; i++) {
        days += getDaysInYear(i);
    }

    return days
}

const getDayOfYear = dateString => {
    const year = getYear(dateString);
    const month = getMonth(dateString);
    const day = getDay(dateString);
    const isLeapYear = getIsLeapYear(year);

    let dayOfYear = day;
    // Add all months before current month
    // Start index at 1 for simplicity with month formatting
    for (let i = 1; i < month; i++) {
        dayOfYear += getDaysInMonth(i, isLeapYear);
    }
    
    return dayOfYear
}

const getDaysFromEndOfYear = dateString => {
    const year = getYear(dateString);
    const daysInThisYear = getDaysInYear(year);
    const dayOfYear = getDayOfYear(dateString);
    return daysInThisYear - dayOfYear;
}

const getDaysBetween = (a, b) => {
    const y1 = getYear(a);
    const y2 = getYear(b);

    const isSameYear = y1 === y2;

    const doy1 = isSameYear ? getDayOfYear(a) : getDaysFromEndOfYear(a);
    const doy2 = getDayOfYear(b);

    const daysBetweenYears = getDaysBetweenYears(y1, y2);

    const daysBetween = isSameYear ? doy2 - doy1 : doy1 + doy2 + daysBetweenYears;

    // Remove 1 day to coumt only full days between
    const fullDaysBetween = daysBetween - 1;

    // Clean output so we don't have negative values for same day inputs
    return fullDaysBetween > 0 ? fullDaysBetween : 0;
}

const calculate = (input1, input2) => {
    // Order dates to simplify calculation
    const isCorrectOrder = getIsCorrectOrder(input1, input2);
    const d1 = isCorrectOrder ? input1 : input2;
    const d2 = isCorrectOrder ? input2 : input1;
    return getDaysBetween(d1, d2);
}

const main = async () => {
    // Get and validate inputs
    const input1 = await requestDateInput("Enter first date (dd/mm/yyyy): ");
    const input2 = await requestDateInput("Enter second date (dd/mm/yyyy): ");

    const daysBetween = calculate(input1, input2);

    console.log(daysBetween);
    process.exit();
}

module.exports = {
    main,
    calculate,
    getDaysBetween,
    getDaysFromEndOfYear,
    getDayOfYear,
    getDaysBetweenYears,
    getDaysInYear,
    getIsCorrectOrder,
    validateDate,
    getDaysInMonth,
    getIsLeapYear,
    getDateString
}