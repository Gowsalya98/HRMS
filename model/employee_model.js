const mongoose = require('mongoose')
const { body } = require('express-validator')


const bankDetailSchema=mongoose.Schema({
    uanNumber:String,
    panNumber:String,
    esiNumber:String,
    pfNumber:String,
    accountNumber:String,
    branchName:String,
    accountHolderName:String,
    IFSCCode:String
})

const designationSchema = mongoose.Schema({
    designationName: String,
    projectManager: String,
    teamLeader: String
})

const employeeSchema = mongoose.Schema({
    createdAt:String,
    email: String,
    password: String,
    newPassword: String,
    confirmPassword: String,
    name: String,
    bloodGroup: String,
    gender: String,
    dateOfBirth: String,
    contact: Number,
    address: String,
    designation: designationSchema,
    dateOfJoining: String,
    yearsOfExperience: String,
    profileImage: String,
    uploadDocument: String,
    identityNumber: Number,
    role: {
        type:String,
        default:"employee"
    },
    bankDetails:bankDetailSchema,
    deleteFlag: {
        type: String,
        default: false
    },
    adminId: String,
    modifyDate:String
})

const imageSchema=mongoose.Schema({
   image:String
})

const randomString = (length) => {
    let random = "";
    let character = "0123456789";
    for (let i = 0; i <= length; i++) {
        random += character.charAt(Math.floor(Math.random() * character.length));
    }
    // console.log(random)
    return random;
};


const otpSchema = mongoose.Schema({
    userDetails: {
        type:Object
    },
    organizationDetails:{
        type:Object
    },
    otp: Number
})

const validation = [
    body('email').trim().isEmail().withMessage('invalid email'),
    body('password').trim().isLength({ min: 3 }).withMessage('password must be 3 character')
]

const employee = mongoose.model('employeeSchema', employeeSchema)
const image =mongoose.model('imageSchema',imageSchema)
const sendOtp = mongoose.model('otpSchema', otpSchema)


module.exports = {
    validation,
    employee,
    sendOtp,
    image,
    randomString
}