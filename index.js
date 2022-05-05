const express = require('express')
const cors = require('cors')

const dotenv = require('dotenv').config()

const employee = require('./route/employee_route')
const organization = require('./route/organization_route')
const leaveApplication = require('./route/leave_application_route')
const attendanceSheet = require('./route/attendenceRoute')
const payslip=require('./route/payslip_route')
const documentWallet=require('./route/documentWallet_route')
const suggestionAndProblem=require('./route/suggestion_route')
const carousal=require('./route/carousel_routes')

require('./config/db_config')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: 'true' }))
app.use('/upload', express.static('/home/fbnode/Dhanalakshmi/HRMS/upload'))
app.use(cors({ credentials: true, origin: true }))
app.options('*', cors())

app.use('/HRMS/employee', employee)
app.use('/HRMS/organization', organization)
app.use('/HRMS/leaveApplication', leaveApplication)
app.use('/HRMS/attendance',attendanceSheet)
app.use('/HRMS/payslip',payslip)
app.use('/HRMS/documentWallet',documentWallet)
app.use('/HRMS/suggestionAndProblem',suggestionAndProblem)
app.use('/HRMS/carousal',carousal)

app.listen(process.env.PORT, () => {
    console.log(`server is listening on the port ${process.env.PORT}`)
})

app.get('/',(req,res)=>{
    res.status(200).send("HRMS")
})