const express = require('express');
const router = express.Router();

// importing controller
const testimonialController = require('../controllers/testimonial');


// importing middlewares
const auth = require('../middlewares/auth');
const superuser = require('../middlewares/superuser');

// importing validator
const testimonialValidator = require('../validators/testimonial');

router.get('/create' ,auth,superuser,testimonialController.createPage);
router.post('/create',auth,superuser,testimonialValidator.create,testimonialController.create);

router.get('/:id/update',auth,superuser,testimonialController.updatePage);
router.post('/:id/update',auth,superuser,testimonialValidator.create,testimonialController.update);

router.get('/:id/delete',auth,superuser,testimonialController.deletePage);
router.post('/:id/delete',auth,superuser,testimonialController.delete);

module.exports = router;