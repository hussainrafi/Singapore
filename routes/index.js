const express = require('express')
const router = express.Router()

const indexController = require('../Controllers/indexController');
const mainPageController = require('../Controllers/mainPageController');
const sessionController = require('../Controllers/sessionController');
const adminController = require('../Controllers/adminController');
const adminUsersController = require('../Controllers/adminUsersController');
const adminHomeController = require('../Controllers/adminHomeController');
//get request

router.get('/indexHome',indexController);
router.get('/mainPage',mainPageController);
router.get('/opretSession',sessionController);
router.get('/mineSessionsAdmin',adminController);
router.get('/administrerBrugere',adminUsersController);
router.get('/adminHjem',adminHomeController);

//post request

// delete request

//put request (opdatere noget)


module.exports = router