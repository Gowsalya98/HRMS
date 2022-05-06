const router = require('express').Router()
const employee = require('../controller/employee_controller')
const employeeValidation = require('../model/employee_model')
const multer = require('../middleware/multer')

router.post('/createEmployee',employeeValidation.validation, employee.createEmployee)
router.post('/adminAndEmployeeLogin', employee.login)
router.post('/forgotPassword', employee.forgotPassword)

router.get('/getAllEmployee', employee.getAllEmployee)
router.get('/getSingleEmployee', employee.getSingleEmployee)

router.post('/image',multer.upload.single('image'),employee.employeeImage)

router.put('/updateEmployee/:id', employee.updateEmployee)
router.delete('/deleteEmployee/:id', employee.deleteEmployee)


module.exports = router
    