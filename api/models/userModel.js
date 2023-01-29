const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"]
  },

  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
    trim: true,
    // regex for email
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email"
    ]
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: [6, 'password must be at least 6 characters'],
    // maxLength: [20, 'password must not be more than 20 characters']
  },

  photo: {
    type: String,
    required: [true, "Please add a photo"],
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  },

  phone: {
    type: String,
    default: "+966"
  },

  bio: {
    type: String,
    maxLength: [250, 'Bio must not exceed 250 characters'],
    default: "bio"
  }

}, {
  timestamps: true // for initialzation and update time
})

// hash password function so it wold be hashed when changing password or saving it
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) { // run the hash function only when password is changed
    return next() // run the next code
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User