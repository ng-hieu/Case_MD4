import {Product} from "../model/product";
import {Category} from "../model/category";
import {AppDataSource} from "../data-source";

class ProductService {
    private productRepository
    private categoryRepository

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
        this.categoryRepository = AppDataSource.getRepository(Category)
    }

    getAllProducts = async () => {
        let sql = `SELECT *
                   FROM product
                            JOIN category ON product.category = category.idCategory`

        let products = await this.productRepository.query(sql)
        return products
    }
    saveProduct = async (Product) => {
        return this.productRepository.save(Product)
    }
    private updateProduct = async (id,newProduct) => {
        let product = await this.productRepository.findOneBy({id:id})
        if(!product){
            return null;
        }
        return this.productRepository.update({id:id},newProduct)
    }
    findById = async (id)=>{
        let product = await this.productRepository.findOneBy({id:id})
    }
}