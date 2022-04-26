const mongoose=require('mongoose')
const dbUrl=require('./url_config')

mongoose.connect(dbUrl.url,{dbName:'HRMS'},()=>{
    console.log('db connected')
})
