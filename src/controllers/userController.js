import { loginUserService } from "../services/usersService.js";

export const loginUserController = async (req) => {
    const email = await req.body.email;
    const token = await loginUserService(email);
    return token;
}