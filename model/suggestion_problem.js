const mongoose=require('mongoose')

const suggestionAndProblemSchema=mongoose.Schema({
    employeeName:String,
    email:String,
    message:String,
    deleteFlag:{
        type:String,
        default:false
    }
})
const suggestionAndProblem=mongoose.model('suggestionAndProblemSchema',suggestionAndProblemSchema)

module.exports={suggestionAndProblem}