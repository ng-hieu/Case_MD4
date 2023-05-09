import  {Router} from 'express'
import productController from "../controller/productController";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/admin";

export const productRouter = Router();

productRouter.get("",productController.getAllProducts);
productRouter.use(auth);
productRouter.post("",adminAuth,productController.createProduct);
productRouter.put("/:id",adminAuth,productController.updateProduct);
productRouter.delete("/:id",adminAuth,productController.deleteProduct);
productRouter.get("/find-by-name",adminAuth,productController.searchProducts)

