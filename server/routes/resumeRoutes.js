const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const verifyUser = require('../middleware/auth'); // Correct path

router.post('/', verifyUser, resumeController.saveResume);
module.exports = router;