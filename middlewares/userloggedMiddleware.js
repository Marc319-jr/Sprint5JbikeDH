function userloggedMiddleware(req,res,next){
    console.log("Pase por el middle ware de");
    res.locals.isLogged = false;
    if(req.session.userLogged){
        res.locals.isLogged = true;
    }
    next();

}

module.exports = userloggedMiddleware;