const express = require('express');
const router = express.Router();

const nomCtr = require('../controllers/nomenclator.controller');

const auth = require('../security/authjwt');
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;
const Proveedor = auth.Proveedor;


router.get('/', [verifyToken, Administrador, Proveedor], nomCtr.getNomenclators);
router.post('/', [verifyToken, Administrador, Proveedor], nomCtr.createNom);
router.post('/category', nomCtr.getCategory);
router.get('/paginated/:page', [verifyToken, Administrador, Proveedor], nomCtr.getNomPaginated);
router.get('/:id', [verifyToken, Administrador, Proveedor], nomCtr.getNomById);
router.put('/:id', [verifyToken, Administrador, Proveedor], nomCtr.editNom);
router.delete('/:id', [verifyToken, Administrador, Proveedor], nomCtr.deleteNom);

module.exports = router;