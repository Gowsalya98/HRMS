const mongoose=require('mongoose')

const carousalSchema=mongoose.Schema({
   carousalDetails:[{
    carousalImageTitle:String,
    carousalImage:String,
    deleteFlag:{
        type: Boolean,
        default: false
    }
   }],
   deleteFlag:{
    type: Boolean,
    default: false
}
})

const carousal=mongoose.model('carousalSchema',carousalSchema)

module.exports={carousal}