import { Router } from "express";
import { getProductsController, getProductByIdController, addProductController, updateProductController, deleteProductController } from "../controllers/productController.js";
import { rolesMiddlewareAdmin } from "./middlewares/roles.middleware.js";
import passport from "passport";
import { authorization, passportCall } from "../utils.js";
const router = Router();


router.get('/', async (req, res) => {
    const products = await getProductsController(req)
    res.send({products})
})

router.get("/:id", async(req, res) => { 
    const product = await getProductByIdController(req)
    res.send(product);
})

router.post("/", async (req, res) => {
    const product = await addProductController(req)
    res.send({status: 'Success', product})
});

router.put("/:id", async (req, res) => {
    const result = await updateProductController(req)
    res.send({result})
});

router.delete("/:id" , async (req, res) => {
    const result = await deleteProductController(req);
    res.send({result})
});

export default router;