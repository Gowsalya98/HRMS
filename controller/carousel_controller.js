const mongoose = require('mongoose')
const {carousal}=require('../model/carousel_model')

const createCarousal=async(req,res)=>{
    try{
        const data=await carousal.create(req.body)
        if(data){
            console.log('data',data)
            res.status(200).send({success:'true',message:'successfully created',data:data})
        }else{
            res.status(400).send({success:'false',message:'faileed',data:[]})
        }
    }catch(err){
        res.status(500).send({message:'internal server error'})
    }
}

const getAllCarousel=async(req,res)=>{
    try{
        const data=await carousal.aggregate([{$match:{"deleteFlag":false}}])
        if(data){
            res.status(200).send({success:'true',message:'All Data',data:data})
        }else{
            res.status(400).send({success:'false',message:'data not found',data:[]})
        }
    }catch(err){
        res.status(500).send({message:'internal server error'})
    }
}
const updateCarousel=async(req,res)=>{
    try{
        const data=await carousal.findOne({_id:req.params.id,deleteFlag:false})
            if(data){
                console.log("data",data)
    const datas=await carousal.findIndex((d=>data.carousalDetails._id=="6273ccbf6c36d8bf752ec1e9"))
                console.log(datas);
                    // data.carousalDetails.map((result)=>{
                    //     var x=result._id
                    //     console.log("line 37",x);
                    //     carousal.findOne({x:req.params.Id},(err,datas)=>{
                    //         if(err)throw err
                    //         res.status(200).send(datas)
                    //     })
                    // })
                }
        // const datas=await carousal.findOneAndUpdate({x:req.body.id},req.body,{new:true})
        //     if(data){
        //         console.log('line 41',datas);
                
        //         res.status(200).send({success:'true',message:'successfully update',data:data})
        //     }else{
        //         res.status(302).send({success:'false',message:'failed to update',data:[]}) 
        //     }
            
        // }else{
        //     res.status(302).send({success:'false',message:'invalid id',data:[]})
        // }
    }catch(err){
        console.log(err);
        res.status(500).send({message:'internal server error'})
    }
}
const deleteCarousel=async(req,res)=>{
    try{
        if(req.params.id.length==24){
            const datas=await carousal.findByIdAndUpdate({_id:req.params.id},{deleteFlag:'true'},{returnOriginal:false})
            if(datas){
                res.status(200).send({success:'true',message:'successfully deleted',data:datas})
            }else{
                res.status(302).send({success:'false',message:'failed to delete data',data:[]})
            }
        }else{
            res.status(400).send({success:'false',message:'invaild id',data:[]})
        }
    }catch(err){
        res.status(500).send({message:'internal server error'})
    }
}
module.exports={createCarousal,getAllCarousel,updateCarousel,deleteCarousel}