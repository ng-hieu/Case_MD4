import {Request, Response} from "express";
import CartService from "../service/cartService";
import bodyParser from "body-parser";

class CartController {
    private cartService

    constructor() {
        this.cartService = CartService;
    }

    getAllCart = async (req: Request, res: Response) => {
        try {
            let allCart = await this.cartService.findAllCart()
            res.status(200).json(allCart)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    deleteCart = async (req: Request, res: Response) => {
        try {
            let idCart = req.params.idCart
            await this.cartService.deleteCartByCartId(idCart)
            res.status(200).json("Xóa cart thành công");
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    getCartByUserId = async (req: Request, res: Response) => {
        try {
            let idUser = req.params.idUser
            let carts = await  this.cartService.findAllCartByUserId(idUser)
            res.status(200).json(carts)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    addCart = async (req: Request, res: Response) => {
        try {
            let cart = req.body
            await this.cartService.add(cart);
            res.status(200).json("Thêm cart thành công")
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
    // registerUser = async (req: Request, res: Response) => {
    //     try {
    //         let user = req.body
    //         let userCheck = await this.userService.checkUserRegister(req.body)
    //         if (userCheck) {
    //             res.status(200).json("đã có tk")
    //         } else {
    //             let newUser = await this.userService.registerUser(user)
    //             console.log("new user: ", newUser)
    //             res.status(200).json("tạo thành công")
    //         }
    //
    //     }catch (err){
    //         console.log("err in register",err)
    //         res.status(500).json(err.message)
    //     }
    // }
    // login = async(req:Request,res:Response)=>{
    //     try{
    //         let response = await  this.userService.checkUser(req.body)
    //         console.log(response)
    //         res.status(200).json(response)
    //     }catch (err){
    //         res.status(500).json(err.message)
    //     }
    // }
}
export default new CartController()
