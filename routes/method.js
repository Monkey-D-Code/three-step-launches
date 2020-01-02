const express = require('express');
const router = express.Router();

// importing controller
const methodController = require('../controllers/method');

// importing validator
const methodValidator = require('../validators/method');

// importing middlewares
const auth = require('../middlewares/auth');
const superuser = require('../middlewares/superuser');

router.get('/create',auth ,superuser, methodController.createMethodPage);
router.post('/create' ,auth, superuser , methodValidator.create , methodController.createMethod);

router.get('/:id/update',auth,superuser ,methodController.updateMethodPage);
router.post('/:id/update',auth,superuser, methodValidator.create , methodController.updateMethod);

router.get('/:id/delete',auth,superuser ,methodController.deleteMethodPage);
router.post('/:id/delete',auth,superuser , methodController.deleteMethod);



module.exports = router;