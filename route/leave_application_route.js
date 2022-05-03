const router = require('express').Router()
const leaveControll = require('../controller/leave_application_controller')
const multer = require('../middleware/multer')

//leave apply

router.post('/createLeaveApplication', multer.upload.single('uploadDocument'), leaveControll.createLeaveApplication)

router.get('/acceptLeave/:id',leaveControll.acceptLeave)
router.get('/rejectLeave/:id',leaveControll.rejectLeave)

router.get('/pendingLeaveDetailsCount',leaveControll.pendingLeaveDetailsCount)

router.get('/employeeViewOurLeaveApplicationStatus/:key',leaveControll.employeeViewOurLeaveApplicationStatus)
router.get('/adminViewEmployeeLeaveStatus/:key',leaveControll.adminViewEmployeeLeaveStatus)

router.get('/employeeViewLeaveApplication/:id',leaveControll.employeeViewLeaveApplication)

//adminSetEmployeeMonthlyLeave

router.post('/adminSetEmployeeMonthlyLeave',leaveControll.adminSetEmployeeMonthlyLeave)
router.get('/getEmployeeMonthlyLeave',leaveControll.getEmployeeMonthlyLeave)
router.put('/updateEmployeeMonthlyLeave/:id',leaveControll.updateEmployeeMonthlyLeave)

module.exports = router