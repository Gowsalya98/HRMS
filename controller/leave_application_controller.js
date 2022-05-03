const leaveController = require('../model/leave_application_model')
const employee_controller = require('../model/employee_model')
//const organization_controller = require('../model/organization_model')
const jwt = require('jsonwebtoken')
const nodemailer= require('nodemailer')
const { throws } = require('assert')
//const webpush = require('web-push')
// const fetch=require('node-fetch')

const createLeaveApplication = async(req, res) => {
   try {
        const employeetoken = jwt.decode(req.headers.authorization)
        req.body.employeeId = employeetoken.userid
        console.log('line 18', req.file)
        console.log(req.body.employeeId)
        const id=req.body.employeeId
        employee_controller.employee.findOne({_id:id},async(err,result)=>{
            console.log(result)
            // req.body.uploadDocument = `http://192.168.0.112:9022/upload/${req.file.filename}`
           
            req.body.userId=result
            console.log(req.body.userId)
            const date = req.body.fromDate
            console.log(date)
            const detail = req.body
            const d=new Date();
            console.log('line 27',d)
            month = '' + (d.getMonth()+1),
        day = '' + d.getDate(),
        year = d.getFullYear();
         if (month.length < 2) 
           month = '0' + month;
         if (day.length < 2) 
           day = '0' + day;
           var s= [day,month, year].join('/');
        console.log("line 35",s);
        req.body.createdAt=s
            await leaveController.leaveApply.create(detail,async (err, data) => {
                if (err) {
                    console.log('inside err')
                    res.status(400).send({ message: 'creating process does not complete' })
                }
                else {
                    console.log('inside else')
                    console.log(data)
                   
                    res.status(200).send({ message: 'successfully created', data})
                }
            })
        })
       
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const adminViewEmployeeLeaveStatus=(req,res)=>{
    try{
            leaveController.leaveApply.find({deleteFlag:"false"},(err,data)=>{
                if(err){throw err}
                console.log(data)
                var datas=data.filter((result)=>{
                    if(req.params.key=='pending'){
                        if(result.leaveApplyStatus=='pending'){
                            return result
                        }
                    }
                    if(req.params.key=='accepted'){
                        if(result.leaveApplyStatus=='accepted'){
                            return result
                        }
                    }
                    if(req.params.key=='rejected'){
                        if(result.leaveApplyStatus=='rejected'){
                            return result
                        }
                    }
                })
                console.log(datas)
                res.status(200).send({message:'Employee leave status',datas})
            })
    }catch(err){res.status(500).send({message:err.message})}
}

const pendingLeaveDetailsCount=(req,res)=>{
    try{
        leaveController.leaveApply.find({leaveApplyStatus:"pending"},(err,data)=>{
            if(err) throw err
            console.log('line 148 leavePending',data.length)
            var leavePendingCount=data.length
            res.status(200).send({leavePendingCount:leavePendingCount})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const acceptLeave = (req,res)=>{
    try{
        leaveController.leaveApply.findOne({_id:req.params.id},(err,data)=>{
            console.log(data)
            if(err) throw err
            console.log(data.userId.email)
            const to = data.userId.email
            postMail(to,"Leave Application","Your Leave Application is Accept")
            leaveController.leaveApply.findOneAndUpdate({_id:req.params.id},{leaveApplyStatus:"accepted"},{new:true},(err,data)=>{
                res.status(200).send({message:"your leave is accepted",data})
            })
        })
    }
    catch(err){
        res.status(400).send({message:err})
    }
   
}

const rejectLeave = (req,res)=>{
    try{
        leaveController.leaveApply.findOne({_id:req.params.id},(err,data)=>{
         console.log(data)
            if(err) throw err
            console.log(data.userId.email)
            const to = data.userId.email
            postMail(to,"Leave Application","Your Leave Application is Rejected")
            leaveController.leaveApply.findOneAndUpdate({_id:req.params.id},{leaveApplyStatus:"rejected"},{new:true},(err,data)=>{
                res.status(200).send({message:"Your Leave Application is Rejected",data})
            })
        })
    }
    catch(err){
        res.status(400).send({message:err})
    }
   
}
const employeeViewOurLeaveApplicationStatus=(req,res)=>{
    try{
        console.log('line 129',req.params.key)
        const token=jwt.decode(req.headers.authorization)
        const id=token.userid
        
        leaveController.leaveApply.find({employeeId:id,deleteFlag:"false"},(err,data)=>{
            if(err){throw err}
            console.log('line 135',data)
            var datas=data.filter((result)=>{
                if(req.params.key=='pending'){
                    if(result.leaveApplyStatus=='pending'){
                        return result
                    }
                }
                if(req.params.key=='accepted'){
                    if(result.leaveApplyStatus=='accepted'){
                        return result
                    }
                }
                if(req.params.key=='rejected'){
                    if(result.leaveApplyStatus=='rejected'){
                        return result
                    }
                }
            })
            console.log('line 152',datas)
            res.status(200).send({message:'your leave status',datas})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const employeeViewLeaveApplication=(req,res)=>{
    try{
        console.log('line 164',req.params.id)
        leaveController.leaveApply.find({employeeId:req.params.id,deleteFlag:"false"},(err,data)=>{
            if(err)throw err
            console.log('line 166',data)
            res.status(200).send(data)
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

let transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"dhanamcse282@gmail.com",
        pass:"dhanam282"
    }
})

let postMail = function(to,subject,text){
    transport.sendMail({
        from:"dhanamcse282@gmail.com",
        to:to,
        subject:subject,
        text:text
    })
}
//adminSetEmployeeMonthlyLeave

const adminSetEmployeeMonthlyLeave=(req,res)=>{
    try{
        leaveController.adminSetEmployeeLeave.create(req.body,(err,data)=>{
            if(err)throw err
            console.log('line 166',data)
            res.status(200).send({message:'successfully set leave',data})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
const getEmployeeMonthlyLeave=(req,res)=>{
    try{
        leaveController.adminSetEmployeeLeave.find({},(err,data)=>{
            if(err)throw err
            console.log('line 208',data)
            res.status(200).send(data)
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const updateEmployeeMonthlyLeave=(req,res)=>{
    try{
        leaveController.adminSetEmployeeLeave.findOne({_id:req.params.id},(err,result)=>{
            if(result){
            leaveController.adminSetEmployeeLeave.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,data)=>{
                if(err)throw err
                console.log('line 222',data)
                res.status(200).send({message:'successfully updated data',data})
            })
        }else{res.status(400).send('invalid id')}
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

module.exports = { createLeaveApplication,acceptLeave,rejectLeave,
    employeeViewLeaveApplication,employeeViewOurLeaveApplicationStatus,
    adminViewEmployeeLeaveStatus,pendingLeaveDetailsCount,adminSetEmployeeMonthlyLeave,
    getEmployeeMonthlyLeave,updateEmployeeMonthlyLeave}



