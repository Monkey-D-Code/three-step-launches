const express = require('express');
const router = express.Router();

// importing controller
const websiteController = require('../controllers/website');

router.get('/', websiteController.home);
router.get('/about', websiteController.about);
router.get('/faq', websiteController.faq);

module.exports = router;