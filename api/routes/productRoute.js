const express = require('express');

const { 
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct

} = require('../controller/productController')

const router = express.Router();

router.get('/getallproducts', getAllProducts);
router.get('/singleproduct/:_id', getSingleProduct);
router.post('/addproduct', addProduct);
router.delete('/deleteproduct/:_id', deleteProduct);
router.patch('/updateproduct/:_id', updateProduct);


module.exports = router;