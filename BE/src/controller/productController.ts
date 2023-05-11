import {Request,Response} from "express";
import productService from "../service/productService";
import categoryService from "../service/categoryService";
import userService from "../service/userService";

class ProductController{
    private productService
    private categoryService
    private userService
    constructor(){
        this.productService = productService
        this.categoryService = categoryService
        this.userService = userService
    }
    getAllProducts= async (req: Request, res: Response)=>{
        try{
            let products = await this.productService.getAllProductsFromDatabase();
            let categories = await this.categoryService.getAllCategory();
            let data = [products,categories]
            res.status(200).json(data);

        }catch(err){
            console.log("error happen in get all", err)
            res.status(500).json(err.message);
        }
    }
    createProduct= async (req: Request, res: Response)=>{
        try{
            let newProduct = await this.productService.saveProduct(req.body)
            res.status(200).json(newProduct);
        }catch(err){
            res.status(500).json(err.message);
        }
    }
    updateProduct = async (req:Request,res:Response)=>{
        try{
            let id = req.params.id;
            let editProduct = await this.productService.updateProduct(id,req.body)
            res.status(200).json({
                Message: "update product success",
                editProduct
            });
        }catch (err){
            res.status(500).json(err.message)
        }
    }
    formUpdateProduct = async (req:Request,res:Response)=>{
        try{
            console.log(456456)
            let id = req.params.id;
            let editProduct = await this.productService.showProductUpdate(id)
            let data = {
                Message: "form update product success",
                data: editProduct,
                success: true
            }
            console.log("data to response:", data)
            res.status(200).json(data);
        }catch (err){
            console.log(err.message)
            res.status(500).json({message: err.message,
            success: false})
        }
    }
    deleteProduct = async (req:Request,res:Response)=>{
        try{
            let id = req.params.id;
            await this.productService.deleteProduct(id)
            res.status(200).json('delete product success')
        }catch (err){
            res.status(500).json(err.message)
        }
    }
    searchProducts = async (req:Request,res:Response)=>{
        try{
            let products = await productService.searchProduct(req.query.name)
            let categories = await categoryService.getAllCategory()
            let data = [products,categories]
            res.status(200).json(data)

        }catch (err){
            res.status(500).json(err.message)
        }
    }
}
export default  new ProductController()

