import express, {Router} from 'express'
import productController from "../controller/productController";
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/role";

export const productRouter = Router();

productRouter.get("",productController.getAllProducts);
productRouter.use(auth);
productRouter.post("",userAuth,productController.createProduct);
productRouter.put("/:id",userAuth,productController.updateProduct);
productRouter.delete("/:id",userAuth,productController.deleteProduct);
productRouter.get("/find-by-name",userAuth,productController.searchProducts)

