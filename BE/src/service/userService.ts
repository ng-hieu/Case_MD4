import {User} from "../model/User";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {SECRET} from "../middleware/auth";

class UserService {
    private userRepository

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    getAllUsers = async () => {
        let sql = `SELECT *
                   FROM user
                   WHERE role = 'user'`
        let user = await this.userRepository.query(sql)
        return user
    }
    registerUser = async (user) => {
        user.password = await bcrypt.hash(user.password, 10)
        console.log("user entity", user)
        return await this.userRepository.save(user)
    }
    checkUserRegister = async (user) => {
        let userFind = await this.userRepository.findOneBy({
            username: user.username
        })
        console.log(userFind)
        return userFind
    }
    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({username: user.username})
        if (!userCheck) {
            return 'user not found'
        } else {
            let payload = {
                idUser: userCheck.idUser,
                username: userCheck.username,
                role: userCheck.role
            }
            return jwt.sign(payload, SECRET, {
                expiresIn: 3600 * 1000
            })
        }
    }
}
export default new UserService()