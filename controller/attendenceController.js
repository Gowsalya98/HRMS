const {attendance,paginated}= require("../model/attendenceModel")
const {organization}= require('../model/organization_model')
const date = require('date-and-time')
var xlsx = require('xlsx')
const jwt = require('jsonwebtoken')


const readAndWriteDataForExcelSheet=(req,res)=>{
    try{
        // console.log('line 8',req.body)
        // var workbook = xlsx.utils.book_new();
        // var ws = xlsx.utils.json_to_sheet(req.body);
        // xlsx.utils.book_append_sheet(workbook, ws, 'Attendance');
        // xlsx.writeFile(workbook, 'HRMS_Bio.xlsx', {type: 'file'});
        var wb = xlsx.readFile('April_month report.xlsx') // Feb_month report // March_month report // April_month report //23Apr Day report //
        var ws = wb.Sheets['DailyAttendanceLogsDetails']   //DailyAttendanceLogsDetails
        const data = xlsx.utils.sheet_to_json(ws) //.slice(0,3)

          var s =data.map((m)=>
                { 
              console.log("line 19",m.Date);

        //console.log((m.Date) * 24 * 60* 60);
        // console.log((m.Date) * 24 * 60* 60);
        // console.log(typeof(m.Date));
        // m.Date = Date((m.Date) * 24* 60 * 60 *1000)   

        // var a=(4/25/2022-2/3/2092)
        // console.log('line 27',a)
        // var d=a-44593
        // console.log('line 29',d);


        var date = new Date(Math.round((m.Date- (25567 + 1)) * 86400 * 1000)).toISOString().split('T')[0]//excelsheetdate-jan1date*24*60*60*1000
       // var q=date.format(date,'YYYY-MM-DD')
        console.log('line 33:',date);
        

    // var converted_date = date.toLocaleDateString()     //toISOString().split('T')[0];
    // console.log('line 35:',converted_date);
    //return converted_date;

//    var z = new Date((m.Date) *24 * 3600 * 1000).toLocaleDateString()
//    console.log('date:',z);
    //    req.body.Date=z
    //    console.log('line 28',req.body.Date)
          m.Date=date
               return date;
   }
    );
    console.log("final:",s)
   
    console.log('line 50',data[1])
    // req.body.dataValue=data
    
    // console.log('line 51',req.body.dataValue)

  
        // var z =(data[0].Date )* 24 * 60 * 60
        // console.log('z:',z);
        // var y =Date(z)
        // console.log('y:',y);
        // req.body.Date=y
        // console.log('line 21:',Date)
        // console.log("line 20",data[0])
        attendance.create(data,(err,result)=>{
            if(err) throw err
           // console.log('line 60',result)
            res.status(200).send({message:result})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
const allAttendanceDataCount=(req,res)=>{
    try{
        attendance.find({},(err,data)=>{
            if(err)throw err
            var result=data.length;
            console.log('line 80',result)
            res.status(200).send({DataCount:result})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
const getAllAttendance = (req,res)=>{
    try{
        console.log('line 78',req.query);
        const token = jwt.decode(req.headers.authorization)
        const verifyId = token.userid
        console.log("line 23",verifyId)
        organization.findOne({_id:verifyId},(err,datas)=>{
            if(datas!=null){
            attendance.find({},(err,data)=>{
            if(data){
               // console.log('line 85',data)
              const startDate = new Date(req.query.fromDate);
              const endDate = new Date(req.query.toDate);
              
              const q=(getDatesInRange(startDate, endDate));
             console.log('line 95',q)
             var arr = [];
               arr=q
              arr.splice(0,0,((startDate.getFullYear() + "-"+"0"+(startDate.getMonth()+1)+"-"+"0"+startDate.getDate() )))
            arr[arr.length]=(((endDate.getFullYear() + "-"+"0"+(endDate.getMonth()+1)+"-"+"0"+endDate.getDate()) ));
                console.log('line 96',arr);
                var result = []
                     for(var i = 0; i< arr.length; i ++){
                     for(var j = 0; j< data.length; j++){
                          if(data[j].Date === arr[i]){
                        result.push(data[j])
                      }
             }
            }
               console.log('line 100',result);
               const value=paginated(result,req,res)
               res.status(200).send({message:'your data',value})
              // console.log(result.length);
        }else{ res.status(400).send('data not found')}
    })
}else{
    res.status(400).send('invalid token')
}
        })

        // var sq =      arr.map((element)=>{
        //         //  console.log('line 96',typeof(element));
        //          const B= data.slice(0,3).filter((valuesOfResult)=>{
        //             //  console.log('value of',valuesOfResult);
        //             //  console.log('ele',element);
        //              //  console.log('line 98',(typeof(valuesOfResult)));
        //           return  valuesOfResult.Date===element
        //              //console.log('line 98',valuesOfResult)
        //               //return valuesOfResult
        //           })

        //           return B;
        //         //  console.log('line 103',B);
        //      })
    }catch(err){
        res.status(400).send({messsage:err})
    }
    
}
function getDatesInRange(startDate, endDate) {

    const date = new Date(startDate.getTime());
  
    // Exclude start date
    date.setDate(date.getDate() + 1);
  
    const dates = [];
  
    // Exclude end dates.
    while (date < endDate) {
        var s=new Date(date)
      dates.push(s.getFullYear()
      +"-"+"0"+(s.getMonth() +1)+"-"+"0"+s.getDate());
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }
              
            //     timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
            //    console.log('time',timeDifference);

            // let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
            // console.log('days',differentDays);

            //   var arr=[]
            // for(var i=0;i<=differentDays;i++){
              
            // }
            // data.map((m)=>{
            //      console.log('line 99',m.Date)
                

            // })
        //     var dates=[]
        //     for(var i=0;i<=differentDays;i++){
        //     dates.push(new Date(new Date().setDate(new Date(firstDate).getDate()+ (i*1))).toLocaleString().split(' ').splice(0,1).join(' '))
        //     }
        //     console.log('line 107',dates)
        
        //     console.log('f',arr);
        //    res.status(200).send({data:arr})

        // }else(res.status(400).send('something error'))
        //     })
          
        // }else{res.status(400).send('invalid token')}
          


const employeeGetOwnAttendanceDetails =async(req,res)=>{
  try{
      console.log(req.query.EmployeeCode)
    const data=await attendance.aggregate([{$match:{$and:[{"EmployeeCode":(req.query.EmployeeCode)},{"deleteFlag":"false"}]}}])
            if (data!= null) {
                const startDate = new Date(req.query.fromDate);
              const endDate = new Date(req.query.toDate);
              
              const q=(getDatesInRange(startDate, endDate));
             console.log('line 194',q)
             var arr = [];
               arr=q
              arr.splice(0,0,((startDate.getFullYear() + "-"+"0"+(startDate.getMonth()+1)+"-"+"0"+startDate.getDate() )))
            arr[arr.length]=(((endDate.getFullYear() + "-"+"0"+(endDate.getMonth()+1)+"-"+"0"+endDate.getDate()) ));
                console.log('line 199',arr);
                var result = []
                     for(var i = 0; i< arr.length; i ++){
                     for(var j = 0; j< data.length; j++){
                          if(data[j].Date === arr[i]){
                        result.push(data[j])
                      }
             }
            }
            console.log('line 220',result);
            const value=paginated(result,req,res)
            res.status(200).send({message:'your data',value})
        }else{ res.status(400).send('data not found')}
   }catch(err){
      res.status(400).send({message:err})
  }
}

const updateAttendanceDetails=(req,res)=>{
    try{
        attendance.findOne({_id:req.params.id,deleteFlag:'false'},(err,datas)=>{
            if(datas){
                attendance.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,data)=>{
                    if(err){
                        res.status(400).send({message:'data not update'})
                    }else{
                        res.status(200).send({message:'update successfully',data})
                    }
                })
            }else{res.status(400).send({message:'invalid id'})}

        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const deleteAttendanceDetails=(req,res)=>{
    try{
        attendance.findOne({employeeId:req.params.id,deleteFlag:'false'},(err,datas)=>{
            if(err){
                res.status(400).send({message:'invalid id'})
            }else{
                attendance.findOneAndUpdate({employeeId:req.params.id},{deleteFlag:"true"},{returnOriginal:false},(err,data)=>{
                    if(err){
                        res.status(400).send({message:'data not deleted'})
                    }else{
                        res.status(200).send({message:'successfully delete your data',data})
                    }
                })
            }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
   

module.exports={
    getAllAttendance,employeeGetOwnAttendanceDetails,updateAttendanceDetails,deleteAttendanceDetails,
    readAndWriteDataForExcelSheet,allAttendanceDataCount
}
