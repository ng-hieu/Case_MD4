"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../model/product");
const category_1 = require("../model/category");
const data_source_1 = require("../data-source");
class ProductService {
    constructor() {
        this.getAllProducts = async () => {
            let sql = `SELECT *
                   FROM product
                            JOIN category ON product.category = category.idCategory`;
            let products = await this.productRepository.query(sql);
            return products;
        };
        this.saveProduct = async (Product) => {
            return this.productRepository.save(Product);
        };
        this.updateProduct = async (id, newProduct) => {
            let product = await this.productRepository.findOneBy({ id: id });
            if (!product) {
                return null;
            }
            return this.productRepository.update({ id: id }, newProduct);
        };
        this.findById = async (id) => {
            let product = await this.productRepository.findOneBy({ id: id });
        };
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
        this.categoryRepository = data_source_1.AppDataSource.getRepository(category_1.Category);
    }
}
//# sourceMappingURL=productService.js.map