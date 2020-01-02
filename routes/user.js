const express = require('express');

const router = express.Router();


// importing controller
const userController = require('../controllers/user');

// importung validator
const userValidator = require('../validators/user');

// importing middlewares
const auth = require('../middlewares/auth');


// route definitions
router.get('/login' , userController.login);
router.post('/login' , userValidator.login , userController.post_login);

router.get('/register',userController.register);
router.post('/register' ,userValidator.register,userController.post_register);

router.get('/profile' , auth ,userController.profile);
router.get('/logout',userController.logout);

router.get('/profile/update' , auth , userController.update);
router.post('/profile/update',auth , userValidator.update ,userController.post_update);



module.exports = router;