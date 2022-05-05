const router = require('express').Router()

const  carousalControl= require('../controller/carousel_controller')
 
router.post('/createCarousal',carousalControl.createCarousal)

router.get('/getAllCarousel',carousalControl.getAllCarousel)

router.put('/updateCarousel/:id',carousalControl.updateCarousel)

router.delete('/deleteCarousel/:id',carousalControl.deleteCarousel)

module.exports=router
