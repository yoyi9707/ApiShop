const express = require('express');
const router = express.Router();

const emailCtr = require('../controllers/email.controller');


router.post('/', emailCtr.sendEmail);

module.exports = router;