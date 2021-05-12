let express = require('express');
const indexcontroller = require('../Controller/indexController')
let router = express.Router();

router.get('/' , indexcontroller.index);






module.exports = router;