import { loginUserService } from "../services/usersService.js";
import jwt from 'jsonwebtoken';
import passport from "passport";
import config from '../config.js'
import { DTOCurrentUser } from "./DTO/user.dto.js";

export const loginUserController = async (req, res, next) => {
    passport.authenticate('login', {session: false}, (err, user, info) => {
        if(err) return next(err);
        if(!user){
            return res.status(401).json({message: info.message});
        } else {
            let token = jwt.sign({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                password: user.password,
                role: user.role,
                cart: user.cart
            }, 
            config.COOKIE_SIGN,
            {expiresIn: '24h'}
            );
            res.cookie(config.COOKIE_NAME, token, {httpOnly: true}).send({status: 'success'})
        }
    })(req, res, next);
};

export const getCurrentUser = (req, res) => {
    res.send(new DTOCurrentUser(req.user))
}