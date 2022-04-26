const router = require('express').Router()
const employee = require('../controller/employee_controller')
const employeeValidation = require('../model/employee_model')
const multer = require('../middleware/multer')

router.post('/createEmployee',employeeValidation.validation, employee.createEmployee)
router.post('/adminAndEmployeeLogin', employee.login)

router.get('/getAllEmployee', employee.getAllEmployee)
router.get('/getSingleEmployee/:id', employee.getSingleEmployee)

router.get('/totalEmployeeCount',employee.employeeCount)

router.post('/image',multer.upload.single('image'),employee.employeeImage)

router.put('/updateEmployee/:id', employee.updateEmployee)
router.delete('/deleteEmployee/:id', employee.deleteEmployee)

router.post('/forgotPassword', employee.forgotPassword)

module.exports = router
    