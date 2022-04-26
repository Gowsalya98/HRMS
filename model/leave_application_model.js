const mongoose = require('mongoose')
const { employee } = require('./employee_model')

const leaveSchema = mongoose.Schema({
    // name:String,
    // email:String,
    // identityNumber:String,
    fromDate: String,
    toDate:String,
    fullOrHalfDay: String,
    typeOfLeave: String,
    reason:String,
    reasonInDetails: String,
    uploadDocument: String,
    createdAt:String,
    employeeId: String,
    userId:Object,
    leaveApplyStatus:{
        type:String,
        default:"pending"
    },
    deleteFlag: {
        type: String,
        default: false
    }
})

const adminSetEmployeeLeaveSchema=mongoose.Schema({
    sickLeave:{
        type:Number,
        default:1
    },
    casualLeave:{
        type:Number,
        default:1
    }
})

const leaveApply = mongoose.model("leaveSchema", leaveSchema)

const adminSetEmployeeLeave=mongoose.model("adminSetEmployeeLeaveSchema",adminSetEmployeeLeaveSchema)

module.exports = { leaveApply,adminSetEmployeeLeave}