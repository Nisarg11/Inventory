const express = require('express');

const {check} = require('express-validator');

const productsControllers = require('../controllers/products-controllers');
const router = express.Router();

router.get('/:pid', productsControllers.getProductById);

router.post('/add',[check('item').not().isEmpty(),
check('type').not().isEmpty(),
check('quantity').isNumeric().not().isEmpty(),
check('price').isNumeric().not().isEmpty()
],  productsControllers.createProduct);

router.patch('/:pid', [ check('item').not().isEmpty(),
    check('type').not().isEmpty(),
    check('quantity').not().isEmpty(),
    check('price').not().isEmpty()
  ], productsControllers.updateProduct);

router.delete('/:pid',  productsControllers.deleteProduct);

module.exports = router ;