const {documentWallet,documentImage}=require('../model/documentWallet_model')
const {employee}=require('../model/employee_model')
const jwt=require('jsonwebtoken')
const mongoose = require('mongoose')

const createDocumentWallet=(req,res)=>{
    try{
        documentWallet.countDocuments({ identityNumber: req.body.identityNumber },async(err, num) => {
            console.log("line 8",num)
            if (num == 0){
    employee.findOne({identityNumber:req.body.identityNumber,deleteFlag:'false'},(err,datas)=>{
                if(datas){
                req.body.employeeDetails=datas
            console.log('line 13',req.body.employeeDetails)

            const date=new Date();
            month = '' + (date.getMonth()+1),
            day = '' + date.getDate(),
            year = date.getFullYear();
             if (month.length < 2) 
               month = '0' + month;
             if (day.length < 2) 
               day = '0' + day;
               var d = [day,month, year].join('/');
            req.body.createdAt=d
            console.log("line 25",req.body.createdAt);

            documentWallet.create(req.body, (err, data) => {
                if (err)throw err
                    console.log('line 32',data)
                    res.status(200).send({ message: 'created successfully', data })
            })
        }else{res.status(400).send({message:'please check your identity number'})}
            })
            
        }else{
            res.status(400).send({message:'your data already exist'})
        }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const imageUploadForDocumentWallet=(req,res)=>{
    try{
        
            req.body.certificate = `http://192.168.0.112:9022/upload/${req.file.filename}`
        documentImage.create(req.body,(err,data)=>{
            if(err)throw err
            console.log('line 46',data)
            res.status(200).send({message:'uploads image successfull',data})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const getAllWalletData=(req,res)=>{
    try{
        if(req.headers.authorization){
        documentWallet.find({deleteFlag:"false"},(err,data)=>{
            if(err)throw err
            console.log('line 58',data)
            res.status(200).send({data:data})
        })
    }else{
        res.status(400).send('invalid token')

    }
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
const getSingleDocumentWallet=async(req,res)=>{
    try{
            if(req.params.identityNumber){
             console.log(typeof(parseInt(req.params.identityNumber)));
            const data=await documentWallet.  aggregate([{$match:{$and:[{"employeeDetails.identityNumber":(parseInt(req.params.identityNumber))},{"deleteFlag":'false'}]}}])
            //findOne({"employeeDetails.identityNumber":req.params.identityNumber,deleteFlag:"false"})
                if (data) {
                    console.log('line 82',data);
                    res.status(200).send({ success:'true',message: 'your data',data:data })
                }
                else {
                    res.status(400).send({success:'false',message:'failed',data:[]})
                }
            }else{
                res.status(400).send({success:'false',message:'invalid id',data:[]})
            }
    }catch(err){
        res.status(500).send({ message: 'internal server error' })
    }
}

const updateDocumentWallet=(req,res)=>{
    try{
        console.log('line 30',req.params.id);
        documentWallet.findOne({_id:req.params.id,deleteFlag:'false'},(err,datas)=>{
            if(datas){
                documentWallet.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true},(err,data)=>{
                    if(err){
                        res.status(400).send({message:'something wrong data not update'})
                    }else{
                    console.log('line 48',data)
                    res.status(200).send({message:'documents updated successfully',data})
                    }
                })
            }else{
                res.status(400).send({message:'invalid id'})
            }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
const deleteDocumentWallet=(req,res)=>{
    try{
        console.log('line 59',req.params.id);
        documentWallet.findOne({_id:req.params.id,deleteFlag:'false'},(err,datas)=>{
            if(datas){
                documentWallet.findOneAndUpdate({_id:req.params.id},{$set:{deleteFlag:'true'}},{returnOriginal:false},(err,data)=>{
                    if(err){
                        res.status(400).send({message:'something wrong data not deleted'}) 
                    }else{
                    console.log('line 66',data)
                    res.status(200).send({message:'documents deleted successfully',data})
                    }
                })
            }else{
                res.status(400).send({message:'invalid id'}) 
            }
        }) 
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

module.exports={createDocumentWallet,imageUploadForDocumentWallet,getAllWalletData,getSingleDocumentWallet,
    updateDocumentWallet,deleteDocumentWallet,}