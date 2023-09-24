import { getProductsService, getProductByIdService, addProductService, updateProductService, deleteProductService } from "../services/productsService.js"
import { validateMongoId } from "../daos/mongodb/validationMongo.js";

export const getProductsController = async (req) => {
    let limitCondition = req.query.limit;
    let limit = limitCondition ? Number(limitCondition) : 10
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    let filter = req.query.filter;
    let filterValue = req.query.filtervalue;

    const conditions = {limit, page, sort, filter, filterValue}

    let products = await getProductsService(conditions)
    return products
};

export const getProductByIdController = async (req) => {
    const id = req.params.id
    if(!id) return {error: 'You must provide an ID'}
    try{
        await validateMongoId(id);
    } catch (error) {
        return {error: error.message}
    };
    const product = await getProductByIdService(id);
    return product
};

export const addProductController = async (req) => {
    const product = req.body;
    if(!product) return {error: 'You must provide a product'};
    const result = await addProductService(product);
    return result;
};

export const updateProductController = async (req) => {
    const id = req.params.id;
    const body = req.body;
    if(!id) return {error: 'You must provide an ID'};
    try{
        await validateMongoId(id);
    } catch (error) {
        return {error: error.message}
    }
    if(!body) return {error: 'You must provide a modified product'};
    const result = await updateProductService(id, body)
    return result
};

export const deleteProductController = async (req) => {
    const id = req.params.id;
    if(!id) return {error: 'You must provide an ID'};
    try{
        await validateMongoId(id);
    } catch (error) {
        return {error: error.message}
    };
    const result = await deleteProductService(id)
    return result
}