const { Result } = require("express-validator")
var xlsx = require("xlsx")
const excelControlller = require('./model/attendenceModel')




const createExcel=(req,res)=>{
    var wb = xlsx.readFile("Book2.xlsx")

console.log(wb.SheetNames)

var ws = wb.Sheets["Sheet1"]

var data = xlsx.utils.sheet_to_json(ws)

console.log(data)
    excelControlller.excelSheet.create(data,(err,result)=>{
    res.send({message:result})
})
}

module.exports={
    createExcel
}

