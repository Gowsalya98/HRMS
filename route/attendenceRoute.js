const router = require('express').Router()
const attendence = require('../controller/attendenceController')
 
router.post('/readAndWriteDataForExcelSheet',attendence.readAndWriteDataForExcelSheet)

router.get('/getAllAttendance',attendence.getAllAttendance)
router.get('/allAttendanceDataCount',attendence.allAttendanceDataCount)

router.get('/employeeGetOwnAttendanceDetails',attendence.employeeGetOwnAttendanceDetails)

router.put('/updateAttendanceDetails/:id',attendence.updateAttendanceDetails)

router.delete('/deleteAttendanceDetails/:id',attendence.deleteAttendanceDetails)

module.exports=router

