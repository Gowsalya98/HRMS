const mongoose=require('mongoose')

const documentWalletSchema=mongoose.Schema({
    createdAt:String,
    certificate:[String],
    employeeDetails:{
        type:Object
    },
    deleteFlag:{
        type:String,
        default:false
    }
})
const documentImageSchema=mongoose.Schema({
    certificate:String,
    deleteFlag:{
        type:String,
        default:false
    }
})

const documentWallet=mongoose.model('documentWalletSchema',documentWalletSchema)
const documentImage=mongoose.model('documentImageSchema',documentImageSchema)


module.exports={documentWallet,documentImage}