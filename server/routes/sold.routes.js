const express = require('express');
const router = express.Router();

const soldCtr = require('../controllers/sold.controller');

const auth = require('../security/authjwt');
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;
const Usuario = auth.Usuario;


router.get('/', [verifyToken, Administrador], soldCtr.getSold);
router.post('/', [verifyToken], soldCtr.createSold);
router.get('/paginated/:page', [verifyToken, Administrador], soldCtr.getSoldPaginated);
router.get('/paginatedbyuser/:page', [verifyToken], soldCtr.getSoldPaginatedbyUser);
router.get('/yearorder/:order', [verifyToken], soldCtr.getSoldByYearOrder);


module.exports = router;