const {documentWallet,documentImage}=require('../model/documentWallet_model')
const {employee}=require('../model/employee_model')
const jwt=require('jsonwebtoken')

const createDocumentWallet=(req,res)=>{
    try{
        console.log('line 8',(typeof(req.body.identityNumber)));
        employee.findOne({identityNumber:req.body.identityNumber,deleteFlag:'false'},(err,datas)=>{
            if(err){res.status(400).send({message:'invalid identityNumber'})}
            else{
            console.log('line 11',datas)
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
                if (err) {
                    res.status(400).send({ message: err })
                }
                else {
                    console.log('line 32',data)
                    res.status(200).send({ message: 'created successfully', data })
                }
            })
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
        documentWallet.find({deleteFlag:"false"},(err,data)=>{
            if(err)throw err
            console.log('line 58',data)
            res.status(200).send({data:data})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const updateDocumentWallet=(req,res)=>{
    try{
        console.log('line 30',req.params.id);
        documentWallet.findOne({_id:req.params.id,deleteFlag:'false'},(err,datas)=>{
            if(err){throw err}
            console.log('line 33',datas)
            if(datas){
                documentWallet.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,data)=>{
                    if(err)throw err
                    console.log('line 48',data)
                    res.status(200).send({message:'documents updated successfully',data})
                })
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
            if(err){throw err}
            console.log('line 62',datas)
            if(datas){
                documentWallet.findOneAndUpdate({_id:req.params.id},{$set:{deleteFlag:'true'}},{returnOriginal:false},(err,data)=>{
                    if(err)throw err
                    console.log('line 66',data)
                    res.status(200).send({message:'documents deleted successfully',data})
                })
            }
        }) 
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

module.exports={createDocumentWallet,imageUploadForDocumentWallet,getAllWalletData,
    updateDocumentWallet,deleteDocumentWallet,}