import  {Router} from 'express'
import productController from "../controller/productController";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/admin";

export const productRouter = Router();

productRouter.get("/",productController.getAllProducts);
productRouter.get("/find-by-name", productController.searchProducts)
productRouter.use(auth);
productRouter.get("/:id",adminAuth,productController.formUpdateProduct);
productRouter.get("/home",productController.getAllProducts);
productRouter.post("/",adminAuth,productController.createProduct);
productRouter.put("/:id",adminAuth,productController.updateProduct);
productRouter.get("/:id",adminAuth,productController.formUpdateProduct);
productRouter.delete("/:id",adminAuth,productController.deleteProduct);


