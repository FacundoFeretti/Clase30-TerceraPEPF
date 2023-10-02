import productDAO from "../daos/mongodb/ProductMongoDAO.js";
import socketServer from "../server.js";

const productDAOs = new productDAO();

export const getProductsService = async (conditions) => {
    let filters = {};
    if(conditions.filter != "" && conditions.filterValue != ""){
        filters = {[conditions.filter] : conditions.filterValue};
    }    
    const products = await productDAOs.getProducts(filters, conditions)
    return products
};

export const getProductByIdService = async (id) => {
    const product = await productDAOs.getProductById(id);
    if(!product) return {error: 'The given id does not belong to an existing product'}
    return product
};

export const addProductService = async (product) => {
    const newProduct = await productDAOs.addProduct(
        product
    );
    socketServer.emit('newProduct', newProduct);
    return newProduct;
};

export const updateProductService = async (id, body) => {
    const product = await productDAOs.updateProduct(id, body)
    socketServer.emit('updateProduct', product)
    return product
};

export const deleteProductService = async (id) => {
    const result = await productDAOs.deleteProduct(id)
    socketServer.emit('deleteProduct', id)
    return result
};

export const getProductsForViewsService = async (page) => {
    const result = await productDAOs.getProductsForViews(page);
    return result;
};