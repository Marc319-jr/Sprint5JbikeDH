let express = require('express');
const usersController = require ('../Controller/usersController');
let router = express.Router();
const multer = require('multer');
const path = require ('path');

//middlewares

const guestMiddleware = require('../middlewares/guestMiddleware');
const loggedMiddleware = require('../middlewares/loggedMiddleware');

//configuracion de multer

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '../public/image/users/images'))
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

router.get('/login' , guestMiddleware,  usersController.login);
router.get('/register' , guestMiddleware,  usersController.register);
router.get('/profile' , loggedMiddleware, usersController.profile);
router.get('/logout' , usersController.logout);

//
router.post('/register',fileUpload.single('imagen'),validator, usersController.create);
router.post('/loginProcess' , usersController.processLogin);


module.exports = router