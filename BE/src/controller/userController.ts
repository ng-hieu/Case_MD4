import {Request, Response} from "express";
import UserService from "../service/userService";

class UserController {
    private userService

    constructor() {
        this.userService = UserService
    }

    getAlluser = async (req: Request, res: Response) => {
        try {
            let response = await this.userService.getAllUsers()
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
    registerUser = async (req: Request, res: Response) => {
        try {
            let user = req.body
            let userCheck = await this.userService.checkUserRegister(req.body)
            if (userCheck) {
                res.status(200).json("đã có tk")
            } else {
                let newUser = await this.userService.registerUser(user)
                res.status(200).json("tạo thành công")
            }

        }catch (err){
            console.log("err in register",err)
            res.status(500).json(err.message)

        }
    }
    login = async(req:Request,res:Response)=>{
        try{
            let response = await  this.userService.checkUser(req.body)

            res.status(200).json(response)
        }catch (err){
            res.status(500).json(err.message)
        }
    }
}
export default new UserController()
