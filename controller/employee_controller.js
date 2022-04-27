const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const {employee,sendOtp,image,randomString} = require('../model/employee_model')
const { validationResult } = require('express-validator')
const {organization} = require('../model/organization_model')
const fast2sms = require('fast-two-sms')

const createEmployee = (req, res) => {
    try {
        employee.countDocuments({ email: req.body.email },async(err, num) => {
            console.log("line 12",num)
            if (num == 0){
                const admintoken = jwt.decode(req.headers.authorization)
                const id = admintoken.userid
                req.body.password = await bcrypt.hash(req.body.password, 10)
                
                const date=new Date();
                // console.log('line 27',date)
                month = '' + (date.getMonth()+1),
            day = '' + date.getDate(),
            year = date.getFullYear();
             if (month.length < 2) 
               month = '0' + month;
             if (day.length < 2) 
               day = '0' + day;
               var d = [day,month, year].join('/');
            console.log("line 35",d);
            req.body.createdAt=d

                const modiDate=new Date();
                console.log('line 38',modiDate)
                month = '' + (modiDate.getMonth()+1),
            day = '' + modiDate.getDate(),
            year = modiDate.getFullYear();
             if (month.length < 2) 
               month = '0' + month;
             if (day.length < 2) 
               day = '0' + day;
               var s = [day,month, year].join('/');
            // console.log("line 47",s);
                req.body.modifyDate=s;
                
                employee.create(req.body, (err, data) => {
                    if (err) {
                        res.status(400).send({ message: "doesn't create" })
                    }
                    else {
                        console.log('line 23',data)
                        res.status(200).send({ message: 'created successfully', data })
                    }
                })
            }
            })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }
}    

const login = (req, res) => {
    try {
        console.log('line 50',req.body)
        if (req.body.role == 'admin') {
            organization.findOne({ email: req.body.email,deleteFlag:"false"},async (err, data) => {
                console.log("line 52",data)
                if (err) {
                    res.status(400).send({message: 'invalid email/password '})
                }
                else {
                    const verifyPassword = await bcrypt.compare(req.body.password,data.password)
                    if (verifyPassword === true) {
                        const token = await jwt.sign({ userid: data._id }, process.env.SECRET_KEY)
                        res.status(200).send({ message: 'login successfull',token,data })
                    } else {
                        res.status(400).send({ message: 'password does not match' })
                    }
                } 
            })
        } else {
            employee.findOne({ email: req.body.email,deleteFlag:"false"}, async (err, data) => {
                console.log("line 68",data)
                if (data) {
                    const password = await bcrypt.compare(req.body.password, data.password)
                    if (password === true) {
                        const token = await jwt.sign({ userid: data._id }, process.env.SECRET_KEY)
                        res.status(200).send({ message: 'Login Successfull',token,data })
                    }
                    else { res.send('invalid password') }
                }
                else {
                    res.send({ message: 'invalid email/password ', data})
                }
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


const forgotPassword = async (req, res) => {
    try {
        if (req.body.otp != null) {
            sendOtp.findOne({ otp: req.body.otp }, async (err, datas) => {
                console.log("line 106", datas)
                if (!datas.employeeDetails.role=='employee') {
                    employee.findOne({ email: req.body.email }, async (err, data) => {
                        console.log("line 109", data)
                        if (data) {
                            if (req.body.email == data.email||req.body.contact==data.contact) {
                                console.log("line 112", req.body.email)
                                console.log("line 113", data.email)

                                if (req.body.newPassword == req.body.confirmPassword) {
                                    console.log("line 116", req.body.newPassword)
                                    console.log("line 117", req.body.confirmPassword)

                                    req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10)
                                    employee.findOneAndUpdate({email:req.body.email }, { $set:{password: req.body.newPassword} },{new:true}, (err, dataFull) => {
                                        if (err) { throw err }
                                        else {
                                            res.status(200).send({ message: "Reset Password Successfully", dataFull })
                                        }
                                    })
                                } else { res.status(400).send({ message: 'password does not match' }) }
                            } else { res.status(400).send({ message: 'email does not match ' }) }
                        }
                    })
                }else if(datas.organizationDetails.role=='admin'){
                    organization.findOne({ email: req.body.email }, async (err, data) => {
                        console.log("line 132", data)
                        if (data) {
                            if (req.body.email == data.email||req.body.contact==data.contact) {
                                console.log("line 135", req.body.email)
                                console.log("line 136", data.email)

                                if (req.body.newPassword == req.body.confirmPassword) {
                                    console.log("line 139", req.body.newPassword)
                                    console.log("line 140", req.body.confirmPassword)

                                    req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10)
                                    organization.findOneAndUpdate({email:req.body.email }, { $set:{password: req.body.newPassword} },{new:true}, (err, dataFull) => {
                                        if (err) { throw err }
                                        else {
                                            res.status(200).send({ message: "Reset Password Successfully", dataFull })
                                        }
                                    })
                                } else { res.status(400).send({ message: 'password does not match' }) }
                            } else { res.status(400).send({ message: 'email does not match ' }) }
                        }
                    })
                } else { res.status(400).send({ message: 'invalid otp' }) }
            })
        } else {
            employee.findOne({ email: req.body.email,deleteFlag:'false'},async (err, data) => {
                console.log("line 157", data)
                if (data==null) {
                    organization.findOne({email:req.body.email,deleteFlag:'false'},(err,dataResult)=>{
                        if(dataResult){
                            if (req.body.email == dataResult.email && req.body.contact==dataResult.contact) {
                                const otp = randomString(3)
                                console.log("otp", otp)
                                req.body.organizationDetails=dataResult
                                sendOtp.create({ organizationDetails:req.body.organizationDetails, otp: otp },async (err, datas) => {
                                    console.log("line 166", datas)
                                    if (err) { throw err }
                                    if (datas) {
                                        console.log("line 169", datas)
                                        
                                        postMail(req.body.email, 'otp for changing password', otp)
                                        console.log('line 172', otp)
        
                                        const response = await fast2sms.sendMessage({ authorization: process.env.OTPKEY,message:otp,numbers:[req.body.contact]})
        
                                        res.status(200).send({ message: "verification otp send your email and your mobile number", response,otp })
                                        setTimeout(() => {
                                            sendOtp.findOneAndDelete({ otp: otp }, (err, result) => {
                                               
                                                if (err) { throw err }
                                                console.log("line 181", result)
                                            })
                                        }, 200000)
                                    }
                                })
                            } else { res.status(400).send({ message: 'email and contact does not match' }) }
                        } else { res.status(400).send({ message: 'invalid id' }) }
                    })
                }else{
                    if (req.body.email == data.email && req.body.contact==data.contact) {
                        const otp = randomString(3)
                        console.log("otp", otp)
                        req.body.userDetails=data
                        sendOtp.create({ userDetails:req.body.userDetails, otp: otp },async (err, datas) => {
                            console.log("line 195", datas)
                            if (err) { throw err }
                            if (datas) {
                                console.log("line 198", datas)
                                
                                postMail(req.body.email, 'otp for changing password', otp)
                                console.log('line 201', otp)

                                const response = await fast2sms.sendMessage({ authorization: process.env.OTPKEY,message:otp,numbers:[req.body.contact]})

                                res.status(200).send({ message: "verification otp send your email and your mobile number", response,otp })
                                setTimeout(() => {
                                    sendOtp.findOneAndDelete({ otp: otp }, (err, result) => {
                                       
                                        if (err) { throw err }
                                        console.log("line 210", result)
                                    })
                                }, 50000)
                            }
                        })
                    } else { res.status(400).send({ message: 'email and contact does not match' }) }
                } 
            })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nishagowsalya339@gmail.com',
        pass: '8760167075'
    }
})
const postMail = function (to, subject, text) {
    return transport.sendMail({
        from: "nishagowsalya339@gmail.com",
        to: to,
        subject: subject,
        text: text,
    })
}
const getAllEmployee = (req, res) => {
    try {
        const adminToken = jwt.decode(req.headers.authorization)
        const id = adminToken.userid
        employee.find({ deleteFlag: 'false' }, (err, data) => {
            if (err) {
                res.status(400).send({ message: 'unauthorized' })
            }
            else {
                console.log('line 188',data.length)
                res.status(200).send( data )
            }
        })
    } catch (err) {
        res.status(500).send({ message: 'please check it again' })
    }
}


const employeeCount=(req,res)=>{
    try{
        employee.find({deleteFlag:"false"},(err,data)=>{
            if(err) throw err
            console.log('line 196 employee count',data.length)
            var totalEmployeeCount=data.length
            res.status(200).send({totalEmployeeCount:totalEmployeeCount})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const getSingleEmployee = (req, res) => {
    try {
        // const employeetoken = jwt.decode(req.headers.authorization)
        // const id = employeetoken.userid
        console.log('line 201',req.params.id)
        employee.findOne({ _id: req.params.id, deleteFlag: 'false' }, (err, data) => {
            if (err) {
                res.status(400).send({ message: 'unauthorized' })
            }
            else {
                console.log('line 206',data)
                res.status(200).send({ message: data })
            }
        })
    } catch (err) {
        res.status(500).send({ message: 'please check it again' })
    }
}
const employeeImage=(req,res)=>{
    try{
        req.body.image = `http://192.168.0.112:9022/upload/${req.file.filename}`
        image.create(req.body,(err,data)=>{
            if(err)throw err
            console.log('line 216',data)
            res.status(200).send({message:'uploads image successfull',data})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
const updateEmployee = (req, res) => {
    try {
        console.log('line 230',req.params.id)
        employee.findOne({_id:req.params.id}, { deleteFlag: 'false' }, (err, datas) => {
            console.log("line 231",datas)
            if (datas) {
                const modiDate=new Date();
                month = '' + (modiDate.getMonth()+1),
            day = '' + modiDate.getDate(),
            year = modiDate.getFullYear();
             if (month.length < 2) 
               month = '0' + month;
             if (day.length < 2) 
               day = '0' + day;
               var s = [day,month, year].join('/');
                req.body.modifyDate=s;
                employee.findOneAndUpdate({_id:req.params.id}, req.body, { new: true }, (err, data) => {
                    console.log('line 234',data)
                    if (err) {
                        res.status(400).send({ message: 'invalid id' })
                    }
                    else {
                        console.log('line 239',data)
                        res.status(200).send({ message: 'updated successfully', data })
                    }
                })
            } else {
                res.status(400).send({ message: 'invalid id' })
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const deleteEmployee = (req, res) => {
    try {
        const token = jwt.decode(req.headers.authorization)
        const id = token.userid
        console.log('line 248',id)
        console.log('line 249',req.params.id)
        employee.findOne({_id:req.params.id},{deleteFlag:'false'},(err,data)=>{
            if(err)throw err
            console.log('line 261',data)
            employee.findOneAndUpdate({ _id:req.params.id }, {$set:{ deleteFlag: "true" }}, { returnOriginal: false }, (err, datas) => {
                if (err) {
                    res.status(400).send({ message: 'data does not deleted' })
                }
                else {
                    console.log('line 254',datas)
                    res.status(200).send({ message: 'data deleted successfully',datas})
                }
            })
        })
       
    } catch (err) {
        res.status(500).send({ message: 'please check it again' })
    }
}




module.exports = {
    createEmployee,
    login,
    forgotPassword,
    getAllEmployee,
    employeeCount,
    getSingleEmployee,
    employeeImage,
    updateEmployee,
    deleteEmployee
}
