import CartManager from "../daos/mongodb/CartMongoDAO.js";

const cartManager = new CartManager();

export const getCartByIdService = async (id) => {
    const cart = await cartManager.getCartById(id);
    if(!cart) return {error: 'The provided id does not belong to any cart'}
    return cart
};

export const getCartsService = async () => {
    const carts = await cartManager.getCarts();
    if(!carts) return {error: 'No carts available'}
    return carts
};

export const addCartService = async () => {
   const result = await cartManager.addCart();
   return result;
};

export const addProductToCartService = async (cid, pid) => {
    const result = await cartManager.addProductToCart(cid, pid);
    return {status: 'Product added succesfully'};
};

export const deleteProductFromCartService = async (cid, pid) => {
    await cartManager.deleteProductFromCart(cid, pid)
};

export const deleteAllProductsFromCartService = async (cid) => {
    const result = await cartManager.deleteAllProductsFromCart(cid);
    return result
};

export const updateProductsFromCartService = async (cid, body) => {
    const result = await cartManager.updateProductsFromCart(cid, body);
    return result;
};

export const updateProductsQuantityService = async (cid, pid, quantity) => {
    await cartManager.updateProductsQuantity(cid, pid, quantity)
};