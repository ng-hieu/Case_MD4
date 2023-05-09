"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../model/User");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
class UserService {
    constructor() {
        this.getAllUsers = async () => {
            let sql = `SELECT *
                   FROM user
                   WHERE role = 'user'`;
            let user = await this.userRepository.query(sql);
            return user;
        };
        this.registerUser = async (user) => {
            user.password = await bcrypt_1.default.hash(user.password, 10);
            console.log("user entity", user);
            return await this.userRepository.save(user);
        };
        this.checkUserRegister = async (user) => {
            let userFind = await this.userRepository.findOneBy({
                username: user.username
            });
            console.log(userFind);
            return userFind;
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!userCheck) {
                return 'user not found';
            }
            else {
                let payload = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    role: userCheck.role
                };
                return jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                    expiresIn: 3600 * 1000
                });
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map