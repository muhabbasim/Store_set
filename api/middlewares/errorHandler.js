const errorHandler = (err, req, res, next) => {

  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null // to show error handler only on development stage
  })
}

module.exports = errorHandler;

// stack is a proparty that shows the location of the error