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
        console.log(req.body);
        console.log(req.params.id);
        const data=await carousal.findOne({_id:req.params.id,deleteFlag:false})
            if(data){
                 var datas= data.carousalDetails.map((result)=> {   
                      if(result._id.toString()===req.body._id.toString()){
                        result.carousalImageTitle=req.body.carousalImageTitle,
                        result.carousalImage=req.body.carousalImage
                        //return result
                      }
                      return result
                  })
                    console.log('datas',datas);
                    res.status(200).send({success:'true',message:'successfully update',data:datas})
        }else{
            res.status(302).send({success:'false',message:'invalid id',data:[]})
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:'internal server error'})
    }
}
const deleteCarousel=async(req,res)=>{
    try{
        if(req.params.id.length==24){
            const data=await carousal.findOne({_id:req.params.id,deleteFlag:false})
            console.log("data",data);
            if(data){
                //var arrrrrr = [];
                 var datas= data.carousalDetails.map((result)=> {   
                      if(result._id.toString()===req.body._id.toString()){
                        
                    }
                    console.log('result',result);
                   // arrrrrr.push(result._id.toString())
                    return result._id.toString()
                }).indexOf(req.body._id.toString())
                 console.log('datas',datas);        
                 var yy =data.carousalDetails.splice(datas,1)
                    console.log('line 71',yy);
            //console.log(arrrrrr);

 res.status(200).send({success:'true',message:'successfully delete your data',data:yy})


            // const data=await carousal.findOne({_id:req.params.id,deleteFlag:false})
            // if(data){
            // const datas=await carousal.findByIdAndUpdate({_id:req.params.id},{deleteFlag:'true'},{returnOriginal:false})
            // if(datas){
            //     res.status(200).send({success:'true',message:'successfully deleted',data:datas})
            // }else{
            //     res.status(302).send({success:'false',message:'failed to delete data',data:[]})
            // }
        // }else{
        //     res.status(302).send({success:'false',message:'data not found',data:[]})
        // }
            }
    }else{
        res.status(400).send({success:'false',message:'invalid id'})
    }
    }catch(err){
        res.status(500).send({message:'internal server error'})
    }
}
module.exports={createCarousal,getAllCarousel,updateCarousel,deleteCarousel}