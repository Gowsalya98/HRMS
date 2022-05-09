const mongoose=require('mongoose')
const {payslip,updatedPayslip}=require('../model/payslip_model')
const {employee}=require('../model/employee_model')
const {organization}=require('../model/organization_model')
const pdf=require('html-pdf')
const fs=require('fs')
const handleBar=require('handlebars')
const options={"height":"900px","width":"445px"}
const jwt=require('jsonwebtoken')

const createPayslip=async(req,res)=>{
    try{
        const adminToken=jwt.decode(req.headers.authorization)
        const id=adminToken.userid
        console.log('line 10',id)
        organization.findOne({adminId:id,deleteFlag:"false"},async(err,result)=>{
            if(result){
            console.log('line 14',result)
            req.body.companyLogo=result.companyLogo
            req.body.companyName=result.companyName
            const datas=await employee.aggregate([{$match:{identityNumber:req.body.identityNumber}}])
            console.log('line 19',datas);    
            if(datas){
                     req.body.EmployeeDetails=datas
                     payslip.create(req.body,(err,data)=>{
                        if(!err){
                            console.log('line 24',data)
                            res.status(200).send({message:"payslip created successfully",data})
                        }else{
                            res.status(400).send({message:'failed'})
                        }
                     })
                 }else{
                    res.status(400).send({message:'invalid identityNumber'})
                 }
    }else{
        res.status(400).send({message:'invalid token'})
    }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const getAllPayslipDetails=(req,res)=>{
    try{
        organization.findOne({role:'admin'},(err,datas)=>{
            if(datas){
            payslip.find({},(err,data)=>{
                if(err)throw err
                console.log('line 46',data)
                res.status(200).send(data)
            })
        }else{res.status(400).send('unauthorized person')}
        })
        
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

// const getSinglePaySlipDetails=async(req,res)=>{
//     try{
//         console.log('line 62',(parseInt(req.params.id)))
//       const datas=await employee.aggregate([{$match:{$and:[{identityNumber:(parseInt(req.params.id))},{deleteFlag:"false"}]}}])
//       console.log('line 64',datas); 
//       if(datas!=null){
//           console.log('line 66',datas[0].identityNumber);
//       const data=await payslip.aggregate([{$match:{'EmployeeDetails.identityNumber':datas[0].identityNumber}}])
//             if(data){
//             console.log('line 67',data)
//             res.status(200).send(data)
//             }else{ res.status(400).send('invalid id')}
//     }else{
//         res.status(400).send('invalid id')
//     }
//     }catch(err){
//         res.status(500).send({message:err.message})
//     }
// }

const updatePaySlipDetails=(req,res)=>{
    try{
        payslip.findOne({_id:req.params.id},(err,datas)=>{
            console.log('line 85',datas)
            if(datas){
                payslip.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true},(err,result)=>{
                    if(err)throw err
                    console.log('line 89',result);
                    req.body.payslipDetails=result
                    updatedPayslip.create(req.body,(err,data)=>{
                        if(data){
                        console.log('line 92',data)
                        res.status(200).send({message:'successfull',data})
                        }else{
                            res.status(400).send({message:'unsuccessfull'})
                        }
                    })  
                })
               
            }else{res.status(400).send({message:'invalid id'})}
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const getSingleUpdatePaySlipDetails=async(req,res)=>{
    try{
       const data=await updatedPayslip.aggregate([{$match:{"_id":new mongoose.Types.ObjectId(req.params.id)}}])
            if(data!=null){
                console.log('line 105',data)
                res.status(200).send({data:data})
            }else{
                res.status(400).send({message:'invalid id',data:[]})
            }
        
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const getAllUpdatedPaySlipDetails=async(req,res)=>{
    try{
        const datas=await organization.findOne({role:'admin',deleteFlag:'false'})
        if(datas){
            updatedPayslip.find({},(err,data)=>{
                if(data){
                    console.log('line 130',data)
                    res.status(200).send({data:data})
                }else{
                    res.status(400).send({message:'data not found',data:[]})
                }
            })
        }else{
            res.status(400).send({message:'unauthorized person'})
        }
        
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const pdfCreater=(req,res)=>{
    try{
        updatedPayslip.findOne({_id:req.params.id,deleteFlag:"false"},(err,num)=>{
            if(num){
                console.log('line 98',num)
                let data1={"companyName":num.companyName,"companyLogo":num.companyLogo,"identityNumber":num.EmployeeDetails.identityNumber,"name":num.EmployeeDetails.name,
                "designation":{"designationName":num.EmployeeDetails.designation.designationName},"monthAndYear":num.EmployeeDetails.createdAt,"lopDays":num.loseOfPay,
                "basicPay":num.basicPay,"employeeShareOfPF":num.employeeShareOfPF,"HRA":num.HRA,"employeeShareOfESI":num.employeeShareOfESI,
                "medicalAllowance":num.medicalAllowance,"employerShareOfPF":num.employerShareOfPF,"conveyanceAllowance":num.conveyanceAllowance,
                "employerShareOfESI":num.employerShareOfESI,"cityCompensatory":num.cityCompensatory,
                "otherAllowance":num.otherAllowance,"TDS":num.TDS,"otherDeduction":num.otherDeduction,"totalEarningCTC":num.totalEarningCTC,
                "totalDeduction":num.totalDeduction,"netTakeHomeSalary":num.netTakeHomeSalary}
            
                  var data =data1
                  console.log('line 107',data)
                  var dataFile=fs.readFileSync('payslip.html').toString()
                     var template = handleBar.compile(dataFile)
                console.log('line 110',template)
                      var phr = template(data)
            
                      pdf.create(phr,options).toFile("payslip.pdf",function(err,result){
                          if (err) {
                              return console.log(err)
                          }else{
                          console.log('line 117',result)
            
                          res.status(200).send({message:"successfully converted to pdf document",result})
                         }
                      })
            
            }else{res.status(400).send({message:'invalid id'})}
        })
   
          
        }catch(err){
            res.status(500).send({message:err.message})
        }
}


module.exports={createPayslip,getAllPayslipDetails,
    pdfCreater,updatePaySlipDetails,
    getSingleUpdatePaySlipDetails,
    getAllUpdatedPaySlipDetails}