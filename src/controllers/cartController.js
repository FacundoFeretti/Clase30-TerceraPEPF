import { getCartByIdService, getCartsService, addCartService, addProductToCartService, deleteProductFromCartService, deleteAllProductsFromCartService, updateProductsFromCartService, updateProductsQuantityService } from "../services/cartService.js";
import { validateMongoId } from "../daos/mongodb/validationMongo.js";

export const getCartByIdController = async (req) => {
    const id = req.params.id;
    try{
        await validateMongoId(id);
    } catch (error) {
        return {error: error.message}
    }
    const cart = await getCartByIdService(id);
    return cart
};

export const getCartsController = async () => {
    const carts = await getCartsService();
    return carts;
};

export const addCartController = async () => {
    await addCartService();
};

export const addProductToCartController = async (req) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try{
        await validateMongoId(productId);
        await validateMongoId(cartId);
    } catch (error) {
        return {error: error.message}
    }
    const result = await addProductToCartService(cartId, productId);
    return result;
};

export const deleteProductFromCartController = async (req) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try{
        await validateMongoId(productId);
        await validateMongoId(cartId);
    } catch (error) {
        return {error: error.message}
    }
    deleteProductFromCartService(cartId, productId)
};

export const deleteAllProductsFromCartController = async (req) => {
    const cartId = req.params.cid
    try{
        await validateMongoId(cartId);
    } catch (error) {
        return {error: error.message}
    }
    const result = await deleteAllProductsFromCartService(cartId);
    return result;
};

export const updateProductsFromCartController = async (req) => {
    const cartId = req.params.cid;
    const body = req.body;
    try{
        await validateMongoId(cartId);
    } catch (error) {
        return {error: error.message}
    }
    const result = await updateProductsFromCartService(cartId, body);
    return result
};

export const updateProductsQuantityController = async () => {

};