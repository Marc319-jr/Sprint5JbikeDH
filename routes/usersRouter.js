let express = require('express');
const usersController = require ('../Controller/usersController');
let router = express.Router();

// tenemos las rutas GET

router.get('/login' , usersController.login);
router.get('/register' , usersController.register);

//
router.post('/register', usersController.create);


module.exports = router