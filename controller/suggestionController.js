const {suggestionAndProblem}=require('../model/suggestion_problem')
const {organization}=require('../model/organization_model')
const jwt=require('jsonwebtoken')

const createSuggestionAndProblem=(req,res)=>{
    try{
        suggestionAndProblem.create(req.body,(err,data)=>{
            if(err)throw err
            console.log('line 7',data)
            res.status(200).send({message:"successfully created",data})
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const getAllSuggestionAndProblem=async(req,res)=>{
    try{
        const datas=await organization.findOne({role:'admin',deleteFlag:'false'})
        if(datas){
            suggestionAndProblem.find({deleteFlag:"false"},(err,data)=>{
                if(err)throw err
                console.log('line 19',data)
                res.status(200).send({datas:data})
            })
        }else{
            res.status(400).send({message:'unauthorized person'})
        }
        
    }catch(err){
        res.status(500).send({message:err.message})
    }
}

const deleteSuggestionAndProblem=(req,res)=>{
    try{
        if(req.headers.authorization){
            suggestionAndProblem.findOne({_id:req.params.id,deleteFlag:'false'},(err,datas)=>{
                if(datas){
                    suggestionAndProblem.findOneAndUpdate({_id:req.params.id},{deleteFlag:'true'},{returnOriginal:false},(err,data)=>{
                        if(err)throw err
                        res.status(200).send({message:'successfully update data',data})
                    })
                }else{
                    res.status(400).send({message:'invalid id'})
                }
            })
        }else{
            res.status(400).send({message:'invalid token'})
        }
       
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
module.exports={createSuggestionAndProblem,getAllSuggestionAndProblem,deleteSuggestionAndProblem}