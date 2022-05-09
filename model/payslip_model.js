const mongoose = require('mongoose')

const payslipSchema=mongoose.Schema({
    companyName:String,
    companyLogo:String,
    basicPay:String,
    monthAndYear:{
        type:String,
        default:''
    },
    lossOfPay:{
        type:String,
        default:''
    },
    employeeShareOfPF:String,
    HRA:String,
    employeeShareOfESI:String,
    medicalAllowance:String,
    employerShareOfPF:String,
    conveyanceAllowance:String,
    employerShareOfESI:String,
    cityCompensatory:String,
    allowance:String,
    otherDeduction:String,
   // leaveDeductions:String,
    otherAllowance:String,
    TDS:String,
    EmployeeDetails:{
        type:Object
    }
})

const updatedPayslipSchema=mongoose.Schema({
    payslipDetails:{
        type:Object
    }
})
const payslip = mongoose.model('payslipSchema', payslipSchema)

const updatedPayslip=mongoose.model('updatedPayslip',updatedPayslipSchema)

module.exports={payslip,updatedPayslip}