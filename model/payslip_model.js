const mongoose = require('mongoose')

const payslipSchema=mongoose.Schema({
    companyName:String,
    companyLogo:String,
    basicPay:String,
    employeeShareOfPF:String,
    HRA:String,
    employeeShareOfESI:String,
    medicalAllowance:String,
    employerShareOfPF:String,
    conveyanceAllowance:String,
    employerShareOfESI:String,
    cityCompensatory:String,
    allowance:String,
    leaveDeductions:String,
    otherAllowance:String,
    TDS:String,
    EmployeeDetails:{
        type:Object
    }
})

const payslip = mongoose.model('payslipSchema', payslipSchema)


module.exports={payslip}