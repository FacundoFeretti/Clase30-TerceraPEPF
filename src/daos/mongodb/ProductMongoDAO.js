import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";

export default class ProductDAO{
    connection = mongoose.connect('mongodb+srv://facundoferetti:35612799851230Pa@cluster0.knbbxtu.mongodb.net/?retryWrites=true&w=majority')
    getProductById = async (givenId) => {
        let result = await productsModel.findOne({ _id: givenId});
        return result
    }

    addProduct = async (product) => {
        let result = await productsModel.create(product);
        return result;
    }

    getProductsForSocket = async (limit, page = 1, sort = 0, filter = null, filterValue = null) => {
        let filters = {};
        if(filter != "" && filterValue != ""){
            filters = {[filter] : filterValue};
        }        
        let result = await productsModel.paginate(filters, {
            limit: limit,
            page: page,
            sort: {price: sort}
        });

        return result
    }

    getProducts = async (filters, conditions) => {
        let result = await productsModel.paginate(filters, {
            limit: conditions.limit,
            page: conditions.page,
            sort: {price: conditions.sort}
        });

        return result
    }

    updateProduct = async (givenId, updatedObject) => {
      let result = await productsModel.updateOne({_id: givenId}, {$set: updatedObject});
      return result
    }

    deleteProduct = async (givenId) => {
        let result = await productsModel.deleteOne({_id: givenId});
        return result
    }

    getProductsForViews = async (page) => {
        let result = await productsModel.paginate({},{page,limit:4,lean: true});
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';
        result.isValid = !(page<=0||page>result.totalPages);

        const obj = {result: result}
        return obj;
    }
}    