export const checkCartOwner = (req, res, next) =>{
    if(req.user.cart === req.params.cid){
        next()
    } else{
        res.send('You can only add products to your own cart')
    }
}