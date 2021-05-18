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
        res.render('./users/login1')
    },
    register: (req,res) => {
        res.render('./users/register')
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
        res.redirect('/');
    }
}



module.exports = controller;