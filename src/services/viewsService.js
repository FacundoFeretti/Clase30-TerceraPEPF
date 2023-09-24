import { getProductsForViewsService } from "./productsService.js";
import { getCartByIdService } from "./cartService.js";

export const getProductsViewsService = async(page) =>{
    const result = await getProductsForViewsService(page);
    return result
};

export const getCartByIdViewService = async(givenId) => {
    const result = await getCartByIdService(givenId)
    return result;
};

