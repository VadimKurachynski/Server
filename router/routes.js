const Router =require('express');
const router=new Router();
const userController=require('../controller/controller')
router.post('/api',userController.createT)
router.get('/user',userController.getT)
// router.put('/api',userController.createT);
// router.delete('/api',userController.createT);



module.exports=router