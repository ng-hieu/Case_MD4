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
                   FROM User
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

    checkpassword = async (myPlaintextPassword, username) => {
        let user = await this.userRepository.findOneBy({username: username})
        let hash = user.password
        console.log("pass " + myPlaintextPassword + "hash " + hash)
        // let booleanCheck = await bcrypt.compare(myPlaintextPassword, hash);
        let booleanCheck = await bcrypt.compare(myPlaintextPassword, hash);
        return booleanCheck;
    }
    checkUser = async (user) => {
        console.log(user)
        let userCheck = await this.userRepository.findOneBy({username: user.username})
        let passwordCheck = await this.checkpassword(user.password, user.username)
        console.log("Test " + passwordCheck)
        if (!userCheck) {
            return 'user not found'
        } else if (!passwordCheck) {
            return 'Password is not right'
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