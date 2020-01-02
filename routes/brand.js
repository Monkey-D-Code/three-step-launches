const express = require('express');
const router = express.Router();

// importing controller
const brandController = require('../controllers/brand');

// importing middleware
const auth = require('../middlewares/auth');
const superuser = require('../middlewares/superuser');

// importing validator
const brandValidator = require('../validators/brand');


router.get('/create',auth,superuser,brandController.createPage);
router.post('/create',auth,superuser,brandValidator.create,brandController.create);

router.get('/:id/update',auth,superuser,brandController.updatePage);
router.post('/:id/update',auth,superuser,brandValidator.create,brandController.update);



module.exports = router;