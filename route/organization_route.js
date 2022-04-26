const router = require('express').Router()
const organization = require('../controller/organization_controller')
const organizationValidation = require('../model/employee_model')

router.post('/createOrganization',organizationValidation.validation, organization.createOrganization)
router.get('/getOrganization', organization.getOrganization)

router.put('/updateOrganization/:id', organization.updateOrganization)
router.delete('/deleteOrganization/:id', organization.deleteOrganization)

module.exports = router