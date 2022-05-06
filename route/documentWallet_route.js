 const router=require('express').Router()
 const documentWalletController=require('../controller/documentWallet_controller')
 const multer=require('../middleware/multer')

 
 router.post('/certificate',multer.upload.single('certificate'),documentWalletController.imageUploadForDocumentWallet)
 router.post('/createDocumentWallet',documentWalletController.createDocumentWallet)

 router.get('/getAllWalletData',documentWalletController.getAllWalletData)
 router.get('/getSingleDocumentWallet/:documentId',documentWalletController.getSingleDocumentWallet)
 
 router.put('/updateDocumentWallet/:id',documentWalletController.updateDocumentWallet)
 router.delete('/deleteDocumentWallet/:id',documentWalletController.deleteDocumentWallet)

 module.exports=router