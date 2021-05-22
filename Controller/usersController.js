//const { Recoverable } = require('repl');
//1. Validar la registracion
//2. 
const path = require('path');
//const file = path.resolve(__dirname, '../data/', 'usuarios.JSON');
let fs =require('fs');
let bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/User')

const controller = {
    //tenemos los render a las paginas
    login: (req,res) => {
        console.log("login");
        res.render('./users/login1')
    },
    register: (req,res) => {
        console.log("register");
        res.render('./users/register')
    },
    profile: (req,res) => {
        console.log("profile");
        if(req.session.userLogged)
        res.render('./users/profile' , {'user' : req.session.userLogged})
        else res.send("No hay ningun usuario logeado vuelva a intentar")
    },
    create: (req,res) => {
        //Validaciones:
        console.log("creando un usuario:");
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0)
        {
            console.log("Hay errores asi que voy a requerir de algunas validaciones");
            return res.render("./users/register" , {errores: resultValidation.mapped() , oldData: req.body})
        }
            console.log("Ya no hay errores podemos ir a guardar el usuario");
            let userToCreate = {
                ...req.body,
                passwordUsuario: bcrypt.hashSync(req.body.passwordUsuario , 10),
                imagen: req.file ? req.file.filename : ''
            }
        console.log(userToCreate);
        User.create(userToCreate);
        res.redirect('/users/login');
    },

    processLogin: (req,res) => {
        console.log("estoy viendo quien puede pasar");
        let userToLogin = User.findByField('emailUsuario' , req.body.email);
        console.log(userToLogin);
        if(userToLogin){
            let isOk = bcrypt.compareSync(req.body.password , userToLogin.passwordUsuario)
            if(isOk){
                console.log("Las contraseñas estan bien");
                req.session.userLogged = userToLogin;
                res.render('./users/profile' , {'user' : req.session.userLogged})
            }
            else
            {
                console.log("Algo esta mal");
                res.render("./users/login1" , {errores: {email: {msg:'La contraseña es incorrecta'}}});
            }
        }
        res.render('./users/login1' , {errores: {email: {msg: "No existe tal usuario"}}})
    }
}



module.exports = controller;