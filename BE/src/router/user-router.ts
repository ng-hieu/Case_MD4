import  {Router} from "express"
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/role";
import userController from "../controller/userController";
import {cartRouter} from "./cart-router";
import {LockNotSupportedOnGivenDriverError} from "typeorm";

export const userRouter = Router();
userRouter.post('/register',userController.registerUser)
userRouter.post('/login',userController.login)
userRouter.use('/cart', cartRouter)
