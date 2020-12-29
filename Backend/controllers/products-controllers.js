const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');


const HttpError = require('../models/http-error');
const Product = require('../models/product');



const getAllProducts = async(req,res,next) =>
{
  
  let product;
  try {
    product = await Product.find({});
   
  }
   catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find all products.',
      500
    );
    return next(error);
}
if (!product) {
  const error = new HttpError(
    'Could not find a product for the provided id.',
    404
  );
  return next(error);
}
res.json({ product });
};




const getProductById = async (req, res, next ) =>{
    const productId = req.params.pid;
   
    let product;
    try {
      product = await Product.findById(productId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a product.',
        500
      );
      return next(error);
  }
  if (!product) {
    const error = new HttpError(
      'Could not find a product for the provided id.',
      404
    );
    return next(error);
  }
  res.json({ product: product.toObject({ getters: true }) });
 };

 const createProduct = async (req, res, next) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

    const { item, type, quantity, price } = req.body;

    const createdProduct = new Product({
        item,
        type,
        quantity,
        price
      });

      try {
       
        await createdProduct.save(); 
       
      } catch (err) {
        const error = new HttpError(
          'Creating product failed, please try again.',
          500
        );
        return next(error);
      }

      res.status(201).json({product: createdProduct})

};

const updateProduct =  async (req, res, next) => {

    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
      throw new HttpError('Invalid inputs passed, please check your data.', 422)
  }
    
    const { item, type, quantity, price } = req.body;
    const productId = req.params.pid;

    let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update product.',
      500
    );
    return next(error);
  }
    product.item = item;
    product.type = type;
    product.quantity = quantity;
    product.price = price;

    try {
      await product.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update product.',
        500
      );
      return next(error);
    }

    res.status(200).json({product : product.toObject({ getters: true }) });


};

const deleteProduct = async (req, res, next) => {

    const productId = req.params.pid;   
    let product;
    try {
      product = await Product.findById(productId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete product.',
        500
      );
      return next(error);
    }
  
    try {
      await product.remove();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete product.',
        500
      );
      return next(error);
    }
    res.status(200).json({ message: 'Deleted product.' });
};

 exports.getProductById = getProductById;
 exports.createProduct = createProduct;
 exports.updateProduct = updateProduct;
 exports.deleteProduct = deleteProduct;
 exports.getAllProducts = getAllProducts;