const mongoose = require('mongoose')

const organizationSchema = mongoose.Schema({
    createdAt:String,
    companyName: String,
    companyLogo:String,
    officeImage: String,
    role: {
        type: String,
        default: 'admin'
    },
    email: String,
    password: String,
    about: String,
    websiteLink: String,
    CEO: String,
    foundedOn: String,
    headQuarters: String,
    revenue: String,
    numberOfEmployees: Number,
    founders: String,
    achievementDocuments: {
        type:String,
        default:''
    },
    subsidiaries: String,
    contact:Number,
    deleteFlag: {
        type: String,
        default: false
    },
    modifyDate:String
})


const organization = mongoose.model('organizationSchema', organizationSchema)

module.exports = { organization }