import express from 'express';
import {testController,registerController,loginController, forgotPasswordController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
// router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController)

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get("/test", requireSignIn,isAdmin, testController); //we can add many middlewares between "/test" and controlleer

//protected User route auth(or authentication)
router.get('/user-auth', requireSignIn, (req, res) =>{
    res.status(200).send({ok: true});  // here we can use third parameter as controller
} ) //here we are using get method because we are sending a request

//protected Admin route auth(or authentication)
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) =>{
    res.status(200).send({ok: true});  // here we can use third parameter as controller
} ) //here we are using get method because we are sending a request


export default router;