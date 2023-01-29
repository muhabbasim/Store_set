const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    uniqe: true
  },

  quantity:{
    type: Number,
    default: 0,
  },

  price:{
    type: Number,
  },

  classification:{
    type: String,
    default: "standard",
  },
  
})

const Product = mongoose.model("Products", ProductSchema)
module.exports = Product