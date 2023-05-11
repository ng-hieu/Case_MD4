export const SECRET = '123456';

import jwt from 'jsonwebtoken';
export const auth = (req, res, next) => {
    let authorization = req.headers.authorization;
    if (authorization) {
        let accessToken = authorization.split(' ')[1];
        if (accessToken) {
            jwt.verify(accessToken, SECRET, (err, payload) => {
                if (err) {
                    console.log("token khong ton tai")

                    res.status(401).json({
                        message: 'err 401'
                    })
                } else {
                    console.log("playload:", payload)
                    req.decoded = payload;
                    next();
                }
            })
        } else {
            console.log("request khong co token")
            res.status(401).json({
                message: 'not accessToken'
            })
        }
    } else {
        console.log("request khong co authorization header")
        res.status(401).json({
            message: 'who are you'
        })
    }
}