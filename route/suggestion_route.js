const router = require('express').Router()
const suggestionAndProblemController = require('../controller/suggestionController')

router.post('/createSuggestionAndProblem',suggestionAndProblemController.createSuggestionAndProblem)

router.get('/getAllSuggestionAndProblem',suggestionAndProblemController.getAllSuggestionAndProblem)

router.delete('/deleteSuggestionAndProblem/:id',suggestionAndProblemController.deleteSuggestionAndProblem)

module.exports=router

