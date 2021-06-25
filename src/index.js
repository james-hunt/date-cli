const minDate = '1900-01-01';
const maxDate = '2999-12-31';

const monthsInYear = 12;
const daysInYear = 365;
const daysInLeapYear = daysInYear+1;

// Returns date and dateInt, dateInt is to simplify comparison
const dateRegex = /^\d{4}\-\d\d\-\d\d$/
const getDateFromString = str => {
    const dateString = str.trim();
    if(!dateRegex.test(dateString)){
        throw new Error("Incorrect date format. Please enter date matching yyyy-mm-dd")
    }

    const date = dateString.split('-').map(str=>parseInt(str)); // [2020, 12, 25]
    const dateInt = parseInt(dateString.replace(/-/g, '')); // 20201225

    return [date, dateInt]
}

const getDateIntFromString = (dateString) => dateString && dateRegex.test(dateString) && parseInt(dateString.replace(/-/g, ''))
const maxDateInt = getDateIntFromString(maxDate);
const minDateInt = getDateIntFromString(minDate);

// Is a leap year if divisible by 4
// Except if it's a century, then it must be divisible by 400
// https://airandspace.si.edu/stories/editorial/science-leap-year
const getIsLeapYear = (year) => {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
}

const getDaysInMonth = (month, isLeapYear) => {
    switch(month){
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
const validateDate = (dateArray) => {
    const [date, dateInt] = dateArray;

    if((minDateInt && dateInt < minDateInt) || (maxDateInt && dateInt > maxDateInt)){
        throw new Error(`Date must be between ${minDate} and ${maxDate}`);
    }

    const [ year, month, day ] = date;

    if(month < 1 || month > monthsInYear){
        throw new Error(`Month must be between 1-12`);
    }

    const isLeapYear = getIsLeapYear(year);
    const daysInMonth = getDaysInMonth(month, isLeapYear);
    if(day < 1 || day > daysInMonth){
        throw new Error(`Date must be between 1-${daysInMonth} for ${month}/${year}`);
    }
}

const requestDateInput = (prompt) => new Promise((resolve, reject) => {
    process.stdout.write(prompt)
    process.stdin.on('data', data => {
        try{
            const dateString = data.toString();
            const dateArray = getDateFromString(dateString);
            validateDate(dateArray);
            resolve(dateArray)
        }catch(e){
            reject(e);
        }
    })
})

// Use simplified dateInteger eg. "20201025" to order
// Return ordered dates
const getOrderedDates = (input1, input2) => {
    const [ date1, dateInt1] = input1;
    const [ date2, dateInt2] = input2;

    return dateInt1 < dateInt2 ? [date1, date2] : [date2, date1]
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

const getDayOfYear = date => {
    const [year, month, day] = date;
    const isLeapYear = getIsLeapYear(year);

    let dayOfYear = day;
    // Add all months before current month
    // Start index at 1 for simplicity with month formatting
    for (let i = 1; i < month; i++) {
        dayOfYear += getDaysInMonth(i, isLeapYear);
    }
    
    return dayOfYear
}

const getDaysFromEndOfYear = date => {
    const [year] = date;
    const daysInThisYear = getDaysInYear(year);
    const dayOfYear = getDayOfYear(date);
    return daysInThisYear - dayOfYear;
}

const getDaysBetween = (date1, date2) => {
    const [y1] = date1;
    const [y2] = date2;

    const isSameYear = y1 === y2;

    const doy1 = isSameYear ? getDayOfYear(date1) : getDaysFromEndOfYear(date1);
    const doy2 = getDayOfYear(date2);

    const daysBetweenYears = getDaysBetweenYears(y1, y2);

    const daysBetween = isSameYear ? doy2 - doy1 : doy1 + doy2 + daysBetweenYears;

    // Remove 1 day to coumt only full days between
    const fullDaysBetween = daysBetween - 1;

    // Clean output so we don't have negative values for same day inputs
    return fullDaysBetween > 0 ? fullDaysBetween : 0;
}

const calculate = (input1, input2) => {
    const [ date1, date2 ] = getOrderedDates(input1, input2)
    return getDaysBetween(date1, date2);
}

const main = async () => {
    // Get and validate inputs
    const input1 = await requestDateInput("Enter first date (yyyy-mm-dd): ");
    const input2 = await requestDateInput("Enter second date (yyyy-mm-dd): ");
    const daysBetween = calculate(input1, input2)

    return daysBetween
}

module.exports = {
    main,
    calculate,
    getDateFromString,
    getOrderedDates,
    getDaysInMonth,
    getDayOfYear,
    getDaysFromEndOfYear,
    getDaysBetween
}