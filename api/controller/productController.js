const { raw } = require('body-parser');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModal');

// get all products
const getAllProducts = asyncHandler( async (req, res) => {
  const allProducts = await Product.find({});
  res.status(200).json(allProducts);

})

// get single product
const getSingleProduct = asyncHandler( async (req, res) => {
  const { _id } = req.params;

  const singleProduct = await Product.findById({_id});

  if (!singleProduct) {
    return res.status(404).json({message: "product not found"})

  }

  res.status(200).json(singleProduct);
})

// add product
const addProduct = asyncHandler( async (req, res) => {
  const { name, quantity, price, classification } = req.body;

  if( !name || !quantity || !price ) {
    return res.status(400).json({ message: "Please check all inputs fields" });
  }

  const productExist = await Product.findOne({name})
  if (productExist) {
    return res.status(401).json({ message: "product already exists" });
  }

  const product = await Product.create({
    name,
    quantity,
    price,
    classification,
  })

  if(product) {
    const { _id, name, quantity, price, classification } = product;
    return res.status(201).json({ message: "Product added successfully", data: _id, name, quantity, price, classification });

  } else {
    res.status(500).json({message: "product not found"})
  }

})

// delete product
const deleteProduct = asyncHandler( async (req, res) => {
  const { _id } = req.params;

  const product = await Product.deleteOne({_id})

  if(product) {
    return res.status(201).json({message: "product has been deleted successfully"});

  }else {
    res.status(500).json({message: "product not found"});
  }
})

const updateProduct = asyncHandler( async(req, res) => {
  const {_id} = req.params;

  const product = await Product.findById({_id});

  if(product) {
    const {name, quantity, price, classification} = product

    product.name = req.body.name || name;
    product.quantity = req.body.quantity || quantity;
    product.price = req.body.price || price;
    product.classification = req.body.classification || classification;

    const updatedProduct = await product.save()

    return res.status(201).json({
      message: "product has been updated successfully", 
      data: {id: updatedProduct._id, 
        name: updatedProduct.name,
        price: updatedProduct.price,
        quantity: updatedProduct.quantity,
        classification: updatedProduct.classification,
      }
    })

  } else {  
    res.status(404).json({message: "product not found"});
  }
})

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  
}