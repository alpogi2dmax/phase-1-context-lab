/* Your Code Here */

let oneRow = ["Gray", "Worm", "Security", 1]

let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]

function createEmployeeRecord(array) {
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
        createTimeInEvent: createTimeInEvent,
        createTimeOutEvent: createTimeOutEvent,
        hoursWorkedOnDate: hoursWorkedOnDate,
        wagesEarnedOnDate: wagesEarnedOnDate
    }
    
    
    return employeeRecord;
}



function createEmployeeRecords(arrays) {
    let employeeRecords = arrays.map(array => {
        return createEmployeeRecord(array);
    })
    return employeeRecords;
}

function createTimeInEvent(dateStamp) {
    let dateStampSplit = dateStamp.split(' ');
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(dateStampSplit[1], 10),
        date: dateStampSplit[0]
    }
    this.timeInEvents.push(timeInEvent);
    return this;
}

function createTimeOutEvent(dateStamp) {
    let dateStampSplit = dateStamp.split(' ');
    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(dateStampSplit[1], 10),
        date: dateStampSplit[0]
    }
    this.timeOutEvents.push(timeOutEvent);
    return this;
}

function hoursWorkedOnDate(dateProvided) {
    let timeIn = this.timeInEvents.find( ({date}) => date === dateProvided);
    let timeOut = this.timeOutEvents.find( ({date}) => date === dateProvided);
    let hoursWorked = timeOut.hour - timeIn.hour;
    if (timeIn.date === timeOut.date) {
        return hoursWorked / 100;
    } else {
        console.log('dates do not match');
    }
}

function wagesEarnedOnDate(dateProvided) {
    let wages = this.hoursWorkedOnDate(dateProvided) * this.payPerHour;
    return wages;
}

let employee = createEmployeeRecord(oneRow);

let employees = createEmployeeRecords(twoRows);

employee.createTimeInEvent('2044-03-15 0900');

employee.createTimeOutEvent('2044-03-15 1100');

employee.hoursWorkedOnDate('2044-03-15');

employees[0].createTimeInEvent('2044-03-15 0900');

employees[0].createTimeOutEvent('2044-03-15 1100');

employees[1].createTimeInEvent('2044-03-15 0900');

employees[1].createTimeOutEvent('2044-03-15 1100');

function findEmployeeByFirstName(array, name) {
    let employeeRecord = Object.values(array).find((employee) => employee.firstName === name);
    return employeeRecord;
}

function calculatePayroll(array) {
    let payroll = array.reduce((total, employee) => total + allWagesFor.call(employee), 0);
    return payroll;
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

