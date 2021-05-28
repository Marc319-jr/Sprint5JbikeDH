const User = require('../models/User');


function userloggedMiddleware(req,res,next){

    res.locals.isLogged = false;
    let emailInCookie = req.cookies.usuarioCookie;
    let userFromCookie = User.findByField('emailUsuario' , emailInCookie);
    console.log(emailInCookie);
    console.log(userFromCookie);

    if(userFromCookie)
    {
        req.session.userLogged = userFromCookie;
    }

    if(req.session.userLogged){
        console.log("Pase por el middle ware de aplicacion y hay un usuaio ya logeado");
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }
    else{
    console.log("Pase por middleware de aplicacion y nadie esta logeadi");
    }

   

    next();

}

module.exports = userloggedMiddleware;