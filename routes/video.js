const express = require('express');
const router = express.Router();

// importing middlewares
const auth = require('../middlewares/auth');
const superuser = require('../middlewares/superuser');

// importing controller
const videoController = require('../controllers/video');

// importing validator
const videoValidator = require('../validators/video');

router.get('/create',auth,superuser,videoController.createVideoPage);
router.post('/create',auth,superuser,videoValidator.create,videoController.createVideo);

router.get('/:id/update',auth,superuser,videoController.updateVideoPage);
router.post('/:id/update',auth,superuser,videoValidator.create,videoController.updateVideo);

router.get('/:id/delete',auth,superuser,videoController.deleteVideoPage);
router.post('/:id/delete',auth,superuser,videoController.deleteVideo);



module.exports = router;