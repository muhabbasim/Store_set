const asyncHandler = require('express-async-handler'); // package that handle trycatch method
const  User  = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const Token = require('../models/tokenModel'); 
const crypto = require('crypto') // a fuction from node
const sendEmail = require('../utils/sendEmail')

// generate token
const generateToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: "1d"})
}

// User register
const registerUser = asyncHandler(async (req, res) => {
   
  const { name, email, password, confirmPassword } = req.body;

  if(!name || !email || !password || !confirmPassword) {
    res.status(400).send('Please fill all fields')
  }

  if (password.length < 6) {
    res.status(400).send('Password must be at least 6')
  }

  if (confirmPassword !== password) {
    res.status(400).send('Password does not match')
  }

  const userExists = await User.findOne({email});
  if(userExists) {
    return res.status(400).send('User already exists');
  }

  const user = await User.create({
    name, 
    email,
    password
  });

  const token = generateToken(user._id);

  // Send HTTP-only cookie to the front-end
  res.cookie('store_app_token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1day
    sameSite: none,
    secure: true,
  });

  if (user) {
    const { _id, name, email, phone, bio, photo } = user;
    return res.status(201).json({ _id, name, email, phone, bio, photo, token })

  } else {
    res.status(400).send('Invalid user information')
  }

});

// User login 
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).send('Please fill all fields')
  }

  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(400).send('THis email is not registered')
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);
  // cookies to the front-end
  res.cookie('store_app_token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1day
    sameSite: "none",
    secure: true,
  });

  if(user && passwordIsCorrect) {
    const { _id, name, email, phone, bio, photo } = user;
    return res.status(201).json({ _id, name, email, phone, bio, photo, token })

  } else {
    res.status(400).send('Invalid user information')
  }
  
})

// User register
const logout = asyncHandler((req, res) => {

  // res.cookie('store_app_token', "", { // we are not saving the token
  //   path: '/',
  //   httpOnly: true,
  //   expires: new Date(0), // expired the token
  //   sameSite: 'none',
  //   secure: true
  // });

  return res.clearCookie('store_app_token').status(200).json({ message: 'You are logged out successfully'})
})

// get User 
const getUser = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user._id); //req.user from the authUser
  if (user) {
    const { _id, name, email, phone, bio, photo } = user;
    return res.status(201).json({ _id, name, email, phone, bio, photo })

  } else {
    res.status(400).json({ message: 'User not found!!'})
  }

})

// get loggedin status
const loginStatus = asyncHandler( async (req, res) => {
  const token = req.cookies.store_app_token;
  if (!token) {
    return res.json(false)
  }

  const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if(verifiedToken) {
    return res.json(true)
  } else {
    return res.json(false)
  }

})

// update user data
const updateUser = asyncHandler( async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user) {
    const { _id, name, email, phone, bio, photo } = user;
    user.email = email; // email is not changeable
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save()
    return res.status(201).json({ 
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      bio: updatedUser.bio,
    })
  }
})

// change password
const changePassword = asyncHandler( async (req, res) => {
  const user = await User.findById(req.user._id)
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }
  
  if (!oldPassword || !newPassword) {
    res.status(400).json({ message: "Please fill the fields" });
  }
  
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

  if(newPassword !== confirmPassword) {
    return res.status(400).json({ message: "password doe not match" });
  }

  if (user && passwordIsCorrect) {
    user.password = newPassword
    await user.save()
    return res.status(200).json({ message: 'password changed successfully' })

  } else {
    res.status(400).json({ message: "Old password is incorrect" });
  }

})

const changePassowrd = asyncHandler( async (req, res) => {
  
})

const forgotPassword = asyncHandler( async (req, res) => {
  const {email} = req.body;

  if(!email) {
    return res.status(401).json({ message: "Enter your email please" });
  }

  const user = await User.findOne({email})

  if(!user) {
    return res.status(401).json({ message: "User does not exist" });
  }

  // delete token if ites exists in DB
  let token = await Token.findOne({userId: user._id})
  if (token) {
    await Token.deleteOne()
  }

  let resetToken = crypto.randomBytes(32).toString('hex') + user._id;  // create Reset Token 
  console.log(resetToken)
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")   // hash token

  // save Token to db
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000) // thirty minuts
  }).save()
  
  // construct Reset Url
  const resetUrl = `${process.env.FRONT_END_URL}/resetpassword/${resetToken}`
  // reset email
  const message = `
    <h2>Hello ${user.name}</h2>
    <p>Please use the url below to reset your password.</p>
    <p>This reset link is valid for only 30 minutes.</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

    <pPur regards ...</p>
    <p>Basim's team</p>

  `;
  
  const subject = "Passwords reset request";
  const sent_from = user.email;
  const send_to = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, sent_from, send_to,)
    res.status(200).json({success: true, message: "Reset email sent successfully"});
  } catch (error) {
    res.status(500).send({message: "something went worng please try again"})
  }

})

// reset password
const resetPassword = asyncHandler( async (req, res) => {

  const {password} = req.body;
  const {resetToken} = req.params;
  // hash token and compare to the one in the database
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")   // hash token

  // find token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: {$gte: Date.now()} // if its greater than now
  })

  if (!userToken) {
    res.status(500).send({message: "Invalid or expired token"})
  }

  // Find user 
  const user = await User.findOne({_id: userToken.userId})
  user.password = password
  await user.save()

  res.status(200).json({message: "Password changed successfully please login"})
})




module.exports = {
  registerUser,
  loginUser, 
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
}