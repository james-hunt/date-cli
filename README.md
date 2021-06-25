# date-cli
## Test Description

This is required to be a CLI application implemented in node.js using only primitives,
built-in language functions and no external npm dependencies. You should build the
application so it accepts input from stdin. Please do guide the user through the steps
required to use your application, and do validate your input.
A complete solution should include your source code, documentation and unit tests.
You can upload the source code publicly to Github and share the link with us via
email.

## Problem

You need to calculate the distance in whole days between two dates, counting only
the days in between those dates, i.e. 01/01/2001 to 03/01/2001 yields “1”. The valid
date range is between 01/01/1900 and 31/12/2999, all other dates should be
rejected.
When testing your solution, use the following sample data to demonstrate your code
works:
* 2/6/1983 to 22/6/1983 19 days
* 4/7/1984 to 25/12/1984 173 days
* 3/1/1989 to 3/8/1983 2036 days

Looks like there's an issue with the last test. This should be 1/3/1989 to 3/8/1983 to yield 2036 days.
Tested with moment to be sure
```js
// Test Result
moment('1989-01-03').diff(moment('1983-08-03'), 'days') - 1 // 1979 days

// Values that match expected result
moment('1989-03-01').diff(moment('1983-08-03'), 'days') - 1 // 2036 days
```


## Getting Started
### Install Node.js
Make sure node.js is installed on your system. Follow the instructions at [nodejs.org](https://nodejs.org/en/download/)

### Run CLI locally
Download the Git project to your local machine
```sh
git clone https://github.com/james-hunt/date-cli.git
cd date-cli
```
Run command and follow prompts
```sh
node index.js
# Enter first date (yyyy-mm-dd): XXX
# Enter second date (yyyy-mm-dd): XXX
# Days between: XXX
```

### Runing Unit Tests
Install npm dependencies
```sh
yarn
# OR
npm install
```

Run tests
```sh
yarn test
```