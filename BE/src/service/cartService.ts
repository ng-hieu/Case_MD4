import {Product} from "../model/product";
import {Category} from "../model/category";
import {User} from "../model/user";
import {AppDataSource} from "../data-source";
import {Cart} from "../model/cart";

class CartService {
    private cartRepository

    constructor() {
        this.cartRepository = AppDataSource.getRepository(Cart)
    }

    findAllCart = async () => {
        let sql = `SELECT *
                   FROM cart;`


        let carts = await this.cartRepository.query(sql)
        return carts
    }
    findAllCartByUserId = async (idUser) => {
        let sql = `SELECT *
                   FROM cart
                            WHERE userIdUser = ${idUser}`

        let carts = await this.cartRepository.query(sql)
        return carts
    }

    private deleteCartByCartId = async (idCart) => {
            let cart = await this.cartRepository.findOneBy({idCart: idCart})
            if (!cart) {
                return null;
            }
            return this.cartRepository.delete({idCart: idCart})
        }

        add = async (cart) => {
            return this.cartRepository.save(cart);
        }

    //
    // findCartByUserId = async (idUser) => {
    //     let carts = await this.cartRepository.findOneBy({idUser: idUser})
    //     if (!product) {
    //         return null;
    //     }
    //     return product
    // }
    // private deleteProductFromCart = async (id) => {
    //     let product = await this.productRepository.findOneBy({id: id})
    //     if (!product) {
    //         return null;
    //     }
    //     return this.productRepository.delete({id: id})
    // }
    // searchProduct = async (name) => {
    //     let sql = `SELECT *
    //                FROM product p
    //                         JOIN category c ON p.category = c.idCategory
    //                WHERE name LIKE '%${name}%'`
    //     let products = await this.productRepository.query(sql)
    //     if (!products) {
    //         return null
    //     }
    //     return products
    // }
    // priceRange = async (value) => {
    //     let products;
    //     let sql;
    //     switch (value) {
    //         case 99:
    //             sql = `SELECT *
    //                    FROM product p
    //                             JOIN category c ON p.category = c.idCategory
    //                    WHERE price BETWEEN 0 AND ${value}`
    //             products = await this.productRepository.query(sql);
    //             if (!products) {
    //                 return null;
    //             }
    //             return products;
    //         case 499:
    //             sql = `SELECT *
    //                    FROM product p
    //                             JOIN category c ON p.category = c.idCategory
    //                    WHERE price BETWEEN 100 AND ${value}`
    //             products = await this.productRepository.query(sql);
    //             if (!products) {
    //                 return null;
    //             }
    //             return products;
    //         case 999:
    //             sql = `SELECT *
    //                    FROM product p
    //                             JOIN category c ON p.category = c.idCategory
    //                    WHERE price BETWEEN 500 AND ${value}`
    //             products = await this.productRepository.query(sql);
    //             if (!products) {
    //                 return null;
    //             }
    //             return products;
    //         case 1999:
    //             sql = `SELECT *
    //                    FROM product p
    //                             JOIN category c ON p.category = c.idCategory
    //                    WHERE price BETWEEN 1000 AND ${value}`
    //             products = await this.productRepository.query(sql);
    //             if (!products) {
    //                 return null;
    //             }
    //             return products;
    //         default:
    //             return products = await this.productRepository.find();
    //     }
    // }
}

export default new CartService()