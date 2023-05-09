"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
const categoryService_1 = __importDefault(require("../service/categoryService"));
const userService_1 = __importDefault(require("../service/userService"));
class ProductController {
    constructor() {
        this.getAllProducts = async (req, res) => {
            console.log(this.productService);
            try {
                let products = await this.productService.getAllProductsFromDatabase();
                let categories = await this.categoryService.getAllCategory();
                let data = [products, categories];
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.createProduct = async (req, res) => {
            try {
                let newProduct = await this.productService.saveProduct(req.body);
                res.status(200).json(newProduct);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.updateProduct = async (req, res) => {
            try {
                let id = req.params.id;
                let editProduct = await this.productService.updateProduct(id, req.body);
                res.status(200).json({
                    Message: "update product success",
                    editProduct
                });
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.deleteProduct = async (req, res) => {
            try {
                let id = req.params.id;
                await this.productService.deleteProduct(id);
                res.status(200).json('delete product success');
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.searchProducts = async (req, res) => {
            try {
                let products = await productService_1.default.searchProduct(req.query.name);
                let categories = await categoryService_1.default.getAllCategory();
                let data = [products, categories];
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.productService = productService_1.default;
        this.categoryService = categoryService_1.default;
        this.userService = userService_1.default;
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map