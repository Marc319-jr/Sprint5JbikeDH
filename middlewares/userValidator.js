const path = require('path');
const {check} = require('express-validator');

const validator = [
    check('nombreUsuario').notEmpty().isLength({min: 3}).withMessage("Tiene que ser un minimo de 3 caracteres"),
    check('genero').notEmpty().withMessage("Tiene que rellenar el campo"),
    check('emailUsuario').notEmpty().isEmail().withMessage("Lo ingresado tiene que tener formato EMAIL"),
    check('passwordUsuario').notEmpty().isLength({min:6}).withMessage("La contraseña tiene que tener un minimo de 6 caracteres"),
    check('imagen').custom((value, {req}) => {
        let file = req.file;
        if(file == undefined)
        {
            throw new Error('Tienes que subir una imagen')
        }
        else{
        let fileExt = path.extname(file.originalname)
        let acceptedExtensions = ['.jpg' , '.png' , '.gif' , '.jpeg'];
        if(!acceptedExtensions.includes(fileExt))
        {
            throw new Error('la extension validas son: ' + acceptedExtensions.join(', '))
        }}
        return true;
    })

];



module.exports = validator;