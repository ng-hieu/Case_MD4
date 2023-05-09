import  {Router} from "express"

import userController from "../controller/userController";

export const userRouter = Router();
userRouter.post('/register',userController.registerUser)
userRouter.post('/login',userController.login)