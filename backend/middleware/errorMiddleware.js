// runs when no route matches the request
const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

// central error handler - every thrown error ends up here
// (Express 5 forwards errors from async controllers automatically)
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
};

export { notFound, errorHandler };
