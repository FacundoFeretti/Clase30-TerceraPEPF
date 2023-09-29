export const rolesMiddlewareAdmin = (req,res,next) => {
    console.log('PASA POR EL MIDDLEWARE')
    if(req.user.role === 'admin'){
        next()
    } else {
        res.send({error: "You're not an admin"})
    }
};

export const rolesMiddlewareUser = (req,res,next) => {
    if(req.user.role === 'user'){
        next()
    } else {
        res.send({error: "You're not an user"})
    }
};
