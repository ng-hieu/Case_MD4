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

    getAllProductsFromDatabase = async () => {
        let sql = `SELECT *
                   FROM product
                    JOIN category 
                        ON product.categoryIdIdCategory = category.idCategory`

        return await this.productRepository.query(sql)
    }
    saveProduct = async (Product) => {
        return this.productRepository.save(Product)
    }
    private updateProduct = async (id, newProduct) => {
        let product = await this.productRepository.findOneBy({id: id})
        if (!product) {
            return null;
        }
        return await this.productRepository.update({id: id}, newProduct)
    }
    findById = async (id) => {
        let product = await this.productRepository.findOneBy({id: id})
        if (!product) {
            return null;
        }
        return product
    }
    private deleteProduct = async (id) => {
        let product = await this.productRepository.findOneBy({id: id})
        if (!product) {
            return null;
        }
        return await this.productRepository.delete({id: id})
    }
    searchProduct = async (name) => {
        let sql = `SELECT *
                   FROM product p
                            JOIN category c ON p.category = c.idCategory
                   WHERE name LIKE '%${name}%'`
        let products = await this.productRepository.query(sql)
        if (!products) {
            return null
        }
        return products
    }
    priceRange = async (value) => {
        let products;
        let sql;
        switch (value) {
            case 99:
                sql = `SELECT *
                       FROM product p
                                JOIN category c ON p.category = c.idCategory
                       WHERE price BETWEEN 0 AND ${value}`
                products = await this.productRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            case 499:
                sql = `SELECT *
                       FROM product p
                                JOIN category c ON p.category = c.idCategory
                       WHERE price BETWEEN 100 AND ${value}`
                products = await this.productRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            case 999:
                sql = `SELECT *
                       FROM product p
                                JOIN category c ON p.category = c.idCategory
                       WHERE price BETWEEN 500 AND ${value}`
                products = await this.productRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            case 1999:
                sql = `SELECT *
                       FROM product p
                                JOIN category c ON p.category = c.idCategory
                       WHERE price BETWEEN 1000 AND ${value}`
                products = await this.productRepository.query(sql);
                if (!products) {
                    return null;
                }
                return products;
            default:
                return await this.productRepository.find();
        }
    }
}

export default new ProductService()