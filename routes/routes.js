const express = require('express')
const userController = require('../controllers/userControllers')
const loginController = require('../controllers/login')
const {verifyToken,verifyAuthToken,roleBasedAccess} = require('../middleware/middleware')
const router = express.Router();



router.post('/signup',loginController.signup)
router.post('/login',loginController.login)
router.post('/addpost',verifyAuthToken,roleBasedAccess('admin','editor'),userController.addPost);
router.post('/addlogs',userController.addLog)
router.get('/getlogs',verifyAuthToken,roleBasedAccess('admin'),userController.getLogs)
router.get('/getpost',verifyAuthToken,roleBasedAccess('admin','editor','viewer'),userController.getPost)
router.get('/getlogdetails',verifyAuthToken,roleBasedAccess('admin'),userController.loginDetails)



module.exports = router

