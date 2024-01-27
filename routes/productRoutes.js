const isAuthorized = require('../auth');
const { createProduct, getProducts, getProductsById, updateProductById, deleteProductById } = require('../controllers/productController');

const router = require('express').Router();

router.post('/', isAuthorized , createProduct);
router.get('/', getProducts);
router.get('/:id', getProductsById);
router.put('/:id', isAuthorized, updateProductById);
router.delete('/:id', isAuthorized, deleteProductById);

module.exports = router;