import { getProductsViewsService, getCartByIdViewService } from "../services/viewsService.js";
import { validateMongoId } from "../daos/mongodb/validationMongo.js";

export const getProductsForViewsController = async (req) => {
    let page = parseInt(req.query.page);
    if(!page) page = 1;
    const user = req.user;
    const products = await getProductsViewsService(page);
    const result = {user: user, result: products}
    return result;
};

export const getCartByIdViewsController = async (req) => {
    const givenId = req.params.cid;
    try{
        await validateMongoId(givenId);
    } catch (error) {
        return {error: error.message}
    };
    const result = await getCartByIdViewService(givenId);
    return result;
};

