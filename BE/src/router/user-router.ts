import  {Router} from "express"
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/role";
import userController from "../controller/userController";

export const userRouter = Router();
userRouter.post('/register',userController.registerUser)
userRouter.post('/login',userController.login)

