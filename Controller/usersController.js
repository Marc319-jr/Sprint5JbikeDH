let fs =require('fs');
const { Recoverable } = require('repl');
let bcrypt = require('bcryptjs');

const controller = {
    //tenemos los render a las paginas
    login: (req,res) => {
        res.render('./users/login1')
    },
    register: (req,res) => {
        res.render('./users/register')
    },
    create: (req,res) => {
        let archivoUsuarios = fs.readFileSync('usuarios.JSON', {enconding: 'utf-8'});
        let usuarios; 
        if (archivoUsuarios == "")
        {
            usuarios = [];
            console.log("Lei un array de usuarios que esta vacio");
        }
        else 
        {
            usuarios = JSON.parse(archivoUsuarios);
            console.log("Lei del archivo alumnos informacion");
        }
        console.log("Creando un usuario con la siguiente info: ");
        console.log(req.body);

        let usuario = {
            id: usuarios.length+1,
            nombre: req.body.nombreUsuario,
            genero: req.body.genero,
            imagen: req.file ? req.file.filename : '',
            email: req.body.emailUsuario,
            password: bcrypt.hashSync(req.body.passwordUsuario , 10)
        };
        console.log(usuario);

        usuarios.push(usuario);
        console.log("guarde un nuevo usuario");

        let usuariosJSON = JSON.stringify(usuarios);
        fs.writeFileSync('usuarios.JSON',usuariosJSON);
        res.redirect('/');
    }
}



module.exports = controller;