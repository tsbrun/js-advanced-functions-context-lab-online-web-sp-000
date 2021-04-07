/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    // just return an object, and you can save what it returns
}

function createEmployeeRecords(employees) {
    return employees.map(e => createEmployeeRecord(e))
}

let createTimeInEvent = function (dateStamp) {
    // you'll get a 'duplicate declaration' error if both the param and a var w/in function share same name
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }) // DON'T DO DOUBLE WORK. Just return a function you can save, instead of saving an object within the function, which won't be available outside of it, anyway.

    return this
}

let createTimeOutEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }) 

    return this
}

let hoursWorkedOnDate = function (date) {
    let timeIn = this.timeInEvents.filter(t => t.date === date)[0]
    let timeOut = this.timeOutEvents.filter(t => t.date === date)[0]
    return (timeOut.hour - timeIn.hour) / 100
}


let wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour 
}

function calculatePayroll(employees) {
    // calculate #allWagesFor each employee
    // reduce into a single sum   
    return employees.reduce((payroll, employee) => {
        return payroll += allWagesFor.call(employee)
        // seems redundant because of implicit returns in Ruby, but you have to return in here, too, so the parent function has a value to return
    }, 0)
    // before, I forgot to set the initVal to 0, so it (initVal) was the first object in the array, which was messing up my math and getting the function to return undefined (because you can't add objects and numbers)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.filter(emp => emp.firstName === firstName)[0]
}

