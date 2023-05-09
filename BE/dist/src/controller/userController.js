"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
class UserController {
    constructor() {
        this.getAlluser = async (req, res) => {
            try {
                let response = await this.userService.getAllUsers();
                res.status(200).json(response);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.registerUser = async (req, res) => {
            try {
                let user = req.body;
                let userCheck = await this.userService.checkUserRegister(req.body);
                if (userCheck) {
                    res.status(200).json("đã có tk");
                }
                else {
                    let newUser = await this.userService.registerUser(user);
                    console.log("new user: ", newUser);
                    res.status(200).json("tạo thành công");
                }
            }
            catch (err) {
                console.log("err in register", err);
                res.status(500).json(err.message);
            }
        };
        this.login = async (req, res) => {
            try {
                let response = await this.userService.checkUser(req.body);
                console.log(response);
                res.status(200).json(response);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.userService = userService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map