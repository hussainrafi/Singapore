const express = require('express')
const router = express.Router()

const homeController =  require('../Controllers/homeController')
const test = require('../Controllers/Testing')


//get request
router.get('/',homeController)
router.get('/hej',test)

//post request

// delete request

//put request (opdatere noget)


module.exports = router