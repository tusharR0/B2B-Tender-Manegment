const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();
const { uploadLogo } = require('../controllers/uploadController');

router.post('/logo', upload.single('file'), uploadLogo);

module.exports = router;
