let express = require('express');
const usersController = require ('../Controller/usersController');
let router = express.Router();
const multer = require('multer');
const path = require ('path');

//configuracion de multer

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '../public/image/productsimages'))
    },
    filename: (req,file,callback) => {
        const newFileName = 'usuario-' + Date.now() + path.extname(file.originalname);
        callback(null,newFileName);
    }
});

let fileUpload = multer({storage});

// tenemos las rutas GET

const validator = require('../middlewares/userValidator');
const { userInfo } = require('os');

router.get('/login' , usersController.login);
router.get('/register' , usersController.register);
router.get('/profile' , usersController.profile);

//
router.post('/register',fileUpload.single('imagen'),validator, usersController.create);
router.post('/login' , usersController.processLogin);


module.exports = router