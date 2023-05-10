import {Router} from 'express'
import cartController from "../controller/cartController";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/admin";
import {userAuth} from "../middleware/role";
import {userRouter} from "./user-router";

export const cartRouter = Router();
cartRouter.use(auth);
// cartRouter.get("/allcart",cartController.getAllCart);
cartRouter.get("/allcart", userAuth, cartController.getAllCart);

cartRouter.get("/getcart/:idUser", userAuth, cartController.getCartByUserId);
// cartRouter.get("/getCart/:idUser",userAuth,cartController.getCartByUserId);

cartRouter.delete("/deletecart/:idCart", userAuth, cartController.deleteCart);
// cartRouter.delete("deletecart/:idCart",userAuth,cartController.deleteCart);

cartRouter.post("/addcart", userAuth, cartController.addCart);
// cartRouter.post("/addcart",userAuth,cartController.addCart);


