const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
    fromDate:String,
    toDate:String,
    Date:String,	 
    EmployeeCode:String,
    EmployeeName:String,	
    Company :String,	
    Department:String,	
    Category:String,	
    Degination:String,
    Grade:String,
    Team:String,
    Shift:String, 
    InTime:String, 	
    OutTime:String,	 
    Duration:String,	
    LateBy:String,
    EarlyBy:String,
    Status:String,
    PunchRecords:String, 	
    Overtime:String,
    deleteFlag:{
        type:String,
        default:false
    }
})
function paginated(model,req,res) {
    // return () => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = (page) * limit
    const result = {}
    if (endIndex < model.length) {
        result.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        result.previous = {
            // page: page - 1,
            limit: limit
        }
    }
    // console.log(result)
    result.result = model.slice(startIndex, endIndex)
    // result.result = model.find().limit(limit).skip(startIndex).exec()
    // res.send(result)
    return result
    // next()
    // }
}

const attendance = mongoose.model("attendance",attendanceSchema)

module.exports={
    attendance,paginated
}