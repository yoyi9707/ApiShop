const express = require('express');
const router = express.Router();
const auth = require('../security/authjwt');
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;

const roleCtr = require('../controllers/role.controller');

// router.all('/', (req, res, next) => {
//     console.log('por aquí pasó');
//     next();
// })

router.get('/', [verifyToken, Administrador], roleCtr.getRole);
router.post('/', [verifyToken, Administrador], roleCtr.createRole);
router.get('/:id', [verifyToken, Administrador], roleCtr.getRoleById);
router.put('/:id', [verifyToken, Administrador], roleCtr.editRole);
router.delete('/:id', [verifyToken, Administrador], roleCtr.deleteRole);

module.exports = router;