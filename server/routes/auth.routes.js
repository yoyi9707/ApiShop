const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth.controller');


// router.all('/', (req, res, next) => {
//     console.log('por aquí pasó');
//     next();
// })

router.post('/signup', authCtrl.signUp);
router.post('/signin', authCtrl.signIn);
router.post('/check', authCtrl.check);
router.post('/findUser', authCtrl.findUser);

module.exports = router;