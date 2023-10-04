import { Router } from "express";
import { getCartByIdController, getCartsController, addCartController, addProductToCartController, deleteProductFromCartController, deleteAllProductsFromCartController, updateProductsFromCartController, updateProductsQuantityController } from "../controllers/cartController.js";
import { checkCartOwner } from "./middlewares/carts.middlewares.js";
import { createTicketController } from "../controllers/ticketsController.js";
import { passportCall } from "../utils.js";

const router = Router();


router.get("/:id", async (req, res) => {
    const cart = await getCartByIdController(req);
    res.send(cart);
});

router.get('/', async( req, res ) => {
    const carts = await getCartsController()
    res.send(carts);
});

router.post('/', async (req, res) => {
    await addCartController()
    res.send({status: 'Cart added succesfully'})
});

router.post('/:cid/product/:pid/:quantity', passportCall('jwt'), checkCartOwner, async (req, res) => {
    const result = await addProductToCartController(req)
    res.send({result})
});

router.delete('/:cid/product/:pid', async (req, res) => {
    await deleteProductFromCartController(req);
    res.send({status: 'success'})
});

router.delete('/:cid', async (req, res) => {
    const result = await deleteAllProductsFromCartController(req)
    res.send({result})
});

router.put('/:cid', async (req,res) => {
    const result = await updateProductsFromCartController(req)
    res.send({result})
});

router.put('/:cid/product/:pid', async (req, res) =>{
    await updateProductsQuantityService(req.params.cid, req.params.pid, req.body.quantity)
    res.send({status: 'success'})
});

router.post('/:cid/purchase', async (req, res) => {
    const result = await createTicketController();
    
})
export default router;