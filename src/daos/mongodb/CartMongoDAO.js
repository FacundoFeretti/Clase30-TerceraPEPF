import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import { productDAO } from "../../server.js";

export default class CartManager {
    connection = mongoose.connect('mongodb+srv://facundoferetti:35612799851230Pa@cluster0.knbbxtu.mongodb.net/?retryWrites=true&w=majority')
    addCart = async () => {
       const result = await cartModel.create({products: []});
       return result;
    };
 
    getCarts = async () => {
        try{
            const result = await cartModel.find({});
            return result;
        } catch (error) {
            return {error: error}
        }
    };

    getCartById = async (givenId) => {
        const result = await cartModel.findOne({_id: givenId});
        return result
    };

    addProductToCart = async (idCart, product, quantity) => {
        const cart = await this.getCartById(idCart);
        const productId = product._id.toString();
        const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId);
        if(productIndex !== -1){
            cart.products[productIndex].quantity += parseInt(quantity, 10);
        } else {
            cart.products.push({
                product: product,
                quantity: quantity
            })
        }
        await cart.save();
        return;
    };

    deleteProductFromCart = async (cid, pid) => {
        const cart = await this.getCartById(cid);
        cart.products.pull(pid);
        console.log(cart)
        await cart.save();
    };

    deleteAllProductsFromCart = async (cid) => {
        const cart = await this.getCartById(cid);
        cart.products = [];
        await cart.save();
        return cart
    };

    updateProductsFromCart = async (cid, productArray) => {
        const cart = await cartModel.findOneAndUpdate(
            {_id: cid},
            {$set: {'products': productArray}},
            {new: true}
        )

        cart.save();
        return cart
    };

    updateProductsQuantity = async (pid, cid, quantity) => {
        const cart = await cartModel.findOneAndUpdate(
            {_id: cid, 'products.product': pid},
            {$set: {'products.$.quantity': quantity}},
            {new: true}
        );
        cart.save();
        return cart
        
    };
}

