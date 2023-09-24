import { Router } from "express";
import passport from "passport";
import {getProductsForViewsController} from '../controllers/viewsController.js'
import { getCartByIdViewsController } from "../controllers/viewsController.js";

const router = Router();

router.get('/', async (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts', {style:'index.css', title:'Real Time'})
});

router.get('/products', passport.authenticate('jwt', {session: false}),async (req, res) => {
    const result = await getProductsForViewsController(req);
    res.render('products', result)
});


router.get('/carts/:cid', async (req, res) => {   
    const cart = await getCartByIdViewsController(req);
    res.render('oneCart', cart);
});

export default router