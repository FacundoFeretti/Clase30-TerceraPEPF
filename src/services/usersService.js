import jwt from 'jsonwebtoken';
import { loginUser } from "../daos/mongodb/UserMongoDAO.js";

export const loginUserService = async (email) => {
    let user = await loginUser(email);
    let token = jwt.sign({user}, 'secret', {expiresIn: '24h'});
    return token
}