const express = require('express');
const router = express.Router();

const productCtr = require('../controllers/product.controller');

const auth = require('../security/authjwt');
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;
const Usuario = auth.Usuario;

//IMG
const upload = require('./../libs/multer');


// router.all('/', (req, res, next) => {
//     console.log('por aquí pasó');
//     next();
// })

router.get('/', [ verifyToken], productCtr.getProducts);
router.post('/', upload.single('picture'), productCtr.createProduct);
router.get('/cantCategory', productCtr.getCantCategory);
router.put('/img/:id', upload.single('picture'), productCtr.editProductImg);
router.get('/photo', productCtr.getImg);
router.get('/paginated/:page', [ verifyToken], productCtr.getProductsPaginated);
router.get('/paginatedAvailable/:page', productCtr.getProductsAvailable);
router.get('/paginatedAvailableNew/:page', productCtr.getProductsAvailableNew);
router.get('/paginatedAvailablePromotion/:page', productCtr.paginatedAvailablePromotion);
router.get('/paginatedAvailableSearch/:page', productCtr.getProductsAvailableSearch);
router.get('/paginatedStore/:page', [ verifyToken], productCtr.getProductsInStore);
router.get('/paginatedAvailableProve/:page', [ verifyToken], productCtr.getAvailableProve);
router.get('/category/:page', productCtr.getProductsBySubCategory);
router.get('/categoryp/:page', productCtr.getProductsByCategory);
router.get('/:id', [ verifyToken], productCtr.getProductById);
router.put('/:id', [ verifyToken], productCtr.editProduct);
router.delete('/:id', [ verifyToken], productCtr.deleteProduct);



module.exports = router;