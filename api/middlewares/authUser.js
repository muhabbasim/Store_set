const asyncHandler = require('express-async-handler'); // package that handle trycatch method
const  User  = require('../models/userModel');
const jwt = require('jsonwebtoken')

const protect = asyncHandler( async (req, res, next) => {
  
  try {
    // verify token
    const token = req.cookies.store_app_token;
    
    if (!token) {
      return res.status(401).json({message: "Not authorized user!!!"});
    }
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    // get user info using the id (send in jwt.sign) 
    const user = await User.findById(verifiedToken.id).select('-password')
    if (!user) {
      return res.status(401).json({message: "User not found."});
    }
    
    req.user = user
    next();
 
  } catch (error) {
    res.status(401).json({message: "Not authorized user please register."});
    
  }
})

module.exports = protect