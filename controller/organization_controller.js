const {organization} = require('../model/organization_model')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const createOrganization = async (req, res) => {
    try {
        console.log("line 7",req.body)
        organization.countDocuments({},async(err,num)=>{
        if(num==0){
                req.body.password = await bcrypt.hash(req.body.password, 10)
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
                organization.create(req.body, (err, data) => {
                        console.log("line 13",data)
                        if (err) {
                        res.status(400).send({ message: 'created process unsuccessful' })
                        } else {
                        res.status(200).send({ message: 'successfully created', data })
                         }
                })
            }else{
                res.status(400).send({message:'Already inside data for collection'}) 
            }
        })
        
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
const getOrganization = (req, res) => {
    try {
        organization.find( { deleteFlag: 'false' }, (err, data) => {
            if (err) { 
                res.status(400).send({ message: 'invalid' }) }
            else {
                console.log("line 38",data)
                res.status(200).send({ message: data })
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}
const updateOrganization = (req, res) => {
    try {
        organization.findOne({_id:req.params.id,deleteFlag: 'false' }, (err, data) => {
            console.log("line 62",data)
            if (data) {
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
                organization.findOneAndUpdate({_id:req.params.id},req.body,{ new: true }, (err, datas) => {
                    console.log('inside 47')
                    if (err) {
                        res.status(400).send({ message: 'invalid id' })
                    }
                    else {
                        console.log("line 70",datas)
                        res.status(200).send({ message: 'updated successfully', datas })
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

const deleteOrganization = (req, res) => {
    try {
        console.log('line 78',req.params.id);
        organization.findOne({_id:req.params.id, deleteFlag: 'false' }, (err, datas) => {
            if (datas) {
                organization.findOneAndUpdate({_id:req.params.id}, {$set:{deleteFlag:"true"}},{ returnOriginal: false }, (err, data) => {
                    if (err) {
                        res.status(400).send({ message: 'data does not deleted' })
                    }
                    else {
                        res.status(200).send({ message: 'data deleted successfully', data })
                    }
                })
            }else{
                res.status(400).send({message:'invalid id'})
            }
        })

    } catch (err) {
        res.status(500).send({ message: 'please check it again' })
    }
}



module.exports = {
    createOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization
}


