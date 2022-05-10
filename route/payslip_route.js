const router = require('express').Router()
const payslipControl = require('../controller/payslip_controller')

router.post('/createPayslip',payslipControl.createPayslip)

router.get('/getAllPayslipDetails', payslipControl.getAllPayslipDetails)

router.get('/getSinglePaySlipDetails/:id', payslipControl.getSinglePaySlipDetails)

router.put('/updatePaySlipDetails/:id', payslipControl.updatePaySlipDetails)

router.get('/getAllUpdatedPayslipDetails',payslipControl.getAllUpdatedPaySlipDetails)

router.get('/getSingleUpdatePayslipDetails/:id',payslipControl.getSingleUpdatePaySlipDetails)

router.get('/pdfCreater/:id',payslipControl.pdfCreater)


module.exports = router
    