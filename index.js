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
    let employeeRecord = {}
    employeeRecord.firstName = employee[0]
    employeeRecord.familyName = employee[1]
    employeeRecord.title = employee[2]
    employeeRecord.payPerHour = employee[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord
}

function createEmployeeRecords(employees) {
    return employees.map(e => createEmployeeRecord(e))
}

let createTimeInEvent = function (date) {
    let timeInEvent = {}
    timeInEvent.type = "TimeIn"
    timeInEvent.hour = parseInt(date.split(' ')[1])
    timeInEvent.date = date.split(' ')[0]
    this.timeInEvents.push(timeInEvent)
    return this
}

let createTimeOutEvent = function (date) {
    let timeOutEvent = {}
    timeOutEvent.type = "TimeOut"
    timeOutEvent.hour = parseInt(date.split(' ')[1])
    timeOutEvent.date = date.split(' ')[0]
    this.timeOutEvents.push(timeOutEvent)
    return this
}

let hoursWorkedOnDate = function (date) {
    let timeIn = this.timeInEvents.filter(t => t.date === date)[0]
    let timeOut = this.timeOutEvents.filter(t => t.date === date)[0]
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
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
    // before, I forgot to set the initVal to 0, so it was the first object in the array, which was messing up my math and getting the function to return undefined (because you can't add objects and numbers)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.filter(emp => emp.firstName === firstName)[0]
}

