const {payslip}=require('../model/payslip_model')
const {employee}=require('../model/employee_model')
const {organization}=require('../model/organization_model')
const pdf=require('html-pdf')
const fs=require('fs')
const handleBar=require('handlebars')
const options={"height":"900px","width":"445px"}
const jwt=require('jsonwebtoken')

const createPayslip=(req,res)=>{
    try{
        const adminToken=jwt.decode(req.headers.authorization)
        const id=adminToken.userid
        console.log('line 10',id)
        organization.findOne({adminId:id,deleteFlag:"false"},(err,result)=>{
            if(err){throw err}
            else{
            console.log('line 14',result)
            req.body.companyLogo=result.companyLogo
            req.body.companyName=result.companyName
            employee.findOne({identityNumber:req.body.identityNumber,deleteFlag:'false'},(err,datas)=>{
                if(err)throw err
                console.log('line 19',datas);
                 if(datas){
                     req.body.EmployeeDetails=datas
                     payslip.create(req.body,(err,data)=>{
                        if(!err){
                            console.log('line 24',data)
                            res.status(200).send({message:"payslip created successfully",data})
                        }else{
                            res.status(400).send({message:'not created data something error'})
                        }
                     })
                 }
        })
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

const getSinglePaySlipDetails=async(req,res)=>{
    try{
        console.log('line 62',(parseInt(req.params.id)))
      const datas=await employee.aggregate([{$match:{$and:[{identityNumber:(parseInt(req.params.id))},{deleteFlag:"false"}]}}])
      console.log('line 64',datas); 
      if(datas!=null){
          console.log('line 66',datas[0].identityNumber);
      const data=await payslip.aggregate([{$match:{'EmployeeDetails.identityNumber':datas[0].identityNumber}}])
            if(data){
            console.log('line 67',data)
            res.status(200).send(data)
            }else{ res.status(400).send('invalid id')}
    }else{
        res.status(400).send('invalid id')
    }
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const updatePaySlipDetails=(req,res)=>{
    try{
        const adminToken=req.headers.authorization
        console.log('line 73',adminToken)
        payslip.findOne({_id:req.params.id},(err,datas)=>{
            if(err)throw err
            console.log('line 76',datas)
            if(datas){
                payslip.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,data)=>{
                    if(err)throw err
                    console.log('line 80',data)
                    res.status(200).send(data)
                })  
            }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const pdfCreater=(req,res)=>{
    try{
      
        payslip.findOne({_id:req.params.id,deleteFlag:"false"},(err,num)=>{
            if(num){
                console.log('line 98',num)
                let data1={"companyName":num.companyName,"companyLogo":num.companyLogo,"identityNumber":num.EmployeeDetails.identityNumber,"name":num.EmployeeDetails.name,
                "designation":{"designationName":num.EmployeeDetails.designation.designationName},"monthAndYear":num.EmployeeDetails.createdAt,"lopDays":num.lopDays,
                "basicPay":num.basicPay,"employeeShareOfPF":num.employeeShareOfPF,"HRA":num.HRA,"employeeShareOfESI":num.employeeShareOfESI,
                "medicalAllowance":num.medicalAllowance,"employerShareOfPF":num.employerShareOfPF,"conveyanceAllowance":num.conveyanceAllowance,
                "employerShareOfESI":num.employerShareOfESI,"cityCompensatory":num.cityCompensatory,"leaveDeductions":num.leaveDeductions,
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


module.exports={createPayslip,getAllPayslipDetails,pdfCreater,
    getSinglePaySlipDetails,updatePaySlipDetails}