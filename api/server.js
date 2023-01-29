require('dotenv').config();
const express = require("express")
const connectDB = require('./db/connection')
const bodyparser = require("body-parser")
const cors = require("cors")
const userRoute = require('./routes/userRoute')


const productRoute = require('./routes/productRoute')
const cookieParser = require("cookie-parser") // use it to store token and access it in the frontend

const app = express()

// Middileware 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // help with data that comes throught urls
app.use(bodyparser.json()); // help pass info from the frontend to the bakcend
app.use(cors());

// Roures middleware
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

// mongooose connection
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log("SERVER IS UP AND RUNNING"))

  } catch (error) {
    console.log(error)
  }
}

start()
