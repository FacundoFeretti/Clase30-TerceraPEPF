import {Router} from "express";
import passport from "passport";
import { authorization, passportCall } from "../utils.js";
import { loginUserController } from "../controllers/userController.js";
import config from '../config.js'

const router = Router();

router.post('/register', passport.authenticate('register', {failureRedirect:'/failregister', session: false}), async (req, res) => {
   res.send({status:'success', message:'User registered'})
});

router.get('/failregister', async(req,res)=>{
  res.send({error:'Failed Strategy'})
});

router.post('/login', loginUserController)

router.get('/faillogin', (req,res) => {
  res.send({error:'Failed Login'})
})

router.get("/logout", (req, res) => {
  res.cookie(config.COOKIE_NAME, '', { expires: new Date(0), path: '/' });
  res.redirect('/')

});

router.get('/current',
  passportCall('jwt'),
  async (req, res)=> {
    res.send(req.user)
  }
);

router.get('/github', passport.authenticate('github', {scope: "user:email"}), async(req,res)=>{})

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}), async(req,res)=> {
  req.session.user = req.user;
  res.redirect('/products')
});

export default router